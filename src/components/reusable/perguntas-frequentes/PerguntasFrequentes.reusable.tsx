/* eslint-disable prettier/prettier */
import React, { FC, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { styles } from './PerguntasFrequentes.style';
import { useNavigation } from '@react-navigation/native';

interface RenderListProps {
  item: {
    title: string;
  };
  style: {
    background: string;
    textoColor: string;
    icon: any;
    fontsize: number;
    textDirection: string;
  };
  tela?: Function;
}

function RenderList({ item, style, tela }: RenderListProps) {
  return (
    <TouchableOpacity onPress={() => typeof tela === 'function' && tela(item)}>
      <View style={styles.list}>
        <Text style={[styles.list.title, { color: style.textoColor }]}>
          {item.title}
        </Text>
        <Image source={style.icon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
}

interface PerguntasFrequentesReusableProps {
  close?: () => void;
  tela?: string;
  dados?: any;
  type: boolean;
}

const PerguntasFrequentesReusable: FC<PerguntasFrequentesReusableProps> = ({
  close,
  tela,
  type,
  dados,
}) => {
  const navigation = useNavigation();

  const irTelaFaqs = (item: any) => {
    navigation.navigate('RespostaView', { tela: tela, item: item});
  };

  const handlePress = () => {
    if (typeof close === 'function') {
      close();
    }
  };
  const stylesTela = type
    ? {
        background: '#2B3155',
        textoColor: '#fff',
        icon: require('../../../assets/images/seta-direita.png'),
        fontsize: 30,
        textDirection: 'left',
      }
    : {
        background: '#fff',
        textoColor: '#2B3155',
        icon: require('../../../assets/images/seta-direita-preta.png'),
        fontsize: 40,
        textDirection: 'center',
      };

  return (
    <Fragment>
      {close && (
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowDown} onPress={handlePress}>
            <Image source={require('../../../assets/images/seta-cima.png')} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[styles.container, { backgroundColor: stylesTela.background }]}
      >
        <View style={[styles.textContainer, !type ? styles.paddingTexto : '']}>
          <Text
            style={[
              styles.text,
              {
                color: stylesTela.textoColor,
                textAlign: stylesTela.textDirection,
                fontSize: stylesTela.fontsize,
              },
            ]}
          >
            Qual a sua dúvida?
          </Text>
        </View>
        <View>
          {Array.isArray(dados) ? (
            dados.map((item, index) => (
              <RenderList
                key={index}
                item={item}
                tela={() => irTelaFaqs(item)}
                style={stylesTela}
              />
            ))
          ) : (
            <Text />
          )}
        </View>
      </View>
    </Fragment>
  );
};
export default PerguntasFrequentesReusable;
