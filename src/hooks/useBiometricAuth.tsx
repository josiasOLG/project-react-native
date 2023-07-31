/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication } from '../../src/redux/actions/auth.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { getItem } from '../services/storage/SecureStorage.service';

const useBiometricAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const authWithBiometrics = async () => {
      const isBiometricOn = await AsyncStorage.getItem('biometricOn');
      if (isAuthenticated && isBiometricOn === 'true') {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync();
          if (!result.success) {
            // Desloga o usuário
            await AsyncStorage.removeItem('authToken');
            dispatch(setAuthentication(false));
            Alert.alert(
              'Erro de autenticação',
              'A autenticação biométrica falhou. Por favor, faça login novamente.'
            );
          }
        }
      }
    };

    authWithBiometrics();
  }, [isAuthenticated, dispatch]);
};

export default useBiometricAuth;
