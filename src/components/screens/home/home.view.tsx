/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import styles from './home.style';
import Carousel from 'react-native-snap-carousel';
import homeService from '../../../services/home.service';
import {
  ResponseObject,
  RootState,
} from '../../../services/interfaces/user-agreements.interface';
import { isEmpty } from '../../../services/utils';
import { useDispatch } from 'react-redux';
import {
  addDataLogado,
  addDataLogin,
} from '../../../redux/actions/login-data-actions';
import { TelaEnum } from '../../../services/enums/cps/tela.enum';
import cpsService from '../../../services/cps.service';
import { Data } from '../../../services/interfaces/cps.interface';
import SvgIconVisuClose from '../../../assets/svgs/icon-visu-close';
import SvgIconVisuOpen from '../../../assets/svgs/icon-visu-open';
import { CardSkeleton } from '../../skeleton/Card.skeleton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { setLoading } from '../../../redux/actions/loading.actions';

interface Props {
  navigation?: any;
}
interface ItemProp {
  matricula: string;
  cargo: string;
}

interface DadosProp {
  data?: any;
  message?: string;
}

const HomeView: React.FC<Props> = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedUser, setselectedUser] = useState<any | null>(null);
  const [dados, setdados] = useState<any | null>(null);
  const [banners, setBanners] = useState<any | null>(null);
  const [isValores, setIsValores] = useState<any | null>(true);
  const navigationTela = useNavigation();
  const dispatch = useDispatch();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const fetchDataBanners = async (id?: string) => {
    if (id !== undefined && id !== null) {
      const response: any = await homeService.get(
        `agreement-products/${id.toString()}`
      );
      setBanners(response.data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true)); // Ativar o estado de carregamento antes das requisições
          const response: RootState = await homeService.get('user-agreements');
          const responseUser: RootState = await homeService.get('users/user');
          setdados(response.data);
          dispatch(addDataLogin('dadosLogin', response?.data));
          dispatch(addDataLogado('dadosLogado', responseUser?.data));
          setSelectedItem(response?.data[0]);
          setselectedUser(responseUser?.data);
          fetchDataBanners(response?.data[0]?.agreement?.id);
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoading(false)); // Desativar o estado de carregamento após as conclusões das requisições ou quando ocorrer um erro
        }
      };
      fetchData();
    }, [])
  );

  const telaContrato = async () => {
    const response: RootState = await cpsService.get('loans/paid');
    navigationTela.navigate('CpsView', {
      titulo: 'Contratos',
      url: '',
      tela: TelaEnum.Tela1,
      data: response?.data,
    });
  };

  const telaPendencia = async () => {
    const response: RootState = await cpsService.get('loans/pending');
    navigationTela.navigate('CpsView', {
      titulo: 'Pendência',
      url: '',
      tela: TelaEnum.Tela2,
      data: response?.data,
    });
  };

  const telaSolicitacao = async () => {
    const response: RootState = await cpsService.get('loans/requested');
    navigationTela.navigate('CpsView', {
      titulo: 'Solicitação',
      url: '',
      tela: TelaEnum.Tela3,
      data: response?.data,
    });
  };

  const getStyleBasedOnData = (dados: any) => {
    if (dados?.length <= 0) {
      return {
        opacity: styles.disabled.opacity,
        backgroundColor: styles.disabled.backgroundColor,
        color: styles.disabled.color,
      };
    } else {
      return {
        opacity: styles.enabled.opacity,
        backgroundColor: styles.enabled.backgroundColor,
        color: styles.disabled.color,
      };
    }
  };

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

  const handleSnapToItem = (index) => {
    setSelectedItem(dados[index]);
    fetchDataBanners(dados[index].agreement.id);
  };

  const verValores = () => {
    setIsValores((isValores) => !isValores);
  };

  const nextPage = (item?: any) => {
    navigation.navigate('HomeNegociarView', { data: item });
  };

  const clickBanner = (item: any) => {
    if (item?.products?.type === 1) {
      navigation.navigate('HomeNegociarView', { data: selectedItem });
    } else {
      navigation.navigate('CartaoView');
    }
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => nextPage(item)}>
        <View
          style={styles.card}
          pointerEvents={dados?.length <= 0 ? 'none' : 'auto'}
        >
          <View style={styles.cardBody}>
            <View style={styles.col8}>
              <Text style={styles.cardTextHoje}>Você pode ter hoje:</Text>
              <Text style={styles.real}>R$</Text>
              <Text style={styles.cardText}>
                {isValores
                  ? item?.maximumAmount
                    ? item?.maximumAmount
                    : '0'
                  : '*****'}
              </Text>
            </View>
            <View style={styles.col4}>
              <TouchableOpacity
                onPress={verValores}
                style={styles.imageContainer}
              >
                {isValores ? <SvgIconVisuOpen /> : <SvgIconVisuClose />}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[styles.cardFooter, getStyleBasedOnData(dados).bakground]}
          >
            <Text style={styles.footerText}>Como? ver as parcelas</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderBanner = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => clickBanner(item)}>
        <View style={[styles.card, getStyleBasedOnData(dados).bakground]}>
          <View style={styles.cardBody}>
            <View style={styles.col12}>
              <View>
                <Image
                  resizeMode="cover"
                  style={[styles.cardHomeIcon]}
                  source={{ uri: item?.banner }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const irTelaSeguro = () => {
    navigationTela.navigate('SeguroView');
  };

  const handleToqueAqui = () => {
    navigationTela.navigate('MeusConvenioView');
  };

  const clickWhatsapp = () => {
    const url = 'whatsapp://send?text=Olá!&phone=+5511999999999'; // substitua +5511999999999 pelo número do WhatsApp para o qual você deseja enviar a mensagem
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        showToast(
          'error',
          'Atenção!',
          `Não consigo abrir a URL: ${url}`
        );
      }
    });
  };

  const screenWidth = Dimensions.get('window').width;
  const screenWidthBanner = Dimensions.get('window').width;

  const screenWidthItem = Dimensions.get('window').width - 40;
  const screenWidthItemBanner = Dimensions.get('window').width - 40;
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <Fragment>
      <StatusBar
        style={{ paddingTop: statusBarHeight }}
        backgroundColor="#FCD057"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.container.topo}>
          <Image
            style={styles.imageTopo}
            source={require('../../../assets/images/icon-amarelo.png')}
            resizeMode="contain"
          />
          <View style={styles.container.topo.header}>

            <Text style={styles.container.topo.header.welcomeText}>
              Olá, {selectedUser?.name}
            </Text>

          </View>
          <View style={styles.container.topo.infoRow}>
            <View style={styles.container.topo.infoRow.infoColumn}>
              <Text style={styles.container.topo.infoRow.infoColumn.infoLabel}>
                Matrícula
              </Text>
              <Text style={styles.container.topo.infoRow.infoColumn.infoValue}>
                {selectedItem?.registration ? (
                  selectedItem?.registration
                ) : (
                  <Text style={styles.centerText}>--</Text>
                )}
              </Text>
            </View>
            <View style={styles.container.topo.infoRow.infoColumn}>
              <Text style={styles.container.topo.infoRow.infoColumn.infoLabel}>
                Cargo
              </Text>
              <Text style={styles.container.topo.infoRow.infoColumn.infoValue}>
                {selectedItem?.jobTitle ? (
                  selectedItem?.jobTitle ? selectedItem?.jobTitle : <CardSkeleton width={60} height={20}/>
                ) : (
                  <Text style={styles.centerText}>--</Text>
                )}
              </Text>
            </View>
            <View style={styles.container.topo.infoRow.infoColumn} />
          </View>
          <View style={styles.container.topo.fullWidthSection}>
            <Text style={styles.container.topo.fullWidthSection.sectionText}>
              {selectedItem?.agreement?.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleMenuPress}
            style={styles.container.topo.header.menuButton}
          >
            <Image
              style={styles.container.topo.header.menuButton.image}
              source={require('../../../assets/images/menu.png')}
            />
            {/* <Text style={styles.menuText}>☰</Text> */}
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container.scrollview}>
          {dados?.length <= 0 && (
            <View style={[styles.alert, styles.alertErro]}>
              <View style={styles.col1}>
                <Image
                  source={require('../../../assets/images/icon-info.png')}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.col11}>
                <Text style={styles.textoAlert}>
                  Você precisa informar suas credenciais do convênio{' '}
                  <Text
                    style={[styles.textoAlert, styles.line]}
                    onPress={handleToqueAqui}
                  >
                    Toque aqui
                  </Text>
                </Text>
              </View>
            </View>
          )}
          <View style={styles.container.scrollview.carouselContainer}>
            <Carousel
              data={dados}
              renderItem={_renderItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidthItem}
              onSnapToItem={handleSnapToItem}
              layout={'default'}
              enableSnap
              contentContainerCustomStyle={
                styles.container.scrollview.carouselContainer
                  .contentContainerItens
              }
            />
            {dados?.length === 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            )}
          </View>
          <View style={styles.container.containerFlatList}>
            <View style={styles.container.col2}>
              <TouchableOpacity
                style={styles.item}
                onPress={telaContrato}
                disabled={dados?.length <= 0 ? true : false}
              >
                <Image
                  source={require('../../../assets/images/icon-home1.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
                <Text style={styles.text}>Contratos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container.col2}>
              <TouchableOpacity
                style={styles.item}
                onPress={telaPendencia}
                disabled={dados?.length <= 0 ? true : false}
              >
                <Image
                  source={require('../../../assets/images/icon-home2.png')}
                  style={styles.image}
                />
                <Text style={styles.text}>Pendêcias</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container.col2}>
              <TouchableOpacity
                style={styles.item}
                onPress={telaSolicitacao}
                disabled={dados?.length <= 0 ? true : false}
              >
                <Image
                  source={require('../../../assets/images/icon-home3.png')}
                  style={styles.image}
                />
                <Text style={styles.text}>Solicitações</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container.carouselBanner}>
            <Carousel
              data={banners}
              renderItem={_renderBanner}
              sliderWidth={screenWidthBanner}
              itemWidth={screenWidthItemBanner}
              layout={'default'}
              decelerationRate={0.99}
              enableSnap
              contentContainerCustomStyle={
                styles.container.carouselBanner.contentContainerItensBanner
              }
            />
            {dados?.length === 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            )}
          </View>
          <View style={styles.container.containerFlatList}>
            <View style={styles.container.col2}>
              <TouchableOpacity onPress={irTelaSeguro}>
                <View style={styles.itemBodyhome}>
                  <View style={styles.itemBodyhome.card}>
                    <Image
                      style={styles.itemBodyhome.card.image}
                      source={require('../../../assets/images/porco.png')}
                    />
                    <Text style={styles.itemBodyhome.textBodyhome}>
                      Veja o passo a passo de como fazer seguro de vida
                    </Text>
                  </View>
                  <View style={styles.footerCardText}>
                    <Text style={styles.footerCardText.text}>Seguro</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.container.col2}>
              <TouchableOpacity onPress={irTelaSeguro}>
                <View style={styles.itemBodyhome}>
                  <View style={styles.itemBodyhome.card}>
                    <Image
                      style={styles.itemBodyhome.card.image}
                      source={require('../../../assets/images/moeda.png')}
                    />
                    <Text style={styles.itemBodyhome.textBodyhome}>
                      Veja o passo a passo de como fazer seguro de vida
                    </Text>
                  </View>
                  <View style={styles.footerCardText}>
                    <Text style={styles.footerCardText.text}>
                      Veja o passo a passo de como fazer seguro de vida
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container.bannerFooter}>
            <TouchableOpacity onPress={clickWhatsapp}>
              <Image
                style={styles.container.bannerFooter.image}
                resizeMode="contain"
                source={require('../../../assets/images/banner-footer.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default HomeView;
