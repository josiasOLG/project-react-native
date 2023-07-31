/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { styles } from './Login.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import { startAnimations } from '../../animation/animation';
import { useDispatch, useSelector } from 'react-redux';
import loginService from '../../../services/login.service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getItem, setItem } from '../../../services/storage/SecureStorage.service';
import { setAuthentication } from '../../../redux/actions/auth.actions';
import * as Notifications from 'expo-notifications';

export default function LoginView() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const dataRecebedor = useSelector((state) => state.data.data);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const showToast = (type: any, titulo: any, mensagem: any) => {
    Toast.show({
      type: type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
    });
  };
  useEffect(() => {
    startAnimations(screenWidth, keyboardVisible);
  }, [keyboardVisible, screenWidth]);

  const handleSendToken = () => {
    navigation.navigate('EnviarCodigoView');
  };

  const login = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    loginService
      .login({
        cpf: dataRecebedor?.cpf,
        password: password,
        expoPushToken: token ? token : ''
      })
      .then(async (response) => {
        setItem('LOGADO', true);
        setItem('authToken', response?.token);
        setItem('AUTH', {
          cpf: dataRecebedor?.cpf,
          password: password,
        });
        navigation.navigate('CarregandoView', { nextScreen: 'HomeView', login: true });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/back-embacado.jpg')}
      style={styles.bottomSection}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <View style={styles.upperSection}>
        <Image
          style={styles.imageLogo}
          source={require('../../../assets/images/icon-amarelo.png')}
        />
        <Text style={styles.title}>
          Lorem ipsum {'\n'}
          dolor sit {'\n'}
          amet.
        </Text>
      </View>

      <View style={styles.middleSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            maxLength={30}
            secureTextEntry
            placeholderTextColor="#fff"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={handleSendToken}
          >
            <Text style={styles.buttonTextOutline}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {keyboardVisible ? (
        <View
          style={
            keyboardVisible
              ? styles.buttonContainerKeyboard
              : styles.buttonContainer
          }
        >
          <View>
            <ButtonFooterKeyboard
              screenWidth={screenWidth}
              pagina=""
              textoButton="Enviar"
              paramPagina={{}}
              keyboardVisible={keyboardVisible}
            />
          </View>
        </View>
      ) : null} */}
    </ImageBackground>
  );
}
