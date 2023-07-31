/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%', // Faz o modal ocupar metade da altura da tela
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontWeight: '800',
  },
  modalSubTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontWeight: '400',
  },
  modalFooter: {
    paddingHorizontal: 0,
    marginTop: 'auto',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 0,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B3155',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '400',
    marginLeft: 20,
    position: 'relative',
  },
  modalIconButton: {
    width: 11.4,
    height: 20,
    marginRight: 20,
  },
  modalArrow: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    marginBottom: 40,
  },
  modalLinkButton: {
    marginTop: 10,
  },
  modalTextCancelar: {
    fontSize: 14,
    marginBottom: 0,
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontWeight: '400',
    textDecorationLine : 'underline',
  },
});
