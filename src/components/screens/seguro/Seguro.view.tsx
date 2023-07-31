/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './Seguro.styles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

interface IDataItem {
  id: string;
  label: string;
  value: string;
}

const SeguroView: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const dadosReceber = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );
  const navigation = useNavigation();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {

        } catch (error) {

        }
      };
      fetchData();
    }, [])
  );

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col10, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Seguro</Text>
          </View>
          <View style={styles.col1} />
        </View>
      </View>
    </Fragment>
  );
};

export default SeguroView;
