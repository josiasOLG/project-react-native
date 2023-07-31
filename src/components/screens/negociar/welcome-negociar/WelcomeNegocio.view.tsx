/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { styles } from './WelcomeNegocio.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalCancelarReusable from '../../../reusable/modal-cancelar/ModalCancelar.reusable';

export default function WelcomeNegocioView() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    // navigation.navigate('CarregandoView', {nextScreen: 'NomeView'});
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    navigation.navigate('CpfView');
    setModalVisible(false);
  };

  const continuarModal = () => {
    navigation.navigate('DocumentoView');
    setModalVisible(false);
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
          Hora{'\n'}
          das{'\n'}
          fotos
        </Text>
        <Text style={styles.subTitle}>
          Agora, precisamos{'\n'}
          do seu documento de{'\n'}
          identificação.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Precisamos da sua selfie </Text>
          <Image
            source={require('../../../../assets/images/seta-direita.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textoFooter}>
        <Text style={styles.textoFooter.textoSmall}>e da foto dos seus documento</Text>
      </View>
      <ModalCancelarReusable
      modalVisible={modalVisible}
      modalTitle = "Retire sua CNH do plástico ou seu documento de identificação, para fotografar a frente e depois o verso dela."
      modalSubTitle = "Cuidado para não tapar nenhuma informação, e que todos os dados fiquem fáceis de serem lidos"
      textBtn1 = "Ok, entendido"
      onNextModal={continuarModal}></ModalCancelarReusable>
    </ImageBackground>
  );
}
