/* eslint-disable prettier/prettier */

import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    centerVerital: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      image: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
      texto: {
        fontFamily: 'Karla_700Bold',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#FF3D00',
        textAlign: 'center',
        marginLeft: 15,
        width: 300,
      },
    },
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 70,
    backgroundColor: '#FCD057',
    image: {
      width: 30,
      height: 30,
      marginLeft: 10,
      transform: [{ rotate: '180deg' }],
    },
    imageClose: {
      width: 30,
      height: 30,
    },
  },
  alertErro: {
    backgroundColor: '#FF3D00',
  },
  alertSucesso: {
    backgroundColor: '#6FBE36',
  },
  iconBaixo: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 5,
    top: 0,
  },
  iconCima: {
    width: 10,
    height: 10,
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    top: 0,
    right: 0,
  },
  textoFooter: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 10, // maior valor indica que a sombra se estenderá mais para a direita
      height: 10, // maior valor indica que a sombra se estenderá mais para baixo
    },
    shadowOpacity: 1.0, // valor máximo (1.0) tornará a sombra totalmente opaca (muito escura)
    shadowRadius: 0, // menor valor (0) fará a sombra nítida (não borrada)
    elevation: 4, // isso é necessário para o Android para aplicar a sombra
    texto: {
      fontFamily: 'Karla_700Bold',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#fff',
      marginLeft: 15,
    },
  },
  topColumn: {
    flex: 1,
  },
  textoBaixar: {
    fontFamily: 'Karla_700Bold',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rigthContent: {
    alignItems: 'flex-end',
  },
  image: {
    width: 35,
    height: 35,
  },
  titulo: {
    fontFamily: 'Karla_700Bold',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#333',
  },
  cardBodytexto: {
    // marginBottom: 10,
    position: 'relative',
    titulo: {
      fontFamily: 'Karla_700Bold',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '300',
      textAlign: 'left',
      color: '#333',
    },
    subtitulo: {
      fontFamily: 'Karla_700Bold',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#000',
    },
  },
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 10, // maior valor indica que a sombra se estenderá mais para a direita
      height: 10, // maior valor indica que a sombra se estenderá mais para baixo
    },
    shadowOpacity: 1.0, // valor máximo (1.0) tornará a sombra totalmente opaca (muito escura)
    shadowRadius: 0, // menor valor (0) fará a sombra nítida (não borrada)
    elevation: 4, // isso é necessário para o Android para aplicar a sombra
  },
  col1: {
    width: '8.33%',
  },
  col2: {
    width: '16.66%',
  },
  col3: {
    width: '25%',
  },
  col4: {
    width: '33.33%',
  },
  col5: {
    width: '41.66%',
    margin: 0,
    padding: 0,
  },
  col6: {
    width: '50%',
    margin: 0,
    padding: 0,
  },
  col7: {
    width: '58.33%',
    margin: 0,
    padding: 0,
  },
  col8: {
    width: '66.66%',
  },
  col9: {
    width: '75%',
  },
  col10: {
    width: '83.33%',
  },
  col11: {
    width: '91.66%',
  },
  col12: {
    width: '100%',
  },
});
