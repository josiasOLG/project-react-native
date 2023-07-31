/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import CarregandoView from '../components/reusable/carregando/Carregando.view';
import HomeView from '../components/screens/home/home.view';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/reusable/DrawerContent/DrawerContent.reusable';
import CpsView from '../components/screens/cps/Cps.view';
import CartaoView from '../components/screens/cartao/Cartao.view';
import HomeNegociarView from '../components/screens/negociar/home-negociar/HomeNegociar.view';
import FormularioView from '../components/screens/formulario/formulario.view';
import WelcomeNegocioView from '../components/screens/negociar/welcome-negociar/WelcomeNegocio.view';
import TextoNegociarView from '../components/screens/negociar/texto-negociar/TextoNegociar.view';
import DocumentoView from '../components/screens/negociar/documento/Documento.view';
import AcessoCameraView from '../components/screens/negociar/acesso-camera/AcessoCamera.view';
import CameraView from '../components/screens/negociar/cemera/Camera.view';
import EnvioImagensView from '../components/screens/negociar/enviar-imagens/EnviarImagens.view';
import AnaliseCartaoView from '../components/screens/analise-cartao/AnaliseCartao.view';
import MeusDadosView from '../components/screens/meus-dados/MeusDados.view';
import NotificacoesView from '../components/screens/notificacoes/Notificacoes.view';
import ConvenioView from '../components/screens/convenio/Convenio.view';
import AlterarSenhaView from '../components/screens/alterar-senha/AlterarSenha.view';
import SalvarConvenioView from '../components/screens/convenio/salvar-convenio/SalvarConvenio.view';
import MeusConvenioView from '../components/screens/convenio/meus-convenios/MeusConvenio.view';
import TermosDeUsoView from '../components/screens/termos-de-uso/TermosDeUso.view';
import SeguroView from '../components/screens/seguro/Seguro.view';
import IlegivelView from '../components/screens/cps/ilegivel/Ilegivel.view';
import DadosBancariosView from '../components/screens/dados-bancarios/DadosBancarios.view';
import RespostaView from '../components/screens/resposta/Resposta.view';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {

  const createHeaderOptions = (headerTintColor?: any) => ({
    ...TransitionPresets.SlideFromRightIOS,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: headerTintColor ? headerTintColor : '#000',
    headerTransparent: true,
    headerTitle: '',
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CpsView"
        component={CpsView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CartaoView"
        component={CartaoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="AnaliseCartaoView"
        component={AnaliseCartaoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="HomeNegociarView"
        component={HomeNegociarView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CarregandoView"
        component={CarregandoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="WelcomeNegocioView"
        component={WelcomeNegocioView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="TextoNegociarView"
        component={TextoNegociarView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />

      <Stack.Screen
        name="DocumentoView"
        component={DocumentoView}
        options={createHeaderOptions('#000')}
      />
      <Stack.Screen
        name="AcessoCameraView"
        component={AcessoCameraView}
        options={createHeaderOptions('#000')}
      />
      <Stack.Screen
        name="CameraView"
        component={CameraView}
        options={createHeaderOptions('#fff')}
      />
      <Stack.Screen
        name="EnvioImagensView"
        component={EnvioImagensView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="MeusDadosView"
        component={MeusDadosView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="NotificacoesView"
        component={NotificacoesView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="ConvenioView"
        component={ConvenioView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="AlterarSenhaView"
        component={AlterarSenhaView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="MeusConvenioView"
        component={MeusConvenioView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />

      <Stack.Screen
        name="SalvarConvenioView"
        component={SalvarConvenioView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="TermosDeUsoView"
        component={TermosDeUsoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="SeguroView"
        component={SeguroView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="IlegivelView"
        component={IlegivelView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="DadosBancariosView"
        component={DadosBancariosView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="RespostaView"
        component={RespostaView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />


    </Stack.Navigator>
  );
};

const OnBoard = () => {
  const optionsMenu = {
    drawerLabel: ({ focused, color }) => (
      <Text
        style={{
          color: focused ? '#fff' : '#fff',
          fontFamily: 'Karla_700Bold',
          fontSize: 18,
          fontWeight: '300',
          textAlign: 'left',
        }}
      >
        Meus dados
      </Text>
    ),
    drawerIcon: ({ focused, size, color }) => (
      <Image
        source={require('../assets/images/icon-meus-dados.png')}
        style={{ width: size, height: size }}
      />
    ),
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Meus Dados" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};

export default OnBoard;
