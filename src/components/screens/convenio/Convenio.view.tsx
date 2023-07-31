/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import { styles } from './Convenio.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  SectionList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalCancelarReusable from '../../reusable/modal-cancelar/ModalCancelar.reusable';
import KeyboardReusable from '../../reusable/keyboard/keyboard.reusable';
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';
import useKeyboardVisibility from '../../../services/keyboardVisibilityService';
import ButtonFooterKeyboard from '../../reusable/button-footer-keyboard/buttonFooterKeyboard.reusable';
import conveniosService from '../../../services/convenios.service';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface Agreement {
  active: boolean;
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

interface ApiResponse {
  agreements: Agreement[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface Data {
  data: ApiResponse[];
}

export default function ConvenioView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const { keyboardVisible, screenWidth } = useKeyboardVisibility();
  const navigation = useNavigation();

  const processList = (list, searchText) => {
    const result = {};

    list.sort((a, b) => a.name.localeCompare(b.name))
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      .forEach((item) => {
        const initial = item.name.charAt(0).toUpperCase();
        if (!result[initial]) {
          result[initial] = [];
        }
        result[initial].push(item);
    });

    return result;
  };

  useEffect(() => {
    const data = {
      name: '',
      page: 1,
      size: 999
    };
    conveniosService.postData('/agreements/get-all', data).then((response: any) => {
      let agreementsNames: any;
      let dados = response?.data;
      if (dados?.agreements) {
        agreementsNames = dados.agreements.map(agreement => ({
          id: agreement.id,
          name: agreement.name
        }));
      }
      const convenios = processList(agreementsNames, searchText);
      setItems(convenios);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

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

  const clickItemList = (item) => {
    const data = {
      agreementId: item.id
    };
    conveniosService.post('/user-agreements', data)
      .then(async () => {
        navigation.navigate('MeusConvenioView');
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

  const filteredConvenios = processList(Object.values(items).flat(), searchText);

  const handleBackPress = () => {
    navigation.navigate('MeusConvenioView');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ section, index }) => {
    const item = section.data[index];
    const isFirstItem = index === 0;
    return (
      <View>
        <TouchableOpacity onPress={() => clickItemList(item)}>
          {isFirstItem && (
            <View style={styles.headerContainer}>
              <Text style={styles.listItemText}>{section.title}</Text>
              <View style={styles.separatorLine} />
            </View>
          )}
          <View style={styles.listItem}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/icon-list.png')} // Substitua pelo caminho correto do ícone
                style={styles.listItemIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.listItemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col11, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Convênios</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <SectionList
            contentContainerStyle={{ minHeight: '100%' }}
            sections={Object.entries(filteredConvenios).map(
              ([title, data]) => ({
                title,
                data,
              })
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            style={styles.flatList}
          />
        </View>
      </View>
      <ModalCancelarReusable
        modalVisible={modalVisible}
        onCloseModal={handleCloseModal}
      />
    </Fragment>
  );
}
