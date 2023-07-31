import React, { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigator';
import ToastReusable from './src/components/reusable/toast/toast.reusable';
import { loadFonts } from './src/services/font/loadFonts';
import { View, StyleSheet } from 'react-native';
import { setAuthentication } from './src/redux/actions/auth.actions';
import { getItem } from './src/services/storage/SecureStorage.service';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useBiometricAuth from './src/hooks/useBiometricAuth';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNotificationListeners } from './src/hooks/useExpoPushNotifications';
import NotificationService from './src/services/notifications/NotificationService';
import { initializeApp } from 'firebase/app';
import LoadingModal from './src/components/reusable/loading/loading.reusable';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#333',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'your-font-family',
      fontWeight: 'normal',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B3155',
  },
});

const AppLogic = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  SplashScreen.preventAutoHideAsync();

  const firebaseConfig = {
    apiKey: 'AIzaSyAbSdqZtKtg-aCKvDi_gzgyCZKZSi9dHJQ',
    authDomain: 'consigaki-123a1.firebaseapp.com',
    projectId: 'consigaki-123a1',
    storageBucket: 'consigaki-123a1.appspot.com',
    messagingSenderId: '999383171014',
    appId: '1:999383171014:android:ea4be610873e40ede07cc7',
  };

  initializeApp(firebaseConfig);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    async function loadAppResources() {
      await loadFonts();
      // await Asset.fromModule(
      //   require('./src/assets/lottie/splashscreenAnimacao.json')
      // ).downloadAsync();
      setFontLoaded(true);
      setAnimationLoaded(true);
    }
    loadAppResources();
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getItem('authToken');
      } catch (e) {
        // Restoring token failed
      }
      if (userToken) {
        dispatch(setAuthentication(true));
        setIsAuthenticated(true);
      } else {
        dispatch(setAuthentication(false));
        setIsAuthenticated(false);
      }
    };
    bootstrapAsync();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Shows the splash screen for 5 seconds
  }, []);

  useNotificationListeners();
  NotificationService.registerForPushNotificationsAsync();

  useBiometricAuth();

  if (!fontLoaded || !animationLoaded) {
    return null;
  }

  if (showSplash) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('./src/assets/lottie/splashscreenAnimacao.json')}
          autoPlay
        />
      </View>
    );
  }

  return (
    <>
      <AppNavigation />
      <ToastReusable />
      <LoadingModal />
    </>
  );
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <AppLogic />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
