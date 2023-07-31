/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    col3: {
      flex: 3,
    },
    col2: {
      flex: 2,
    },
    col4: {
      flex: 4,
    },
    touchableOpacity: {
      width: '100%',
      height: '100%',
    },
    topo: {
      alignSelf: 'flex-start',
      backgroundColor: '#FCD057',
      paddingHorizontal: 20,
      paddingTop: 15,
      width: '100%',
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        welcomeText: {
          fontFamily: 'Karla_700Bold',
          fontSize: 24,
          fontWeight: '800',
          textAlign: 'center',
          color: '#2B3155',
        },
        menuButton: {
          position: 'absolute',
          right: 20,
          top: 85,
          width: 40,
          height: 40,
          image: {},
        },
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        infoColumn: {
          flex: 1,
          alignItems: 'flex-start',
          infoLabel: {
            fontFamily: 'Karla_700Bold',
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'left',
            color: '#2B3155',
          },
          infoValue: {
            fontFamily: 'Karla_700Bold',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'left',
            color: '#2B3155',
          },
        },
      },
      fullWidthSection: {
        marginTop: 5,
        paddingBottom: 10,
        sectionText: {
          fontFamily: 'Karla_700Bold',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'left',
          color: '#2B3155',
        },
      },
    },
    scrollview: {
      backgroundColor: '#D5D5D5',
      carouselContainer: {
        alignItems: 'center',
        contentContainerItens: {
          marginLeft: 0,
        },
      },
    },
    containerFlatList: {
      paddingHorizontal: 10,
      paddingTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    carouselBanner: {
      contentContainerItensBanner: {
        marginLeft: 0,
      },
    },
    bannerFooter: {
      paddingHorizontal: 20,
      flex: 1,
      image: {
        width: '100%',
      },
    },
  },
  centerText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    width: '100%',
  },
  menuText: {
    fontSize: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },

  cardBody: {
    flexDirection: 'row',
    padding: 20,
  },
  col4: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
  separator: {
    borderBottomColor: '#000', // Change this color to match your design
    borderBottomWidth: 1,
    marginVertical: 8, // You can adjust this value as per your need
  },
  footerCardText: {
    flex: 1,
    padding: 10,
    width: '100%',
    textAlign: 'left',
    height: 40,
    borderTopWidth: 2,
    borderColor: '#D5D5D5',
    text: {
      fontFamily: 'Karla_700Bold',
      fontSize: 13,
      fontStyle: 'normal',
      fontWeight: '700',
      color: '#000',
    },
  },
  cardTextHoje: {
    fontFamily: 'Karla_700Bold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    color: '#2B3155',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    color: '#FF3D00',
  },
  subtitle: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    color: '#000000',
    marginBottom: 10,
  },
  imageHome: {
    overflow: 'hidden',
  },
  textoAlert: {
    fontFamily: 'Karla_700Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    color: '#fff',
    marginLeft: 15,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  real: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#2B3155',
    position: 'absolute',
    top: 30,
  },
  cardIcon: {
    width: 100,
    aspectRatio: 1,
  },
  cardHomeIcon: {
    width: 'auto',
    height: 140,
  },
  cardFooter: {
    padding: 10,
    backgroundColor: '#2B3155',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  footerText: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'left',
    color: '#fff',
  },
  item: {
    flex: 1,
    marginLeft: 8.5,
    marginRight: 8.5,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  imageTopo: {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.1,
  },
  itemBodyhome: {
    flex: 1,
    marginLeft: 8.5,
    marginRight: 8.5,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    card: {
      flex: 1,
      padding: 10,
      position: 'relative',
      image: {
        position: 'absolute',
        right: 0,
      },
    },
    imageBodyhome: {
      width: 80,
      height: 80,
      marginVertical: 16,
    },
    textBodyhome: {
      fontFamily: 'Karla_700Bold',
      fontSize: 16,
      paddingRight: 50,
      fontStyle: 'normal',
      fontWeight: '400',
      textAlign: 'left',
      color: '#000',
    },
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 16,
  },
  text: {
    fontFamily: 'Karla_700Bold',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2B3155',
    marginBottom: 20,
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
  },
  texto: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#fff',
    marginLeft: 15,
  },
  line: {
    textDecorationLine: 'underline',
  },
  disabled: {
    color: 'transparent',
    opacity: 0.6,
    backgroundColor: '#939393',
  },
  enabled: {
    color: '#fff',
    opacity: 1,
    backgroundColor: '#000', // exemplo
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
