/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import { styles } from './Email.style';
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
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import { isValidEmail } from '../../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../redux/actions/data-actions';

export default function EmailView() {
  const [modalVisible, setModalVisible] = useState(false);
  const {keyboardVisible, screenWidth } = useKeyboardVisibility();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataEstado = useSelector((state) => state.data.data);

  useEffect(() => {
    console.log('data:', dataEstado);
  }, [dataEstado]);

  const handleEmailValidation = (text) => {
    setEmail(text);
  };

  const salvarEmail = async (email) => {
    const valid = isValidEmail(email);
    setIsValid(valid);
    if (valid){
      navigation.navigate('NumeroCelularView');
      dispatch(updateData('email', email));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };


  return (
    <Fragment>
      <StatusBarReusable distacia={0.4} />
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
          <Text style={styles.title}>Seu e-mail</Text>
          <View>
            <TextInput
              style={[styles.input, isValid ? null : styles.inputError]}
              placeholderTextColor={isValid ? '#fff' : 'red'}
              placeholder="Seu email"
              value={email}
              onChangeText={(text) => handleEmailValidation(text)}
            />
            {/* <Image
              source={require('../../../assets/images/icon-error.png')}
              style={styles.icon}
            /> */}
          </View>
          {!isValid && (
            <View style={styles.alertCampo}>
              <Text style={styles.alertCampoText}>
                Por favor, preencha o email correto
              </Text>
            </View>
          )}
        </View>
        <ModalCancelarReusable
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
        />
      </ImageBackground>
      {keyboardVisible ? (
        <View>
          <ButtonFooterKeyboard
          screenWidth={screenWidth}
          textoButton="Enviar"
          paramPagina={{}}
          onPress={() => salvarEmail(email)}
          keyboardVisible={keyboardVisible} />
        </View>
      ) : null}
    </Fragment>
  );
}
