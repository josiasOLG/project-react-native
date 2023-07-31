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
    width: '100%',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2B3155',
    paddingBottom: 40,
  },
  subTitle: {
    fontFamily: 'Karla_700Bold',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#2B3155',
    paddingBottom: 40,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#333',
    color: '#333',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 0,
    fontSize: 16,
    flexGrow: 1,
    marginRight: 10,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 20,
    height: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioOuter: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#2B3155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#2B3155',
  },
  radioInner: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#2B3155',
  },
  radioLabel: {
    fontFamily: 'Karla_700Bold',
    marginLeft: 8,
    fontSize: 16,
    color: '#2B3155',
    fontWeight: '700',
  },
  buttonContainer: {
    paddingHorizontal: 0,
    marginTop: 'auto',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 0,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B3155',
    paddingVertical: 15,
    borderRadius: 0,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '400',
    marginLeft: 20,
    position: 'relative',
  },
  contentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 11.4,
    height: 20,
    marginRight: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollView: {
    flexGrow: 1,
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
});
