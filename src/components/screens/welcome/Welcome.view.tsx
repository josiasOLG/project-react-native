/* eslint-disable prettier/prettier */
import React from 'react';
import { styles } from './Welcome.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeView() {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate('CarregandoView', {nextScreen: 'NomeView'});
    navigation.navigate('NomeView');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/back-welcome.png')}
      style={styles.bottomSection}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />

      <View style={styles.upperSection}>
        <Text style={styles.title}>
          Vem{'\n'}
          ser Consigaki
        </Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Vamos lá</Text>
          <Image
            source={require('../../../assets/images/seta-direita.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
