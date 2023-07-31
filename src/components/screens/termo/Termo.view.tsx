/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './Termo.style';
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

export default function TermoView() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const next = () => {
    navigation.navigate('CriarSenhaView');
  };


  return (
    <Fragment>
      <StatusBarReusable distacia={0.8} />
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
          <Image
            source={require('../../../assets/images/termo.png')}
            style={styles.imageTermo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            você tem que aceitar os termos de condição abaixo pra continuar
          </Text>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Ler o termos e condiçães</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.containerbuttons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Não aceito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={next}>
              <Text style={styles.textButtonOutline}>Eu aceito</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalCancelarReusable
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
        />
      </ImageBackground>
    </Fragment>
  );
}
