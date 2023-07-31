/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  upperSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'Karla_700Bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontWeight: 800,
  },
  bottomSection2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    top: 0,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 'auto',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 60,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonText: {
    color: '#2B3155',
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'Karla_700Bold',
    fontWeight: 700,
  },
  modalContainer: {
    flex: 2,
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 20,
    color: '#000',
  },
  setaCima: {},
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  smallText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 0,
    fontFamily: 'Karla_700Bold',
    fontWeight: 700,
  },
  arrowDown: {
    padding: 5,
  },
  arrowDownText: {
    fontSize: 30,
    color: '#fff',
  },
});
