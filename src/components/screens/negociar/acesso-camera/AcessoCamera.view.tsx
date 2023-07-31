/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './AcessoCamera.styles';
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

export default function AcessoCameraView() {
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

  const handleNext = () => {
    navigation.navigate('CameraView');
  }

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

  const handdleModal = () => {
    setModalVisible(true);
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
            onPress={handdleModal}
          >
            <Image
              source={require('../../../../assets/images/icon-close.png')}
              style={styles.iconClose}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.upperSection}>
            <Image source={require('../../../../assets/images/linha-laranja.png')}
            resizeMode='cover'
            style={styles.linha1}
            />
            <Image source={require('../../../../assets/images/camera-negociar.png')}
              resizeMode='cover'
              style={styles.iconNegociar}
            />
            <Text style={styles.title}>
              A gente precisa de acesso à sua câmera para fotografar alguns
              documentos
            </Text>
            <Image source={require('../../../../assets/images/linha-laranja.png')}
            resizeMode='cover'
            style={styles.linha2}
            />
            <View style={styles.linkContainer}>
                <TouchableOpacity
                style={styles.linkContainer.link}
                onPress={() => {}}
              >
                <Text style={styles.linkContainer.linkText}>Saiba mais</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleNext}
            >
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
