/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './Documento.styles';
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
import ModalCancelarReusable from '../../../reusable/modal-cancelar/ModalCancelar.reusable';
import StatusBarReusable from '../../../reusable/status-bar/StatusBar.reusable';
import { useDispatch, useSelector } from 'react-redux';
import ReceberCodigoService from '../../../../services/receber-codigo.service';
import { useToastReusable } from '../../../reusable/toast/toast.reusable';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { isEmpty } from '../../../../services/utils';
import { setTipoDocumento } from '../../../../redux/actions/tipo-documento.actions';

export default function DocumentoView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dadosReceber = useSelector((state) => state.data.data);
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleCloseModal = () => {
    navigation.navigate('HomeView');
    setModalVisible(false);
  };

  const continuarModal = () => {
    setModalVisible(false);
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

  const handlePressModal = () => {
    setModalVisible(true);
  }

  const handlePress = () => {
    //salvarValor(selectedOption);
    navigation.navigate('AcessoCameraView');
  };

  const selecionarRadioButton  = (value) => {
    if(!isEmpty(value)){
      setIsDisable(true);
      setSelectedOption(value);
      dispatch(setTipoDocumento(value));
    }
  }

  const RadioButton = ({ value, label, subLabel, width }) => (
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
      <View style={styles.textContainer}>
        <Text style={styles.textContainer.radioLabel}>{label}</Text>
        <Text style={[styles.textContainer.radioSubLabel, width]}>{subLabel}</Text>
      </View>
    </TouchableOpacity>
  );

  const salvarValor = async (valor) => {
    const data = {
      cpf: dadosReceber?.cpf,
      name: dadosReceber?.nome,
      email: dadosReceber?.email,
      birthDate: dadosReceber?.dataNascimento,
      phoneNumber: dadosReceber?.celular,
      codeTokenType: valor,
    };
    ReceberCodigoService.post('/users', data)
      .then(async () => {
        try {
          const response = await ReceberCodigoService.get(
            'users/' + dadosReceber?.cpf + '/send-token'
          );
          console.log(response);
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
      <StatusBarReusable distacia={0.8} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require('../../../../assets/images/back-nome.png')}
          style={styles.bottomSection}
          resizeMode="cover"
          imageStyle={styles.image}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handlePressModal}
          >
            <Image
              source={require('../../../../assets/images/icon-close.png')}
              style={styles.iconClose}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.upperSection}>
            <Text style={styles.title}>
            Qual documento {'\n'}
            você quer {'\n'}
            fotografar?
            </Text>
            <View>
              <RadioButton value="0" label="CNH" subLabel="Carteira de motorista" width={''}/>
              <RadioButton value="1" label="RH" subLabel="Carteira de identidade" width={''}/>
              <RadioButton value="2"
              label="Outros documentos"
              subLabel="RNE, carteira de trabalho computadorizada" width={styles.width80}/>
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
                source={require('../../../../assets/images/seta-direita.png')}
                style={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
          <ModalCancelarReusable
            modalVisible={modalVisible}
            onNextModal={continuarModal}
            onCloseModal={handleCloseModal}
          />
        </ImageBackground>
      </ScrollView>
    </Fragment>
  );
}
