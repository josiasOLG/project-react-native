/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  upperSection: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 180,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 35,
    fontWeight: '800',
    textAlign: 'left',
    color: '#2B3155',
    marginVertical: 20,
    lineHeight: 48,
    letterSpacing: 2,
  },
  subTitle: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    color: '#2B3155',
    width: '60%',
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
    width: '100%',
  },
  bottomSection: {
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
    paddingBottom: 100,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B3155',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 20,
    position: 'relative',
  },
  icon: {
    width: 11.4,
    height: 20,
    marginRight: 20,
  },
  contentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTermo:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
