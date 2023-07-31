/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  bottomSection: {
    flex: 1,
    width: '100%',
    top: 0,
    backgroundColor: '#fff',
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
  card: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  titulo: {
    fontFamily: 'Karla_700Bold',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#333',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2B3155',
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
    containerTexto: {
      marginVertical: 0,
    },
    inputContainer: {

    },
    linha: {
      width: '100%',
      height: 1,
      backgroundColor: '#D6D1D1',
      marginVertical: 20,
    },
    label: {
      fontFamily: 'Karla_700Bold',
      fontSize: 18,
      marginTop: 10,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      color: '#333',
    },
    texto: {
      fontFamily: 'Karla_700Bold',
      fontSize: 30,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'center',
      color: '#333',
      marginTop: 20,
    },
    texto2: {
      fontFamily: 'Karla_300Light',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '300',
      textAlign: 'center',
      color: '#333',
      marginTop: 10,
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#D9D9D9',
      marginTop: 0,
      borderRadius: 5,
      fontSize: 18,
      fontFamily: 'Karla_700Bold',
      fontWeight: '700',
    },
    InputMask: {
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    error:{
      fontFamily: 'Karla_700Bold',
      fontWeight: '700',
      color: 'red',
      fontSize: 16,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#2B3155',
      paddingVertical: 20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#2B3155',
    },
    buttonText: {
      fontFamily: 'Karla_700Bold',
      fontSize: 20,
      fontWeight: '800',
      textAlign: 'center',
      color: '#fff',
    },
  },
  alert: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    marginHorizontal: 20,
  },
  containerTexto: {
    paddingLeft: 20,
  },
  alertText: {
    fontFamily: 'Karla_300Light',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '300',
    textAlign: 'left',
    color: '#333',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      width: 40,
      height: 40,
    },
  },

  imageContainer: {
    borderWidth: 8,
    borderColor: '#2B3155',
    borderRadius: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: -15,
    borderColor: '#FCD057',
    borderWidth: 1,
    padding: 8,
    borderRadius: 60,
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
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    texto: {
      fontFamily: 'Karla_300Light',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '300',
      textAlign: 'left',
      color: '#000000',
    }
  },
  containerItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    image: {
      width: 24,
    },
    label: {
      flex: 1,
      fontFamily: 'Karla_700Bold',
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: '700',
      textAlign: 'left',
      marginLeft: 10,
      color: '#2B3155',
    }
  },

  toggle:{
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  row: {
    flexDirection: 'row',
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  col4: {
    flex: 4,
  },
  col5: {
    flex: 5,
    margin: 0,
    padding: 0,
  },
  col6: {
    flex: 6,
    margin: 0,
    padding: 0,
  },
  col7: {
    flex: 7,
    margin: 0,
    padding: 0,
  },
  col8: {
    flex: 8,
  },
  col9: {
    flex: 9,
  },
  col10: {
    flex: 10,
  },
  col11: {
    flex: 11,
  },
  col12: {
    flex: 12,
  },
});