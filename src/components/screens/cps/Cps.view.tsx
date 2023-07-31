/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  StatusBar,
} from 'react-native';
import { TelaEnum } from '../../../services/enums/cps/tela.enum';
import { UrlEnum } from '../../../services/enums/cps/url.enum';
import styles from './Cps.styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import DropDownReusable from '../../reusable/dropdown/dropdown.reusable';
import ContratosView from './contrato/contrato.view';
import PendenciaView from './pendencia/pendencia.view';
import SolicitacoesView from './solicitacoes/solicitacoes.view';

interface RouteParams {
  titulo: string;
  url: string;
  tela: string;
  data: string; // ajuste o tipo de data se necessário, ex: Date
}

const downloadFile = async (url) => {
  if (!url) {
    return;
  }
  const filename = url.split('/').pop();
  const uri = FileSystem.documentDirectory + filename;

  const result = await FileSystem.downloadAsync(url, uri);
  if (result.status !== 200) {
    console.error('Erro ao baixar arquivo:', result);
    return;
  }

  console.log('Arquivo baixado para', result.uri);
};

const ListItem = ({ item, index, tela, clickSelfIlegivel }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 600,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const cardScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const formatarReal = (valor) => {
    let formatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
    return formatado;
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
      {tela === TelaEnum.Tela1 && (
        <ContratosView
          item={item}
          tela={tela}
          TelaEnum={TelaEnum}
          formatarReal={formatarReal}
          downloadFile={downloadFile}
          clickSelfIlegivel={clickSelfIlegivel}
        />
      )}
      {tela === TelaEnum.Tela2 && (
        <PendenciaView
          item={item}
          tela={tela}
          TelaEnum={TelaEnum}
          formatarReal={formatarReal}
          downloadFile={downloadFile}
          clickSelfIlegivel={clickSelfIlegivel}
        />
      )}
      {tela === TelaEnum.Tela3 && (
        <SolicitacoesView
          item={item}
          tela={tela}
          TelaEnum={TelaEnum}
          formatarReal={formatarReal}
          downloadFile={downloadFile}
          clickSelfIlegivel={clickSelfIlegivel}
        />
      )}
    </Animated.View>
  );
};

const CpsView = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { titulo, url, tela, data } = route.params ?? {};
  const [selectedValue, setSelectedValue] = useState('Opção 1');

  const navigation = useNavigation();

  useEffect(() => {}, []);

  const dropdownData = [
    { label: 'Opção 1', value: 'Opção 1' },
    { label: 'Opção 2', value: 'Opção 2' },
    { label: 'Opção 3', value: 'Opção 3' },
    // ...outros valores
  ];

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  const selfIlegivel = () => {
    navigation.navigate('IlegivelView');
  };

  const handleValueChange = (value: string) => {
    console.log('Selected value: ', value);
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.col12}>
        {tela === TelaEnum.Tela2 && (
          <View>
            <DropDownReusable
              data={dropdownData}
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
              textoDropDown={'Pendências'}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.topo}>
        <View style={styles.col2}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../../assets/images/seta-direita-preta.png')}
              resizeMode="contain"
              style={styles.topo.image}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.col8, styles.centerContent]}>
          <Text style={styles.titulo}>{titulo ? titulo : 'Contratos'}</Text>
        </View>
        <View style={[styles.col2, styles.rigthContent]}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../../assets/images/icon-close.png')}
              resizeMode="contain"
              style={styles.topo.imageClose}
            />
          </TouchableOpacity>
        </View>
      </View>
      {data.length > 0 && (
        <View style={styles.container}>
          {tela === TelaEnum.Tela1 && (
            <View style={[styles.alert, styles.alertSucesso]}>
              <View style={styles.col1}>
                <Image
                  source={require('../../../assets/images/icon-info.png')}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.col11}>
                <Text style={styles.alert.texto}>
                  Faça o download de sua CCB
                </Text>
              </View>
            </View>
          )}

          {tela === TelaEnum.Tela2 && (
            <View style={[styles.alert, styles.alertErro]}>
              <View style={styles.col1}>
                <Image
                  source={require('../../../assets/images/icon-info.png')}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.col11}>
                <Text style={styles.alert.texto}>
                  Você precisa corrigir as suas pendências
                </Text>
              </View>
            </View>
          )}
          <FlatList
            contentContainerStyle={{ padding: 20 }}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                item={item}
                index={index}
                tela={tela}
                clickSelfIlegivel={selfIlegivel}
              />
            )}
          />
        </View>
      )}
      {data.length === 0 && (
        <View style={styles.container}>
          <View style={styles.container.centerVerital}>
            <Image
              source={require('../../../assets/images/contrato-error.png')}
              resizeMode="cover"
              style={styles.container.centerVerital.image}
            />
            <Text style={styles.container.centerVerital.texto}>
              Você ainda não possui {titulo}!
            </Text>
          </View>
        </View>
      )}
    </Fragment>
  );
};

export default CpsView;
