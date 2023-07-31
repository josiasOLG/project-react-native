/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Platform, UIManager, Animated, Image } from 'react-native';
import { styles } from './card-expanded.styles'


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExpandableCardProps {
  title?: string;
  children?: React.ReactNode;
  incrementHeight?: number;
  onClick: () => void; // nova prop
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, children, incrementHeight, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const dropDownAnimationValue = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) {
      Animated.timing(dropDownAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(dropDownAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  };

  const dropDownHeight = dropDownAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, incrementHeight] // 150 é o valor da altura quando o card está expandido. Ajuste conforme necessário.
  });

  return (
    <View>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        <Image source={require('../../../assets/images/seta-preta-baixo.png') }
         style={expanded ? styles.iconCima : styles.iconBaixo}/>
      </TouchableOpacity>
      <Animated.View style={{ height: dropDownHeight, overflow: 'hidden' }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default ExpandableCard;
