/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './TextoNegociar.styles';
import { useNavigation } from '@react-navigation/native';

const TextoNegociarView = () => {
  const navigation = useNavigation();
  useEffect(() => {}, []);

  const handleBackPress = () => {
    navigation.navigate('DocumentoView');
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col2}>
            <TouchableOpacity onPress={handleBackPress}/>
          </View>
          <View style={[styles.col8, styles.centerContent]}>
            <Text style={styles.titulo}>Vamos negociar. . .</Text>
          </View>
          <View style={[styles.col2, styles.rigthContent]}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../../assets/images/icon-close.png')}
                resizeMode="contain"
                style={styles.topo.imageClose}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.centerVerital}>
        <Text style={styles.centerVerital.texto}>
          Lorem ipsum dolor sit amet, consectetur adipisicing.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonContainer.button}
          onPress={handleBackPress}
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

export default TextoNegociarView;
