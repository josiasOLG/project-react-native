/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './ReceberCodigo.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalCancelarReusable from '../../reusable/modal-cancelar/ModalCancelar.reusable';
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';
import { useDispatch, useSelector } from 'react-redux';
import ReceberCodigoService from '../../../services/receber-codigo.service';
import { useToastReusable } from '../../reusable/toast/toast.reusable';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { isEmpty } from '../../../services/utils';
import * as Notifications from 'expo-notifications';

export default function ReceberCodigoView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dadosReceber = useSelector((state) => state.data.data);
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleCloseModal = () => {
    navigation.navigate('CpfView');
  };

  const showToast = (type, titulo, mensagem) => {
    Toast.show({
      type: type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 6000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const handlePress = () => {
    salvarValor(selectedOption);
  };

  const selecionarRadioButton  = (value) => {
    if(!isEmpty(value)){
      setIsDisable(true);
      setSelectedOption(value);
    }
  }

  const RadioButton = ({ value, label }) => (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => selecionarRadioButton(value)}
    >
      <View
        style={[
          styles.radioOuter,
          selectedOption === value ? styles.radioOuterSelected : {},
        ]}
      >
        {selectedOption === value && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const salvarValor = async (valor) => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    const data = {
      cpf: dadosReceber?.cpf,
      name: dadosReceber?.nome,
      email: dadosReceber?.email,
      birthDate: dadosReceber?.dataNascimento,
      phoneNumber: dadosReceber?.celular,
      codeTokenType: valor,
      expoPushToken: token ? token : ''
    };
    ReceberCodigoService.post('/users', data)
      .then(async () => {
        try {
          const response = await ReceberCodigoService.get(
            'users/' + dadosReceber?.cpf + '/send-token'
          );
          // console.log(response);
          navigation.navigate('EnviarCodigoView');
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            showToast(
              'error',
              'Ocorreu um erro!',
              errorMessage
            );
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast(
            'error',
            'Ocorreu um erro!',
            errorMessage
          );
        }

      });
  };



  return (
    <Fragment>
      <StatusBarReusable distacia={0.6} />
      <ScrollView contentContainerStyle={styles.scrollView}>
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
            <Text style={styles.title}>
              ...você quer receber o código por onde?
            </Text>
            <View>
              <RadioButton value="0" label="Por SMS" />
              <RadioButton value="1" label="Por Whatsapp" />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={[
              styles.button,
              !isDisable ? styles.buttonDisabled : {},
            ]}
            onPress={handlePress}
            disabled={!isDisable}>
              <Text style={styles.buttonText}>Continuar</Text>
              <Image
                source={require('../../../assets/images/seta-direita.png')}
                style={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
          <ModalCancelarReusable
            modalVisible={modalVisible}
            onCloseModal={handleCloseModal}
          />
        </ImageBackground>
      </ScrollView>
    </Fragment>
  );
}
