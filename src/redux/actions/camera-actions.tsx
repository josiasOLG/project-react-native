/* eslint-disable prettier/prettier */
export const addDataCamera = (key, value) => ({
  type: 'ADD_DATA_CAMERA',
  payload: { key, value },
});

export const updateDataCamera = (key, value) => ({
  type: 'UPDATE_DATA_CAMERA',
  payload: { key, value },
});
