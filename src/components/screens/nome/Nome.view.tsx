/* eslint-disable prettier/prettier */
import React, { useState, Fragment, useEffect } from 'react';
import { styles } from './Nome.style';
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
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import { updateData } from '../../../redux/actions/data-actions';
import { useDispatch, useSelector } from 'react-redux';
import { isFullName } from '../../../services/utils';

export default function NomeView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  const handleCloseModal = () => {
    navigation.navigate('CpfView');
    setModalVisible(false);
  };

  const continuarModal = () => {
    setModalVisible(false);
  };


  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const salvarNome = async (nome) => {
    const valid = isFullName(nome);
    setIsValid(valid);
    if (valid) {
      navigation.navigate('DataNascimentoView');
      dispatch(updateData('nome', nome));
    }
  };

  return (
    <Fragment>
      <StatusBarReusable distacia={0.1} />
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
          <Text style={styles.title}>Nome completo</Text>
          <View>
            <TextInput
              placeholder="Nome completo"
              style={[styles.input, isValid ? null : styles.inputError]}
              placeholderTextColor={isValid ? '#fff' : 'red'}
              value={nome}
              onChangeText={(text) => setNome(text)}
            />
            {/* <Image
              source={require('../../../assets/images/icon-error.png')}
              style={styles.icon}
            /> */}
          </View>
          {!isValid && (
            <View style={styles.alertCampo}>
              <Text style={styles.alertCampoText}>
                Por favor, preencha o nome completo
              </Text>
            </View>
          )}
        </View>
        <ModalCancelarReusable
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
          onNextModal={continuarModal}
        />
      </ImageBackground>
      {keyboardVisible ? (
        <View>
          <ButtonFooterKeyboard
            screenWidth={screenWidth}
            textoButton="Enviar"
            paramPagina={{}}
            onPress={() => {
              salvarNome(nome);
            }}
            keyboardVisible={keyboardVisible}
          />
        </View>
      ) : null}
    </Fragment>
  );
}
