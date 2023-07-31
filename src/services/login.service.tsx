/* eslint-disable prettier/prettier */

import BaseService from './base.service';

class LoginService extends BaseService {
  constructor() {
    super('');
  }

  async login(data: any) {
    const response = await this.post('login-app', data);
    return response.data;
  }
}

export default new LoginService();
