/* eslint-disable prettier/prettier */

import BaseService from './base.service';

class EnviarCodigoService extends BaseService {
  constructor() {
    super('/users');
  }

  async confirToken(id: any, data: any) {
    const response = await this.put('/' + id + '/confirm-token', data);
    return response.data;
  }

  async sendToken(cpf: any) {
    const response = await this.get(cpf + '/send-token');
    return response.data;
  }
  // Adicione métodos específicos do UserService aqui, se necessário
}

export default new EnviarCodigoService();
