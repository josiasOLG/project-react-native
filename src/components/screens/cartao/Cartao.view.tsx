/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './Cartao.styles';
import { ScrollView } from 'react-native-gesture-handler';
import PerguntasFrequentesReusable from '../../reusable/perguntas-frequentes/PerguntasFrequentes.reusable';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/loading.actions';
import cartaoService from '../../../services/cartao.service';

const CartaoView = ({ route }) => {
  const { titulo, url, tela } = route.params ?? {};
  const navigation = useNavigation();
  const [dados, setDados] = useState<any>([]);
  const dispatch = useDispatch();
  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  const telaCamera = () => {
    navigation.navigate('WelcomeNegocioView');
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
          const dados: any = await cartaoService.get(`faqs`);
          const filteredData = dados?.data.filter(item => item.faqType === 1);
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


  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col1}/>
          <View style={[styles.col10, styles.topo.centerContent]}>
            <Text style={styles.titulo}>{titulo ? titulo : 'Cartão consignado'}</Text>
          </View>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../assets/images/icon-close.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.containerBody}>
            <View style={styles.containerBody.centerImage}>
              <Image
                source={require('../../../assets/images/cartao-mulher.png')}
                resizeMode="contain"
                style={styles.containerBody.centerImage.image}
              />
            </View>
            <View style={styles.containerBody.containerTexto}>
              <Text style={styles.containerBody.containerTexto.texto}>
                <Text style={styles.strong}>Cartão consignado</Text>
                {'\n'}Lorem ipsum dolor sit amet
              </Text>
              <Text style={styles.containerBody.containerTexto.texto}>
                Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad
              </Text>
              <Text
                style={[
                  styles.containerBody.containerTexto.texto,
                  styles.strong,
                ]}
              >
                O que o seguro Cartão consignado tem à oferecer para você?
              </Text>
              <View style={styles.containerBody.containerTexto.ul}>
                <Image
                  source={require('../../../assets/images/icon-cartao.png')}
                  resizeMode="contain"
                  style={styles.containerBody.containerTexto.ul.imageLi}
                />
                <Text
                  style={[
                    styles.containerBody.containerTexto.texto,
                    styles.strong,
                  ]}
                >
                  Participação em sorteios mensais de R$ 5.000,00
                </Text>
              </View>
              <View style={styles.containerBody.containerTexto.ul}>
                <Image
                  source={require('../../../assets/images/icon-dinheiro.png')}
                  resizeMode="contain"
                  style={styles.containerBody.containerTexto.ul.imageLi}
                />
                <Text
                  style={[
                    styles.containerBody.containerTexto.texto,
                    styles.strong,
                  ]}
                >
                  Cobertura para perda, roubo ou furto de cartão
                </Text>
              </View>
              <View style={styles.containerBody.containerTexto.ul}>
                <Image
                  source={require('../../../assets/images/icon-estrela.png')}
                  resizeMode="contain"
                  style={styles.containerBody.containerTexto.ul.imageLi}
                />
                <Text
                  style={[
                    styles.containerBody.containerTexto.texto,
                    styles.strong,
                  ]}
                >
                  Corbertura para compras ou saques sob ameaças
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.containerBody.containerTexto,
                styles.containerBody.backgroungAzul,
              ]}
            >
              <Text
                style={[
                  styles.containerBody.containerTexto.texto,
                  styles.strong,
                  styles.colorWhite,
                ]}
              >
                Um plano ideal para o seu negócio.
              </Text>
              <Text
                style={[
                  styles.containerBody.containerTexto.texto,
                  styles.colorWhite,
                ]}
              >
                Para perda, roubo ou furto do cartão e saque ou compra sob
                coação
              </Text>
            </View>

            <View style={styles.containerBody.containerTexto}>
              <Text style={styles.containerBody.containerTexto.texto}>
                <Text style={styles.strong}>Contrate agora!</Text> {'\n'}É
                simples, prático, sem burocracia e exclusivo para clientes
                ConsigAki PJ!
              </Text>
              <View style={styles.containerBody.centerImage}>
                <Image
                  source={require('../../../assets/images/cartao-consigaki.png')}
                  resizeMode="cover"
                  style={styles.containerBody.centerImage.image2}
                />
              </View>
              <Text
                style={[styles.containerBody.containerTexto.texto, styles.fs18]}
              >
                Declaro que li e estou de acordo com os{' '}
                <Text style={styles.strong}>Termos e Condições</Text> do Cartões
                Mais Proterido.
              </Text>
              <View style={styles.containerBody.containerTexto.containerButton}>
                <TouchableOpacity
                onPress={telaCamera}
                  style={
                    styles.containerBody.containerTexto.containerButton.button
                  }
                >
                  <Text
                    style={
                      styles.containerBody.containerTexto.containerButton.button
                        .buttonText
                    }
                  >
                    Contrate agora
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <PerguntasFrequentesReusable type={true} dados={dados} close={() => {}} tela={'CartaoView'}/>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default CartaoView;
