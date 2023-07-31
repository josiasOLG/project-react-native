/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { styles } from './Carregando.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, StackActions  } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../../redux/actions/auth.actions';

const CarregandoView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { nextScreen } = route.params;
  const { login } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: nextScreen }],
      });
      if(login){
        dispatch(setAuthentication(true));
        console.log(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, nextScreen]);

  return (
    <ImageBackground
      source={require('../../../assets/images/back-loading.jpg')}
      style={styles.bottomSection}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />

      <View style={styles.upperSection}>
        <Image
            source={require('../../../assets/images/termo.png')}
            style={styles.iconTermo}
          />
        <Text style={styles.title}>
          Estamos{'\n'}
          Validando{'\n'}
          seu acesso{'\n'}
          um instante{'\n'}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default CarregandoView;
