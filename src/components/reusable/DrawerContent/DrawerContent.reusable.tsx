/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { deleteItem } from '../../../services/storage/SecureStorage.service';
import { setAuthentication } from '../../../redux/actions/auth.actions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { ScrollView } from 'react-native-gesture-handler';
export enum RouteNames {
  HomeView = 'HomeView',
  // Adicione outros nomes de rota conforme necessário
}

// Defina a interface para o objeto de rota
interface Route {
  routeName: RouteNames;
  label: string;
  icon: string;
  navigate: () => void;
}

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dadosReceber = useSelector(
    (state: any) => state.dataLogin.dataLogado
  );
  const logoutUser = () => {
    // Limpa o token do AsyncStorage
    deleteItem('authToken');
    dispatch(setAuthentication(false));
    // navigation.navigate('NextScreen');
  };

  const routes: Route[] = [
    {
      routeName: RouteNames.HomeView,
      label: 'Meus Dados',
      icon: require('../../../assets/images/icon-meus-dados.png'),
      navigate: () => navigation.navigate('MeusDadosView'),
    },
    {
      routeName: RouteNames.HomeView,
      label: 'Dados Bancarios',
      icon: require('../../../assets/images/dados-bancarions-icon.png'),
      navigate: () => navigation.navigate('DadosBancariosView'),
    },
    {
      routeName: RouteNames.HomeView,
      label: 'Notificações',
      icon: require('../../../assets/images/icon-notificacoes.png'),
      navigate: () => navigation.navigate('NotificacoesView'),
    },
    {
      routeName: RouteNames.HomeView,
      label: 'Alterar senha',
      icon: require('../../../assets/images/icon-alterar-senha.png'),
      navigate: () => navigation.navigate('AlterarSenhaView'),
    },
    {
      routeName: RouteNames.HomeView,
      label: 'Termos de uso',
      icon: require('../../../assets/images/icon-termos-de-uso.png'),
      navigate: () => navigation.navigate('TermosDeUsoView'),
    },
    {
      routeName: RouteNames.HomeView,
      label: 'Convênios',
      icon: require('../../../assets/images/icon-convenios.png'),
      navigate: () => navigation.navigate('MeusConvenioView'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/icon-menu.png')}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>
          {dadosReceber?.dadosLogado?.name}
        </Text>
      </View>
      <Text style={styles.menuText}>Menu</Text>
      <ScrollView>
        {routes.map((route, index) => (
          <View key={index}>
            <DrawerItem
              label={() => (
                <View style={styles.drawerItem}>
                  <Image source={route.icon} style={styles.drawerItemIcon} />
                  <Text style={styles.drawerItemText}>{route.label}</Text>
                </View>
              )}
              onPress={route.navigate}
            />
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>

      <View style={{ flex: 1 }} />
      <View style={styles.separator} />
      <DrawerItem
        labelStyle={styles.drawerItemLabel}
        style={styles.buttonClose}
        label="Sair do aplicativo"
        onPress={logoutUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3155',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  drawerItemText: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
    color: '#fff',
  },
  buttonClose: {
    marginLeft: 40,
    marginBottom: 20,
  },
  drawerItemLabel: {
    color: 'white',
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
    marginHorizontal: 15,
    opacity: 0.3,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 20,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B3155',
    padding: 20,
    height: 100,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Karla_700Bold',
    fontWeight: 500,
    textTransform: 'capitalize',
    position: 'relative',
    top: -5,
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
});

export default DrawerContent;
