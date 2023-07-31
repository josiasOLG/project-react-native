/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    top: 0,
    backgroundColor: '#fff',
  },
  upperSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  centerCotainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#333',
    color: '#333',
    fontFamily: 'Karla_700Bold',
    fontStyle: 'normal',
    fontWeight: '500',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 0,
    fontSize: 16,
    flexGrow: 1,
    marginRight: 10,
    textAlign: 'left',
  },
  imageTermo: {
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
});
