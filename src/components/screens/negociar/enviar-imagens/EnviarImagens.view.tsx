/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../services/interfaces/user-agreements.interface';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import enviarImagensService from '../../../../services/enviar-imagens.service';
import useResetNavigation from '../../../../hooks/useResetNavigation';
import { UserData, DataCamera } from '../../../../services/interfaces/user.interfaces';
import { AppDispatch } from '../../../../store';

import { styles } from './EnviarImagens.style';
import { UtilsService } from '../../../../services/utils';

interface EnvioImagensViewProps {
  // Se houver alguma prop específica necessária, adicione-a aqui
}

interface DataPayload {
  userAgreementId: any;
  providerId: number;
  productId: number;
  amouunt: any;
  installment: number;
  term: number;
  docs: any;
}

export default function EnvioImagensView(props: EnvioImagensViewProps) {
  const resetNavigation = useResetNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const tipoParcela = useSelector((state: any) => state.tipoParcela.valor);
  const dataCamera = useSelector((state: any) => state.dataCamera.dataCamera);
  const dadosReceberLogin = useSelector((state: RootState) => state.dataLogin.dataLogin);
  const dadosNegociar = useSelector((state: any) => state.negociarItems.valor);

  useEffect(() => {
    // Coloque qualquer lógica de efeito colateral necessária aqui
  }, []);

  const showToast = (type: string, titulo: string, mensagem: string) => {
    Toast.show({
      type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const handlePress = () => {
    // const data: DataPayload = {
    //   userAgreementId: dadosReceberLogin?.dadosLogin[0]?.id || '',
    //   providerId: 1,
    //   productId: 2,
    //   amouunt: tipoParcela?.amouunt || 0,
    //   installment: tipoParcela?.installment || 0,
    //   term: tipoParcela?.term || 0,
    //   docs: dataCamera?.dados,
    // };

    const formData = new FormData();
    formData.append('userAgreementId', dadosReceberLogin?.dadosLogin[0]?.id || '');
    formData.append('providerId', 1);
    formData.append('productId', 2);
    formData.append('amouunt', tipoParcela?.amouunt || 0);
    formData.append('installment', tipoParcela?.installment || 0);
    formData.append('term', tipoParcela?.term || 0);

    for (const item of dataCamera?.dados){
      formData.append('docs', {
        uri: item,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
    }

    enviarImagensService
      .postFormData('/loans', formData)
      .then(async (response) => {
        resetNavigation('HomeView');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/back-welcome.png')}
      style={styles.bottomSection}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />

      <View style={styles.upperSection}>
        <Text style={styles.title}>
          Parabéns{'\n'}
          você{'\n'}
          concluiu!!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Tela inicial</Text>
          <Image
            source={require('../../../../assets/images/seta-direita.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
