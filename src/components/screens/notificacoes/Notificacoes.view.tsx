/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './Notificacoes.style';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
} from 'react-native';
import { Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { extrairHora, formatarData, formatarDataNotificacao } from '../../../services/utils';
import notificacoesService from '../../../services/notificacoes.service';


interface Mensagem {
  id: number;
  message: string;
  created_at: string;
  notification_type: number;
  hora: string;
}

interface DadosAPI {
  data: Mensagem[];
  message: string;
}

interface MensagemAgrupada {
  data: string;
  mensagens: Mensagem[];
}

const NotificacoesView: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [dados, setDados] = useState<any>([]);
  const dadosReceber = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );
  const navigation = useNavigation();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const agruparPorData = (dados: DadosAPI) => {
    const mapa: { [data: string]: Mensagem[] } = dados.data.reduce(
      (mapa, item) => {
        const data = item.created_at;
        const mensagem = {
          id: item.id,
          message: item.message,
          notification_type: item.notification_type,
          hora: extrairHora(item.created_at)
        };

        if (!mapa[data]) {
          mapa[data] = [];
        }

        mapa[data].push(mensagem);

        return mapa;
      },
      {}
    );

    return Object.entries(mapa).map(
      ([data, mensagens]): MensagemAgrupada => ({
        data,
        mensagens,
      })
    );
  }


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response: any = await notificacoesService.get('notifications');
          const dadosResp = agruparPorData(response);
          setDados(dadosResp);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [])
  );

  const renderFooter = () => <View />;

  const renderItemInterno = ({ item }: ListRenderItemInfo<Mensagem>) => (
    <View style={styles.item}>
      <View style={styles.containerItem}>

        {item.notification_type === 0 && (
          <Image style={styles.containerItem.image}
          source={require('../../../assets/images/icon-contrato.png')}
          resizeMode='contain'/>
        )}
        <Text style={styles.containerItem.label}>
          {item.notification_type === 0 ? 'Contratos' : ''} - {item.hora}
        </Text>
      </View>
      <View>
        <Text style={styles.item.texto}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: ListRenderItemInfo<MensagemAgrupada>) => (
    <View>
      <View style={styles.header}>
        <Text style={styles.header.titulo}>{formatarDataNotificacao(item.data)}</Text>
      </View>
      <FlatList
          data={item.mensagens}
          keyExtractor={(itemInterno) => itemInterno.id.toString()}
          renderItem={renderItemInterno}
        />
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
          <View style={[styles.col10, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Notificações</Text>
          </View>
          <View style={styles.col1}/>
        </View>
        {dados.length > 0 && (
          <FlatList
            data={dados}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
          />
        )}
        {dados.length === 0 && (
        <View style={styles.container}>
          <View style={styles.centerVerital}>
            <Image
              source={require('../../../assets/images/contrato-error.png')}
              resizeMode="cover"
              style={styles.centerVerital.image}
            />
            <Text style={styles.centerVerital.texto}>
              Você ainda não possui notificações!
            </Text>
          </View>
        </View>
      )}
      </View>
    </Fragment>
  );
};

export default NotificacoesView;
