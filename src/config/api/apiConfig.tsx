/* eslint-disable prettier/prettier */
import { API_BASE_URL, API_TIMEOUT } from '../constants/api';
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',

  },
  withCredentials: true,
};
