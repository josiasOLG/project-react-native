/* eslint-disable prettier/prettier */

import BaseService from './base.service';

class CriarSenhaService extends BaseService {
  constructor() {
    super('/users');
  }

  async criar(id: any, data: any) {
    const response = await this.put('/' + id + '/create-password', data);
    return response.data;
  }
}

export default new CriarSenhaService();
