/* eslint-disable prettier/prettier */
import apiClient from '../config/api/apiClient';

class BaseService {

  public resourcePath: any;

  constructor(resourcePath: any) {
    this.resourcePath = resourcePath;
  }

  async getAll() {
    const response = await apiClient.get(`${this.resourcePath}`);
    return response.data;
  }

  async get(url: any) {
    const response = await apiClient.get(`${this.resourcePath}/${url}`);
    return response.data;
  }

  async create(data: any) {
    const response = await apiClient.post(`${this.resourcePath}`, data);
    return response.data;
  }

  async update(id: any, data: any) {
    const response = await apiClient.put(`${this.resourcePath}/${id}`, data);
    return response.data;
  }

  async delete(path: any, id: any) {
    console.log(`${this.resourcePath}${path}/${id}`);
    const response = await apiClient.delete(`${this.resourcePath}${path}/${id}`);
    return response.data;
  }

  async post(path: any, data: any) {
    const response = await apiClient.post(`${this.resourcePath}${path}`, data);
    return response;
  }

  async postData(path: any, data: any) {
    const response = await apiClient.post(`${this.resourcePath}${path}`, data);
    return response?.data;
  }

  async postFormData(path, data) {
    const response = await apiClient.post(`${this.resourcePath}${path}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async patchFormData(path, data) {
    // const formData = new FormData();
    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     formData.append(key,{
    //       uri: data[key],
    //       name: 'photo.jpg',
    //       type: 'image/jpeg',
    //     });
    //   }
    // }
    const response = await apiClient.patch(`${this.resourcePath}${path}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async put(path: any, data: any) {
    const response = await apiClient.put(`${this.resourcePath}${path}`, data);
    return response;
  }
}

export default BaseService;
