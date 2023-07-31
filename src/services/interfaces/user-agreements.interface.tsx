/* eslint-disable prettier/prettier */

export interface User {
  id: number;
  name: string;
  email: string;
  // Outros campos que podem existir em User
}

export interface Agreement {
  agreementId: number;
  terms: string;
  id?: string;
  // Outros campos que podem existir em Agreement
}

export interface LoginData {
  agreement: Agreement;
  id: number;
  jobTitle: string;
  margin: number;
  maximumAmount: number;
  position: string;
  registration: string;
  user: User;
}

export interface LoginDados {
  dadosLogin: LoginData[];
}

export interface DataLogin {
  dataLogin: LoginDados;
}

export interface RootState {
  dataLogin: DataLogin;
  data: any; // Substitua por uma interface mais específica se souber a forma exata de `data`
}