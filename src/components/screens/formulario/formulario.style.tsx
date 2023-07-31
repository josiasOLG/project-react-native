/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2B3155',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 0,
  },
  label: {},
  input: {
    height: 60,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Karla_400Regular',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2B3155',
    borderWidth: 1,
    borderColor: '#2B3155',
    buttonText: {
      fontFamily: 'Karla_700Bold',
      fontSize: 20,
      fontWeight: '800',
      textAlign: 'center',
      color: '#fff',
    }
  },
});