/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import { styles } from './NumeroCelular.style';
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
import { updateData } from '../../../redux/actions/data-actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { UtilsService } from '../../../services/utils';
import { isEmpty } from '../../../services/utils';

export default function NumeroCelularView() {
  const [modalVisible, setModalVisible] = useState(false);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();

  const [celular, setCelular] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataEstado = useSelector((state) => state.data.data);

  useEffect(() => {
    console.log('data:', dataEstado);
  }, [dataEstado]);

  const handleCelular = (text) => {
    setCelular(text);
  };

  const salvarCelular = async (celular) => {
    const valid = !isEmpty(celular);
    setIsValid(valid);
    if (valid) {
      navigation.navigate('ReceberCodigoView');
      const celularAlterado = UtilsService.removeSpecialCharacters(celular);
      dispatch(updateData('celular', celularAlterado));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Fragment>
      <StatusBarReusable distacia={0.5} />
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
          <Text style={styles.title}>Número deste celular</Text>
          <Text style={styles.subTitle}>
            Você receberá um código para confirmar seu número...
          </Text>
          <View>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) 99999-9999',
              }}
              keyboardType="numeric"
              placeholder="Número deste celular"
              style={[styles.input, isValid ? null : styles.inputError]}
              placeholderTextColor={isValid ? '#fff' : 'red'}
              value={celular}
              onChangeText={(text) => handleCelular(text)}
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
            textoButton="Enviar"
            paramPagina={{}}
            onPress={() => salvarCelular(celular)}
            keyboardVisible={keyboardVisible}
          />
        </View>
      ) : null}
    </Fragment>
  );
}
