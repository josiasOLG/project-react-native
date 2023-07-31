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
        letterSpacing: 1,
      },
    },
  },
  containerBody: {
    flex: 1,
    centerImage: {
      alignContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      image: {
        width: 140,
        height: 140,
      },
      image2: {
        width: 550,
        height: 250,
      },
    },
    containerTexto: {
      padding: 20,
      texto: {
        fontFamily: 'Karla_700Bold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '300',
        textAlign: 'left',
        color: '#2B3155',
        marginBottom: 5,
        lineHeight: 28,
        letterSpacing: 1,
      },
      subtitulo: {
        fontSize: 30,
        color: '#2B3155',
        letterSpacing: 1,
      },
      containerButton: {
        flex: 1,
        button: {
          paddingVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2B3155',
          borderRadius: 10,
          buttonText: {
            color: '#fff',
            fontSize: 20,
            textTransform: 'capitalize',
            fontFamily: 'Karla_700Bold',
            fontWeight: '700',
          },
        },
      },
      ul: {
        flex: 1,
        flexDirection: 'row',
        imageLi: {
          marginRight: 10,
          marginTop: 10,
          width: 34,
          height: 34,
        },
      },
    },
    backgroungAzul: {
      backgroundColor: '#2B3155',
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
      transform: [{ rotate: '180deg' }],
      marginLeft: 10,
    },
    imageClose: {
      width: 30,
      height: 30,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    rigthContent: {
      alignItems: 'flex-end',
    },
  },
  conteinerFooterText:{
    width: '100%',
    paddingLeft: 15,
    paddingVertical: 20,
    titulo: {
      fontFamily: 'Karla_700Bold',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '700',
      color: '#000',
      letterSpacing: 1,
    },
    subtitulo: {
      fontFamily: 'Karla_300Light',
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: '300',
      color: '#000',
      letterSpacing: 1,
    },
  },
  alertErro: {
    backgroundColor: '#FF3D00',
  },
  alertSucesso: {
    backgroundColor: '#6FBE36',
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
  titulo: {
    fontFamily: 'Karla_700Bold',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#333',
  },
  colorBlack: {
    color: '#000',
  },
  fs18: {
    fontSize: 18,
    lineHeight: 25,
  },
  strong: {
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
  },
  colorWhite: {
    color: '#fff',
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
