/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  iconBaixo: {
    marginTop: 10,
  },
  iconCima: {
    transform: [{ rotate: '180deg' }],
  },
  title: {
    color: '#333',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginBottom: 10,
  },
});
