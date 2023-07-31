/* eslint-disable prettier/prettier */

export interface SimulationOption {
  item: string;
  installment: string;
  term: string;
}

export interface SimulationData {
  margin: string;
  maximumAmount: string;
  simulationOptions: SimulationOption[];
}

export interface ApiResponse {
  data: SimulationData;
  message: string;
}