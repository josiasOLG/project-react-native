/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './AnaliseCartao.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const AnaliseCartaoView = ({ route }) => {
  const { titulo, url, tela } = route.params ?? {};
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.navigate('CartaoView');
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
            <Text style={styles.titulo}>{titulo ? titulo : 'Cartão consignado'}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.containerBody}>
            <View style={styles.containerBody.centerImage}>
              <Image
                source={require('../../../assets/images/analise.png')}
                resizeMode="contain"
                style={styles.containerBody.centerImage.image}
              />
            </View>
            <View style={styles.containerBody.containerTexto}>
              <Text style={styles.containerBody.containerTexto.texto}>
                <Text style={[styles.strong, styles.containerBody.containerTexto.subtitulo]}>Sua solicitação está sendo analisada</Text>
                {'\n'}Lorem ipsum dolor sit amet,   elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              </Text>
              <Text style={[styles.strong, styles.containerBody.containerTexto.subtitulo]}>Dados do seguro:</Text>
              <Text style={styles.containerBody.containerTexto.texto}>
                CNPJ da empresa: {'\n'}
                <Text style={[styles.strong, styles.colorBlack]}>39.597.753/0001-50</Text>
              </Text>
              <Text style={styles.containerBody.containerTexto.texto}>
                Forma de pagamento: {'\n'}
                <Text style={[styles.strong, styles.colorBlack]}>Débito em conta</Text>
              </Text>
              <Text style={styles.containerBody.containerTexto.texto}>
                Valor da mensalidade: {'\n'}
                <Text style={[styles.strong, styles.colorBlack]}>R$ 2,90</Text>
              </Text>
              <View style={styles.containerBody.containerTexto.ul}>
                <View style={[styles.col1, styles.containerBody.centerImage]}>
                  <Image
                    source={require('../../../assets/images/analise.png')}
                    resizeMode="contain"
                    style={styles.containerBody.containerTexto.ul.imageLi}
                  />
                </View>
                <View style={styles.col11}>
                  <View style={styles.conteinerFooterText}>
                    <Text style={styles.conteinerFooterText.titulo}>Acionamento do seguro</Text>
                    <Text style={styles.conteinerFooterText.subtitulo}>Lembre-se que o seguro deve ser acionado pelo repersentante legal da empresa</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default AnaliseCartaoView;
