/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageLogo:{
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  upperSection: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 0,
  },
  animatedButton:{
    width: '100%',
  },
  middleSectionKeyboard:{
    flex: 0,
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'left',
    color: '#fff',
    fontFamily: 'Karla_700Bold',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    top: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  continueButtonContainer:{
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 18,
    borderColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonKeyboard:{
    backgroundColor: '#2B3155',
  },
  buttonText: {
    color: '#2B3155',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
  },
  buttonTextOutline: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#fff',
    color: '#fff',
    borderBottomWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    flexGrow: 1,
    marginRight: 10,
  },
  infoIcon: {
    width: 24,
    height: 24,
  },
  smallText: {
    paddingTop: 10,
    fontSize: 13,
    color: '#fff',
    paddingHorizontal: 20,
    fontFamily: 'Karla_700Bold',
    fontWeight: '400',
  },
  continueButtonExpanded: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FDC500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
