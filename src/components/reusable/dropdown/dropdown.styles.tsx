/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 10, // maior valor indica que a sombra se estenderá mais para a direita
      height: 10, // maior valor indica que a sombra se estenderá mais para baixo
    },
    shadowOpacity: 1.0, // valor máximo (1.0) tornará a sombra totalmente opaca (muito escura)
    shadowRadius: 0, // menor valor (0) fará a sombra nítida (não borrada)
    elevation: 4, // isso é necessário para o Android para aplicar a sombra
  },
  dropdownItem: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 10, // maior valor indica que a sombra se estenderá mais para a direita
      height: 10, // maior valor indica que a sombra se estenderá mais para baixo
    },
    shadowOpacity: 1.0, // valor máximo (1.0) tornará a sombra totalmente opaca (muito escura)
    shadowRadius: 0, // menor valor (0) fará a sombra nítida (não borrada)
    elevation: 4, // isso é necessário para o Android para aplicar a sombra
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 10,
  },
  image: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  listItemTitle: {
    fontSize: 18,
    color: '#333',
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 10,
  },
  listItemDescription: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 10,
  },
});