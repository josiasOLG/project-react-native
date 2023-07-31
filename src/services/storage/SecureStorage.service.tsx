/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Converte a string de volta para o formato original (normalmente, objeto)
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
