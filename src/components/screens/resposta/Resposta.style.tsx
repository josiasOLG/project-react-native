/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  upperSection: {
    flex: 5,
    paddingHorizontal: 20,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontFamily: 'Karla_700Bold',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'left',
    color: '#2B3155',
    marginBottom: 20,
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
    backgroundColor: '#fff',
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
    paddingVertical: 20,
    borderRadius: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'Karla_700Bold',
    fontWeight: '700',
    marginLeft: 20,
    position: 'relative',
  },
  topo: {
    flex: 1,
    image: {
      width: 30,
      height: 30,
      marginLeft: 20,
      marginVertical: 20,
      transform: [{ rotate: '180deg' }],
    }
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
});
