/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B3155',
    paddingVertical: 15,
    borderRadius: 0,
    width: '100%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 20,
    position: 'relative',
  },
  icon: {
    width: 11.4,
    height: 20,
    marginRight: 20,
  },
});
