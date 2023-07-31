/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
} from 'react-native';
import { styles } from './ModalCancelar.style';

interface ModalCancelarReusableProps {
  modalVisible?: boolean;
  onCloseModal?: () => void;
  onNextModal?: () => void;
  modalTitle?: string;
  modalSubTitle?: string;
  textBtn1?: string;
  textBtn2?: string;
}

const ModalCancelarReusable: React.FC<ModalCancelarReusableProps> = ({
  modalVisible,
  onCloseModal,
  onNextModal,
  modalTitle,
  modalSubTitle,
  textBtn1,
  textBtn2,
}) => {
  const handleClose = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const manterModal = () => {

  };

  const handleNext = () => {
    if (onNextModal) {
      onNextModal();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      backdropColor="#fff"
      onRequestClose={manterModal}
    >
      <TouchableWithoutFeedback onPress={manterModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.modalContainer}>
        <Image
          style={styles.modalArrow}
          source={require('../../../assets/images/seta-baixo-preta.png')}
        />
        <Text style={styles.modalTitle}>
          {modalTitle ? modalTitle : 'Você tem certeza que deseja cancelar?'}
        </Text>
        <Text style={styles.modalSubTitle}>
          {modalSubTitle
            ? modalSubTitle
            : 'Você consegue finalizar o processo quando quiser.'}
        </Text>
        <View style={styles.modalFooter}>

          {onNextModal && (<TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleNext()}
          >
            <Text style={styles.modalButtonText}>
              {textBtn1 ? textBtn1 : 'Continuar abrindo'}
            </Text>
            <Image
              source={require('../../../assets/images/seta-direita.png')}
              style={styles.modalIconButton}
            />
          </TouchableOpacity>)}

          {onCloseModal && (
            <TouchableOpacity
              style={styles.modalLinkButton}
              onPress={() => handleClose()}
            >
              <Text style={styles.modalTextCancelar}>
                {textBtn2 ? textBtn2 : 'Sim cancelar'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalCancelarReusable;
