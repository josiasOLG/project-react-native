/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
    flex: 1,
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
  titulo: {
    fontFamily: 'Karla_700Bold',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    color: '#333',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    top: 0,
    backgroundColor: '#fff',
  },
  upperSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
    marginBottom: 50,
  },
  centerCotainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2B3155',
  },
  subTitle: {
    fontFamily: 'Karla_700Bold',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#2B3155',
    marginTop: 10,
    paddingBottom: 40,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#333',
    color: '#333',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    marginRight: 10,
    marginTop: 10,
    textAlign: 'left',
  },
  imageTermo:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 20,
    height: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  link: {
    textAlign: 'center',
    marginVertical: 20,
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontFamily: 'Karla_700Bold',
    color: '#2B3155',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  flatList: {
    flex:  0,
    width: '100%',
    marginTop: 10,
  },
  containerbuttons:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#eee',
  },
  listItemIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  listItemText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B3155',
    fontFamily: 'Karla_700Bold',
    fontStyle: 'normal',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#D9D9D9',
    width: 40,
    marginRight: 10,
    borderRadius: 60,
    padding: 5,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EFC03F', // Escolha a cor da linha aqui
    marginLeft: 10, // Ajuste o espaço à esquerda da linha, se necessário
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
