/* eslint-disable prettier/prettier */
import axios, { AxiosError } from 'axios';
import authInterceptor from './authInterceptor';
import { apiConfig } from './apiConfig';
import { API_BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem } from '../../services/storage/SecureStorage.service';
import store from '../../redux/store';
import { setLoading } from '../../redux/actions/loading.actions';
const apiClient = axios.create(apiConfig);

apiClient.interceptors.request.use(authInterceptor);

apiClient.interceptors.response.use(
  response => {
    store.dispatch(setLoading(false));
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const dados = await getItem('AUTH');
    store.dispatch(setLoading(false));
    // Se a resposta for 401 e não estivermos atualmente atualizando o token
    if ((error.response.status === 401 || error.response.status === 404) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Tentar atualizar o token
        const refreshResponse = await apiClient.post(API_BASE_URL + '/login-app', {
          cpf: dados?.cpf,
          password: dados?.password,
          expoPushToken: "1"
        });
        const newToken = refreshResponse.data.token;
        await AsyncStorage.setItem('token', newToken);
        apiClient.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        // Se a atualização do token falhar, não tente novamente e apenas rejeite o erro
        return Promise.reject(refreshError);
      }
    }
    // Para outros erros, apenas os rejeite
    return Promise.reject(error);
  }
);



export default apiClient;
