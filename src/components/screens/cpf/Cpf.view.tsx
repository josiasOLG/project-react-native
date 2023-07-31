/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { styles } from './Cpf.style';
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
import CpfService from '../../../services/cpf.service';
import { useDispatch, useSelector } from 'react-redux';
import { addData, updateData } from '../../../redux/actions/data-actions';
import { TextInputMask } from 'react-native-masked-text';
import { UtilsService, validaCPF } from '../../../services/utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function CpfView() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const [cpf, setCpf] = useState('');
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const showToast = (type, titulo, mensagem) => {
    Toast.show({
      type: type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const enviarCpf = async (cpf) => {
    setIsValid(validaCPF(cpf));
    const valid = validaCPF(cpf);
    if (valid) {
      const cleanedCpf = UtilsService.removeSpecialCharacters(cpf);
      dispatch(addData('cpf', cleanedCpf));
      try {
        const response = await CpfService.get('users/' + cleanedCpf + '/app');
        if (response?.data?.temp === true && response?.data?.active === false){
          dispatch(addData('dataCriarSenha', response?.data));
          navigation.navigate('EnviarCodigoView');
        } else if (response?.data?.temp === false && response?.data?.active === false){
          dispatch(addData('dataCriarSenha', response?.data));
          navigation.navigate('CriarSenhaView');
        } else {
          navigation.navigate('LoginView');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (error.response.status === 409) {
            dispatch(addData('cpf', cleanedCpf));
            navigation.navigate('WelcomeView');
          } else {
            navigation.navigate('CpfView');
          }
        }
      }
    }
  };

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

  useEffect(() => {
    startAnimations(screenWidth, keyboardVisible);
  }, [keyboardVisible, screenWidth]);

  const handleCpfChange = (text) => {
    setCpf(text);
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
          <TextInputMask
            type={'cpf'}
            keyboardType="numeric"
            placeholder="CPF"
            style={[styles.input, isValid ? null : styles.inputError]}
            placeholderTextColor={isValid ? '#fff' : 'red'}
            value={cpf}
            onChangeText={(text) => handleCpfChange(text)}
          />
        </View>
        {!isValid && (
          <View style={styles.alertCampo}>
            <Text style={styles.alertCampoText}>
              Por favor, preencha o cpf corretamente
            </Text>
          </View>
        )}
      </View>

      <View
        style={
          keyboardVisible
            ? styles.buttonContainerKeyboard
            : styles.buttonContainer
        }
      >
        <ButtonFooterKeyboard
          screenWidth={screenWidth}
          textoButton="Enviar"
          onPress={() => {
            enviarCpf(cpf);
          }}
          paramPagina={{}}
          keyboardVisible={keyboardVisible}
        />
      </View>
    </ImageBackground>
  );
}
