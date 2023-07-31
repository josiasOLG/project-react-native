/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';

const useResetNavigation = (): ((routeName: string) => void) => {
  const navigation = useNavigation();

  const resetNavigation = (routeName: string): void => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  };

  return resetNavigation;
};

export default useResetNavigation;
