/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './MeusDados.style';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import meusDadosService from '../../../services/meus-dados.service';
import {
  convertDatePtBrToUs,
  formatarCPF,
  formatarCelular,
  formatarData,
} from '../../../services/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface IDataItem {
  id: string;
  label: string;
  value: string;
}

const MeusDadosView: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [avatar, setAvatar] = useState<any>({});
  const [image, setImage] = useState<any>(null);
  const dadosReceber = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );
  const navigation = useNavigation();
  const onToggleSwitch = async (value: boolean) => {
    setIsSwitchOn(value);
    await AsyncStorage.setItem('biometricOn', value.toString());
  };

  useFocusEffect(
    React.useCallback(() => {
      const getBiometricStatus = async () => {
        let biometricOn = await AsyncStorage.getItem('biometricOn');
        setIsSwitchOn(biometricOn === 'true');
      };

      getBiometricStatus();

      const fetchData = async () => {
        try {
          const response: any = await meusDadosService.get('users/user');
          const data: IDataItem[] = [
            { id: '1', label: 'E-mail:', value: response.data.email },
            {
              id: '2',
              label: 'Celular:',
              value: formatarCelular(response.data.phoneNumber),
            },
            { id: '3', label: 'Cpf:', value: formatarCPF(response.data.cpf) },
            {
              id: '4',
              label: 'Data de nascimento:',
              value: formatarData(response.data.birthDate),
            },
          ];
          setUser(data);
          setAvatar(
            response?.data?.avatar !== null && response?.data?.avatar
              ? response?.data?.avatar
              : ''
          );
          console.log(avatar);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [])
  );

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

  const uploadImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    const formData = new FormData();
    formData.append('docs', {
      uri: result.assets[0].uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    const data = {
      docs: result.assets[0].uri,
    };
    meusDadosService
      .patchFormData('/users/create-avatar', formData)
      .then(async (response) => {
        console.log(response);
        await setImage(result.assets[0].uri);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          showToast('error', 'Ocorreu um erro!', errorMessage);
        }
      });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={
              avatar && avatar.length > 0
                ? { uri: image ? image : avatar }
                : require('../../../assets/images/perfil.png')
            }
          />
          <TouchableOpacity style={styles.editIcon} onPress={uploadImage}>
            <Image source={require('../../../assets/images/pincel.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.header.containerTexto}>
          <Text style={styles.header.nomeText}>
            {dadosReceber?.dadosLogin[0]?.user?.name}
          </Text>
        </View>
      </View>
      <View style={[styles.alert, styles.row]}>
        <View style={styles.col1}>
          <Image
            style={styles.iconContainer.icon}
            source={require('../../../assets/images/analise.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.col11}>
          <View style={styles.containerTexto}>
            <Text style={styles.alertText}>
              Confira seus dados, edite o que for neessário e conclua a
              atualização.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: ListRenderItemInfo<IDataItem>) => (
    <View style={styles.item}>
      <View style={styles.containerItem}>
        <Text style={styles.containerItem.label}>{item.label}</Text>
        <View style={styles.containerItem.border}>
          <Text style={styles.containerItem.value}>{item.value}</Text>
        </View>
      </View>
    </View>
  );
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Segurança</Text>
      <View style={styles.footerContent}>
        <Image
          style={styles.footerImage}
          source={require('../../../assets/images/digital.png')}
        />
        <Text style={styles.footerText}>Biometria</Text>
        <Switch
          style={styles.toggle}
          trackColor={{ false: '#767577', true: '#EFC03F' }}
          thumbColor={isSwitchOn ? '#2B3155' : '#f4f3f4'}
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      </View>
    </View>
  );

  const handleBackPress = () => {
    navigation.navigate('HomeView');
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
            <Text style={styles.titulo}>Meus dados</Text>
          </View>
        </View>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={user}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </View>
    </Fragment>
  );
};

export default MeusDadosView;
