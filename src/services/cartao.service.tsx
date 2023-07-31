/* eslint-disable prettier/prettier */
import { API_BASE_URL } from '../config/constants/api';
import BaseService from './base.service';

class CartaoService extends BaseService {
  constructor() {
    super(API_BASE_URL);
  }
}

export default new CartaoService();
