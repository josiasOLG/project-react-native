/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    paddingBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    cardBody: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 20,
      bodyTextos: {
        paddingHorizontal: 0,
      },
    },
    cardTextHoje: {
      fontFamily: 'Karla_700Bold',
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: '400',
      textAlign: 'left',
      color: '#2B3155',
      top: -10,
    },
    real: {
      fontFamily: 'Karla_700Bold',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#2B3155',
      position: 'absolute',
      top: 10,
    },
    iconEdit:{
      position: 'absolute',
      top: 0,
      right: -50,
      width: 25,
      height: 25,
    },
    cardText: {
      fontFamily: 'Karla_700Bold',
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#2B3155',
      marginLeft: 30,
    },
    cardTextgrande:{
      fontFamily: 'Karla_700Bold',
      fontSize: 25,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#FF3D00',
    },
    imageContainer: {
      position: 'absolute',
      right: 0,
      top: -35,
    },
    cardIcon: {
      width: 70,
      left: 20,
    },
    input: {
      marginLeft: 30,
      fontSize: 35,
      fontFamily: 'Karla_700Bold',
      fontWeight: '700',
    },
  },

  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,  // adicionado borderRadius
    leftSide: {
      backgroundColor: '#2B3155',
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    rightSide: {
      backgroundColor: 'white',
      width: '65%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    textRight: {
      marginRight: 20, // Ajuste esse valor de acordo com sua necessidade
    },
    flexItem: {flex: 1},

    title: {
      fontFamily: 'Karla_700Bold',
      color: '#fff',
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: 'Karla_300Light',
      color: '#fff',
      fontSize: 15,
      fontWeight: '300',
      marginTop: 10,
    },
    underline: {
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      marginVertical: 5,
      width: '100%'
    },
    text1: {
      fontFamily: 'Karla_300Light',
      color: '#000',
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 0,
    },
    text2: {
      fontFamily: 'Karla_700Bold',
      color: '#000',
      fontSize: 16,
      fontWeight: '700',
    }
  },

  subtitulo:{
    fontFamily: 'Karla_700Bold',
    fontSize: 23,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
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
  fs18: {
    fontSize: 18,
    lineHeight: 25,
  },
  strong: {
    fontWeight: '700',
  },
  colorWhite: {
    color: '#fff',
  },
  paddingTop20: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
