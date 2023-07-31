/* eslint-disable prettier/prettier */

export interface Product {
  id: number;
  name: string;
  type: number;
}

export interface Data {
  id: number;
  integration_code: null | string;
  amount: number | string;
  installment: string;
  fee: string;
  status: number;
  cobUri: string;
  product: Product;
}

export interface RootObject {
  data: Data[];
  message: string;
}

