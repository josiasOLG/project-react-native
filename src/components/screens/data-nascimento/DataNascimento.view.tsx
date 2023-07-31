/* eslint-disable prettier/prettier */
import React, { useState, Fragment, useEffect } from 'react';
import { styles } from './DataNascimento.style';
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
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';
import KeyboardReusable from '../../reusable/keyboard/keyboard.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import { addData, updateData } from '../../../redux/actions/data-actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { convertDatePtBrToUs, isBirthdate, isEmail } from '../../../services/utils';

export default function DataNascimentoView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [dataNascimento, setDataNascimento] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataEstado = useSelector((state) => state.data.data);
  useEffect(() => {
    console.log('data:', dataEstado);
  }, [dataEstado]);

  const salvarDataNacimento = async (dataNascimento) => {
    const dataAlterada = convertDatePtBrToUs(dataNascimento);
    const valid = isBirthdate(dataAlterada);
    setIsValid(valid);
    if (valid) {
      dispatch(updateData('dataNascimento', dataAlterada));
      navigation.navigate('EmailView');
    }
  };

  return (
    <Fragment>
      <StatusBarReusable distacia={0.2} />
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
          <Text style={styles.title}>Data de nascimento</Text>
          <View>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              style={[styles.input, isValid ? null : styles.inputError]}
              placeholderTextColor={isValid ? '#fff' : 'red'}
              keyboardType="numeric"
              placeholder="Data de nascimento"
              maxLength={11}
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(text)}
            />
            <Image
              source={require('../../../assets/images/icon-error.png')}
              style={styles.icon}
            />
          </View>
          {!isValid && (
            <View style={styles.alertCampo}>
              <Text style={styles.alertCampoText}>
                Por favor, preencha a data de nascimento correto
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
            pagina=""
            textoButton="Enviar"
            paramPagina={{}}
            onPress={() => {
              salvarDataNacimento(dataNascimento);
            }}
            keyboardVisible={keyboardVisible}
          />
        </View>
      ) : null}
    </Fragment>
  );
}
