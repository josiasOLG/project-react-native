/* eslint-disable prettier/prettier */
import React, { useState, createRef, Fragment, useEffect } from 'react';
import { styles } from './EnviarCodigo.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EnviarCodigoService from '../../../services/enviarCodigo.service';
import ModalCancelarReusable from '../../reusable/modal-cancelar/ModalCancelar.reusable';
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MaskService } from 'react-native-masked-text';
import { addData, updateData } from '../../../redux/actions/data-actions';

interface Props {
  route?: string;
}
interface TokenResponse {
  id?: any;
  codeTokenType?: number;
  phoneNumber?: string;
  // include other properties if they exist
}

const EnviarCodigoView: React.FC<Props> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNaoRecebeuVisible, setModalNaoRecebeuVisible] = useState(false);
  const [valorToken, setValorToken] = useState<TokenResponse | null>(null);
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const dispatch = useDispatch();
  const dadosReceber = useSelector((state: any) => state.data.data);

  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = Array.from({ length: 6 }, () => createRef());

  useEffect(() => {
    const fetchData = async () => {
      const response = await EnviarCodigoService.sendToken(dadosReceber?.cpf);
      dispatch(updateData('dataCriarSenha', response?.data));
      setValorToken(response);
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    navigation.navigate('CpfView');
  };

  const handleNaoRecebeuModal = () => {
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

  const formatTelefone = (numero: any) => {
    if (!numero) {
      return '';
    }

    return MaskService.toMask('cel-phone', numero, {
      maskType: 'BRL',
      withDDD: true,
      dddMask: '(99) ',
    });
  };

  const handlePress = async () => {
    EnviarCodigoService.confirToken(valorToken?.id, {
      codeToken: code.join(''),
    })
      .then(async (response) => {
        console.log('confirToken>>', response);
        dispatch(addData('dataCriarSenha', response?.data));
        navigation.navigate('TermoView');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  const handleCodeChange = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const reenviarcodigo = async () => {
    const response = await EnviarCodigoService.sendToken(dadosReceber?.cpf);
    dispatch(updateData('dataCriarSenha', response?.data));
    setValorToken(response);
    setModalNaoRecebeuVisible(false);
  };

  const handleKeyPress = (event: any, index: any) => {
    const { key } = event.nativeEvent;

    if (key === 'Backspace') {
      const newCode = [...code];

      if (newCode[index] === '') {
        newCode[index - 1] = '';
        setCode(newCode);
      }

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <Fragment>
      <StatusBarReusable distacia={0.7} />
      <ImageBackground
        source={require('../../../assets/images/back-nome.png')}
        style={styles.bottomSection}
        resizeMode="cover"
        imageStyle={styles?.image}
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
            Digite o código que você recebeu via SMS...
          </Text>
          <Text style={styles.subTitle}>
            Enviamos o código para o número{' '}
            {formatTelefone(valorToken?.phoneNumber)}
          </Text>
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                placeholder="-"
                placeholderTextColor="#BCBCBC"
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setModalNaoRecebeuVisible(true)}
          >
            <Text style={styles.linkText}>Você não recebeu o SMS?</Text>
          </TouchableOpacity>
        </View>
        {!keyboardVisible ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                !isCodeComplete ? styles.buttonDisabled : {},
              ]}
              onPress={handlePress}
              disabled={!isCodeComplete}
            >
              <Text style={styles.buttonText}>Continuar</Text>
              <Image
                source={require('../../../assets/images/seta-direita.png')}
                style={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <ModalCancelarReusable
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
        />
        <ModalCancelarReusable
          modalVisible={modalNaoRecebeuVisible}
          onCloseModal={handleNaoRecebeuModal}
          onNextModal={reenviarcodigo}
          modalSubTitle={'Você não recebeu algum codigo?'}
          modalTitle={
            'Se não recebeu nós iremos reenviar para você agora mesmo, pode deixar'
          }
          textBtn1={'Não recebi, reenviar'}
          textBtn2={'Já recebi o codigo'}
        />
      </ImageBackground>
      {keyboardVisible ? (
        <View>
          <ButtonFooterKeyboard
            screenWidth={screenWidth}
            pagina=""
            textoButton="Enviar"
            paramPagina={{}}
            disabled={!isCodeComplete}
            valid={isCodeComplete}
            keyboardVisible={keyboardVisible}
            onPress={handlePress}
          />
        </View>
      ) : null}
    </Fragment>
  );
};

export default EnviarCodigoView;
