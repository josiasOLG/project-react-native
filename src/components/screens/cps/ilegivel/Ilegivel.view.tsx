/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './Ilegivel.styles';
import { useNavigation } from '@react-navigation/native';

const IlegivelView = () => {
  const navigation = useNavigation();
  useEffect(() => {}, []);

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  const tirarFotos = () => {
    navigation.navigate('WelcomeNegocioView');
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col10, styles.centerContent]}>
            <Text style={styles.titulo}>Pendências</Text>
          </View>
          <View style={[styles.col1]} />
        </View>
      </View>
      <View style={styles.centerVerital}>
        <Image
          style={styles.centerVerital.image}
          source={require('../../../../assets/images/lista-de-espera.png')}
          resizeMode="contain"
        />
        <Text style={styles.centerVerital.texto}>
          Necessário que tire novas fotos, para analise
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonContainer.button}
          onPress={tirarFotos}
        >
          <Text style={styles.buttonContainer.buttonText}>Continuar</Text>
          <Image
            source={require('../../../../assets/images/seta-direita.png')}
            style={styles.buttonContainer.icon}
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default IlegivelView;
