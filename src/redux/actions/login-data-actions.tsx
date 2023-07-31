/* eslint-disable prettier/prettier */
export const addDataLogin = (key, value) => ({
  type: 'ADD_DATA_LOGIN',
  payload: { key, value },
});

export const addDataLogado = (key, value) => ({
  type: 'ADD_DATA_LOGADO',
  payload: { key, value },
});

export const updateDataLogin = (key, value) => ({
  type: 'UPDATE_DATA_LOGIN',
  payload: { key, value },
});
