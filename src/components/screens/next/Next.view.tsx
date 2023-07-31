/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Animated,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from './Next.style';
import { TelaEnum } from '../../../services/enums/cps/tela.enum';
import PerguntasFrequentesReusable from '../../reusable/perguntas-frequentes/PerguntasFrequentes.reusable';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/loading.actions';
import nextService from '../../../services/next.service';


export default function NextView() {
  const [modalVisible, setModalVisible] = useState(false);
  const modalY = useState(new Animated.Value(-500))[0];
  const [dados, setDados] = useState<any>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    navigation.navigate('CpfView');
  };

  const closeModal = () => {
    // Inicie a animação para deslizar o modal para fora da tela
    Animated.timing(modalY, {
      toValue: -1500,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Após a conclusão da animação, defina modalVisible como false
      setModalVisible(false);
    });
  };


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
          const dados: any = await nextService.get(`faqs`);
          const filteredData = dados?.data.filter(item => item.faqType === 0);
          const listData = filteredData.map(item => ({
            title: item?.question,
            subtitle: item?.titleAnswer,
            texto: item?.answer,
          }));
          setDados(listData);
          const { data } = dados;
          console.log(data?.pix);
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoading(false)); // Desativar o estado de carregamento após as conclusões das requisições ou quando ocorrer um erro
        }
      };
      fetchData();
    }, [])
  );


  useEffect(() => {
    const slideModal = (toValue, duration) => {
      Animated.timing(modalY, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };

    if (modalVisible) {
      slideModal(0, 500);
    } else {
      slideModal(-500, 500);
    }
  }, [modalVisible, modalY]);

  return (
    <ImageBackground
      source={require('../../../assets/images/back.jpg')}
      style={styles.bottomSection2}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <View style={styles.arrowContainer}>
        <Text style={styles.smallText}>Preciso de ajuda</Text>
        <TouchableOpacity
          style={styles.arrowDown}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={styles.imageLogo}
            source={require('../../../assets/images/seta-baixo.png')}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: modalY }],
            },
          ]}
        >
          <PerguntasFrequentesReusable type={false} dados={dados} tela={'NextScreen'} close={closeModal}/>
        </Animated.View>
      </Modal>
      <View style={styles.upperSection}>
        <Image
          style={styles.imageLogo}
          source={require('../../../assets/images/icon-amarelo.png')}
        />
        <Text style={styles.title}>
          Lorem ipsum {'\n'}
          dolor sit {'\n'}
          amet.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Vamos começar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
