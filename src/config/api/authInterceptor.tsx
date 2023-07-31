/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const authInterceptor = async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting token from AsyncStorage', error);
  }

  return config;
};

export default authInterceptor;
