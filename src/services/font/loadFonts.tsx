import * as Font from 'expo-font';
import { Karla_400Regular, Karla_700Bold, Karla_300Light } from '@expo-google-fonts/karla';

export async function loadFonts() {
  await Font.loadAsync({
    'Karla_400Regular': Karla_400Regular,
    'Karla_700Bold': Karla_700Bold,
    'Karla_300Light': Karla_300Light,
  });
}