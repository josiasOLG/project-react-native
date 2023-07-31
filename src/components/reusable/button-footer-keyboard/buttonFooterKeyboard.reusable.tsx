/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, Animated, Image } from 'react-native';
import {
  animatedWidth,
  animatedTextTranslateX,
  animatedButtonRadius,
  animatedBackground,
} from '../../animation/animation';
import { useNavigation } from '@react-navigation/native';

const ButtonFooterKeyboard = ({
  screenWidth,
  pagina,
  textoButton,
  keyboardVisible,
  paramPagina,
  backgroundColorButton,
  disabled,
  valid,
  onPress,
}) => {
  const navigation = useNavigation();
  const buttonWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth + 2, screenWidth],
  });

  const borderRadius = animatedButtonRadius.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 0],
  });

  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
    if (pagina){
      navigation.navigate(pagina, paramPagina);
    }
  };

  return (
    <Animated.View
      style={{
        width: buttonWidth,
        paddingHorizontal: animatedWidth.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
        borderRadius: animatedButtonRadius.interpolate({
          inputRange: [0, 1],
          outputRange: [15, 0],
        }),
        backgroundColor: animatedBackground.interpolate({
          inputRange: [0, 1],
          outputRange: ['#fff',disabled ? '#cccccc' : '#2B3155'],
        }),
      }}
    >
      <TouchableOpacity
      style={[
        styles.button,
      ]}
      onPress={handlePress}
      disabled={disabled ? disabled : false}
      >
        <Animated.Text
          style={[
            styles.animatedText,
            {
              transform: [{ translateX: animatedTextTranslateX }],
            },
          ]}
        >
          <Text style={keyboardVisible ? styles.buttonTextKeyboard : styles.buttonText}>
            {keyboardVisible ? 'Avançar' : 'CONTINUAR'}
          </Text>
        </Animated.Text>
        <Image
            source={require('../../../assets/images/seta-direita.png')}
            style={styles.iconButton}
          />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonKeyborad:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  buttonText: {
    color: '#2B3155',
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
  },
  buttonTextKeyboard:{
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 20,
    position: 'relative',
  },
  buttonDisabled:{
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
  iconButton: {
    width: 11.4,
    height: 20,
    marginRight: 20,
    position: 'absolute',
    right: -20,
  },
  animatedText: {
    fontSize: 20,
    color: 'black',
    marginLeft: 50,
    textAlign: 'center',
  },
};

export default ButtonFooterKeyboard;
