/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import NextView from '../components/screens/next/Next.view';
import CpfView from '../components/screens/cpf/Cpf.view';
import WelcomeView from '../components/screens/welcome/Welcome.view';
import NomeView from '../components/screens/nome/Nome.view';
import DataNascimentoView from '../components/screens/data-nascimento/DataNascimento.view';
import EmailView from '../components/screens/email/Email.view';
import NumeroCelularView from '../components/screens/numero-celular/NumeroCelular.view';
import ReceberCodigoView from '../components/screens/receber-codigo/ReceberCodigo.view';
import EnviarCodigoView from '../components/screens/enviar-codigo/EnviarCodigo.view';
import TermoView from '../components/screens/termo/Termo.view';
import CriarSenhaView from '../components/screens/criar-senha/CriarSenha.view';
import CarregandoView from '../components/reusable/carregando/Carregando.view';
import LoginView from '../components/screens/login/Login.view';
import HomeView from '../components/screens/home/home.view';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FormularioView from '../components/screens/formulario/formulario.view';
import RespostaView from '../components/screens/resposta/Resposta.view';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthenticatedRoutes = () => {
  const headerTransparent = {
    ...TransitionPresets.SlideFromRightIOS,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#000',
    headerTransparent: true,
    headerTitle: '',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NextScreen"
        component={NextView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CpfView"
        component={CpfView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="WelcomeView"
        component={WelcomeView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="NomeView"
        component={NomeView}
        options={headerTransparent}
      />
      <Stack.Screen
        name="DataNascimentoView"
        component={DataNascimentoView}
        options={headerTransparent}
      />
      <Stack.Screen
        name="EmailView"
        component={EmailView}
        options={headerTransparent}
      />
      <Stack.Screen
        name="NumeroCelularView"
        component={NumeroCelularView}
        options={headerTransparent}
      />
      <Stack.Screen
        name="ReceberCodigoView"
        component={ReceberCodigoView}
        options={headerTransparent}
      />
      <Stack.Screen
        name="EnviarCodigoView"
        component={EnviarCodigoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="TermoView"
        component={TermoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="CriarSenhaView"
        component={CriarSenhaView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />

      <Stack.Screen
        name="CarregandoView"
        component={CarregandoView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="LoginView"
        component={LoginView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="FormularioView"
        component={FormularioView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="RespostaView"
        component={RespostaView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      {/* <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      /> */}

    </Stack.Navigator>
  );
};

// const AuthenticatedRoutes = () => {
//   const optionsMenu = {
//     drawerLabel: ({ focused, color }) => (
//       <Text
//         style={{
//           color: focused ? '#fff' : '#fff',
//           fontFamily: 'Karla_700Bold',
//           fontSize: 18,
//           fontWeight: '300',
//           textAlign: 'left',
//         }}
//       >
//         Meus dados
//       </Text>
//     ),
//     drawerIcon: ({ focused, size, color }) => (
//       <Image
//         source={require('../assets/images/icon-meus-dados.png')}
//         style={{ width: size, height: size }}
//       />
//     ),
//   };
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerPosition: 'right',
//       }}
//       drawerContent={(props) => <DrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Meus Dados" component={HomeStackNavigator} />
//     </Drawer.Navigator>
//   );
// };

export default AuthenticatedRoutes;
