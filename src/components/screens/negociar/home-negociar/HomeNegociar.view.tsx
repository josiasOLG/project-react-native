/* eslint-disable prettier/prettier */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import styles from './HomeNegociar.style';
import { MaskService, TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import negocioService from '../../../../services/negocio.service';
import { ApiResponse } from '../../../../services/interfaces/negocio.interface';
import { UtilsService, formatMoney } from '../../../../services/utils';
import { debounce } from 'lodash';
import { RootState } from '../../../../services/interfaces/user-agreements.interface';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import tipoParcela from '../../../../redux/reducers/parcela.reducer';
import { setParcela } from '../../../../redux/actions/parcela.actions';
import { setNegociar } from '../../../../redux/actions/negociar.actions';
import { setLoading } from '../../../../redux/actions/loading.actions';

const handleTextChange = (money: string) => {
  if (!money) {
    return '';
  }
  return MaskService.toMask('money', money, {
    unit: 'R$', // ou 'US$' ou qualquer outra unidade monetária que você deseja
    separator: ',',
    delimiter: '.',
  });
};

const CardBody = ({ item, click }) => (
  <TouchableOpacity onPress={click}>
    <View style={styles.cardBody}>
      <View style={styles.cardBody.leftSide}>
        <Text style={styles.cardBody.title}>Opção {item?.item}</Text>
        <View style={styles.cardBody.underline} />
        <Text style={styles.cardBody.subtitle}>Quero essa</Text>
      </View>
      <View style={styles.cardBody.rightSide}>
        <View style={styles.cardBody.textContainer}>
          <View style={styles.cardBody.textRight}>
            <Text style={styles.cardBody.text1}>Valor da parela</Text>
            <Text style={styles.cardBody.text2}>
              {handleTextChange(item?.installment)}
            </Text>
          </View>
          <View style={styles.cardBody.flexItem}>
            <Text style={styles.cardBody.text1}>Prazo</Text>
            <Text style={styles.cardBody.text2}>{item?.term}x</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeNegociarView = () => {
  const [valor, setValor] = useState<any>();
  const [dados, setDados] = useState<ApiResponse | null>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dadosSelecionado, setDadosSelecionado] = useState<ApiResponse | null>(
    null
  );
  const dadosReceberLogin = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  const selecionar = (item: any) => {
    const moneyStr = formatMoney(valor);
    const objeto = {
      installment: item?.installment,
      item: item?.item,
      term: item?.term,
      amouuntTot: dados?.data?.maximumAmount,
      amouunt: moneyStr,
    };
    console.log(objeto);
    dispatch(setParcela(objeto));
    navigation.navigate('CarregandoView', {
      nextScreen: 'WelcomeNegocioView',
      login: false,
    });
  };

  const showToast = (type: any, titulo: any, mensagem: any) => {
    Toast.show({
      type: type,
      text1: titulo,
      text2: mensagem,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 30,
    });
  };

  useEffect(() => {
    setValor(dadosReceberLogin.dadosLogin[0].margin);
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response: ApiResponse = await negocioService.get(
          `simulation/${dadosReceberLogin.dadosLogin[0].margin}/maximum-amount`
        );
        setDados(response);
      } catch (error) {
       dispatch(setLoading(false));
      }
    };
    fetchData();
  }, []);

  const delayedSetValores = useCallback(
    debounce(async (valor) => {
      setValor(valor);
      const moneyStr = UtilsService.formatarNumero(valor);
      if (moneyStr >= dadosReceberLogin.dadosLogin[0].margin) {
        const response: ApiResponse = await negocioService.get(
          `simulation/${moneyStr}/requested-amount`
        );
        setDados(response);
      } else {
        showToast(
          'error',
          'Ocorreu um erro!',
          'Valor minimo e de ' + dadosReceberLogin.dadosLogin[0].margin
        );
      }
    }, 500),
    []
  );

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col2} />
          <View style={[styles.col8, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Vamos negociar. . .</Text>
          </View>
          <View style={[styles.col2, styles.topo.rigthContent]}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../../assets/images/icon-close.png')}
                resizeMode="contain"
                style={styles.topo.imageClose}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.card.cardBody}>
            <View style={styles.col10}>
              <Text style={styles.card.cardTextgrande}>
                Parabéns vamos fazer um ótimo negócio
              </Text>
            </View>
            <View style={styles.col2}>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.card.imageContainer}
              >
                <Image
                  style={styles.card.cardIcon}
                  resizeMode="contain"
                  source={require('../../../../assets/images/negociar.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.card.cardBody}>
            <View style={styles.col10}>
              <Text style={styles.card.cardTextHoje}>Seu valor:</Text>
              <Text style={styles.card.real}>R$</Text>
              <Image
                source={require('../../../../assets/images/icon-edit-valor.png')}
                resizeMode="contain"
                style={styles.card.iconEdit}
              />
              <TextInputMask
                style={styles.card.input}
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: '',
                }}
                value={valor}
                onChangeText={(text) => delayedSetValores(text)}
              />
            </View>
            <View style={styles.col2}></View>
          </View>
        </View>

        <View style={styles.col12}>
          <View style={styles.paddingTop20}>
            <Text style={styles.subtitulo}>Escolha uma das opções abaixo</Text>
          </View>
        </View>
        <View style={styles.containerBody}>
          <FlatList
            data={dados?.data?.simulationOptions}
            renderItem={({ item }) => (
              <CardBody item={item} click={() => selecionar(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default HomeNegociarView;
