/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './CriarSenha.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalCancelarReusable from '../../reusable/modal-cancelar/ModalCancelar.reusable';
import KeyboardReusable from '../../reusable/keyboard/keyboard.reusable';
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import criarSenhaService from '../../../services/criar-senha.service';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import loginService from '../../../services/login.service';
import { setItem } from '../../../services/storage/SecureStorage.service';
import * as Notifications from 'expo-notifications';


export default function CriarSenhaView() {
  const [modalVisible, setModalVisible] = useState(false);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const dadosReceber = useSelector((state) => state.data.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    navigation.navigate('CpfView');
    setModalVisible(false);
  };

  const continuarModal = () => {
    setModalVisible(false);
  };

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

  const handleConfirmarSenha = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    criarSenhaService.criar(dadosReceber?.dataCriarSenha?.id, {
        password: confirmPassword,
        expoPushToken: token ? token : ''
      }).then((response) => {
        loginService
        .login({
          cpf: dadosReceber?.cpf,
          password: confirmPassword,
          expoPushToken: token ? token : ''
        })
        .then((response) => {
          setItem('LOGADO', true);
          setItem('authToken', response?.token);
          setItem('AUTH', {
            cpf: dadosReceber?.cpf,
            password: confirmPassword,
          });
          navigation.navigate('CarregandoView', { nextScreen: 'HomeView', login: true });
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            showToast('error', 'Ocorreu um erro!', errorMessage);
          }
        });
      }).catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  return (
    <Fragment>
      <StatusBarReusable distacia={1} />
      <ImageBackground
        source={require('../../../assets/images/back-nome.png')}
        style={styles.bottomSection}
        resizeMode="cover"
        imageStyle={styles.image}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require('../../../assets/images/icon-close.png')}
            style={styles.iconClose}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.upperSection}>
          <Text style={styles.title}>Digite sua senha</Text>
          <Text style={styles.subTitle}>
            Com ela consiguira entar no Consigaki
          </Text>

          <View style={styles.centerCotainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#333"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
            />
            <Image
              source={require('../../../assets/images/icon-error.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              placeholderTextColor="#333"
              secureTextEntry
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <Image
              source={require('../../../assets/images/icon-error.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          {!isPasswordMatch && (
            <Text style={{ color: 'red', marginTop: 10 }}>
              As senhas não coincidem.
            </Text>
          )}
        </View>
        <ModalCancelarReusable
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
          onNextModal={continuarModal}
        />
        {keyboardVisible && isPasswordMatch && confirmPassword ? (
          <View>
            <ButtonFooterKeyboard
              screenWidth={screenWidth}
              pagina=""
              textoButton="Enviar"
              paramPagina={{}}
              keyboardVisible={keyboardVisible}
              onPress={handleConfirmarSenha}
            />
          </View>
        ) : null}
      </ImageBackground>
    </Fragment>
  );
}
