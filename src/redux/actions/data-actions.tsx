/* eslint-disable prettier/prettier */
export const addData = (key, value) => ({
  type: 'ADD_DATA',
  payload: { key, value },
});

export const updateData = (key, value) => ({
  type: 'UPDATE_DATA',
  payload: { key, value },
});
