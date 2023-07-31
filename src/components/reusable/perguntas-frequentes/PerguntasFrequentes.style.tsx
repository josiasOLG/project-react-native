/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    padding: 16,
  },
  text: {
    fontSize: 50,
    fontWeight: '700',
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
    position: 'relative',
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: '#000000',
      fontFamily: 'Karla_700Bold',
      fontStyle: 'normal',
    },
  },
  arrowContainer: {
    padding: 16,
  },
  arrowDown: {
    padding: 8,
  },
  colorBlack: {
    color: '#333',
  },
  backAzul: {
    backgroundColor: '#2B3155',
  },
  paddingTexto: {
    paddingTop: 100,
    paddingBottom: 50,
  },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  arrowDown: {
    padding: 5,
  },
  arrowDownText: {
    fontSize: 30,
    color: '#fff',
  },
  modalText: {
    fontSize: 20,
    color: '#000',
  },
});


