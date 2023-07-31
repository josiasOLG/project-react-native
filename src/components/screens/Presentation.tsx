/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Pagination from '../shared/Pagination';

const { width } = Dimensions.get('window');
const slidesData = [
  {
    key: 'slide1',
    image: require('../../assets/images/slide1.png'),
    title: 'Bem-vindo(a) ao CONSIGAKI',
    text: 'Se a instituição que você trabalha é associada, você pode consultar e solicitar todos os seus benefícios consignados de um jeito simples e inovador.',
  },
  {
    key: 'slide2',
    image: require('../../assets/gif/gif1.gif'),
    title: 'O Seu salário pode valer muito mais.',
    text: 'Precisou de crédito para realizar um sonho? A qualquer hora e em qualquer lugar, você pode simular um empréstimo com melhores condições, quando precisar!',
  },
  {
    key: 'slide3',
    image: require('../../assets/gif/gif2.gif'),
    title: 'Tudo que você precisa em um só lugar!',
    text: 'Tenha todas as informações detalhadas dos seus descontos em folha e esteja no controle das suas finanças pessoais, de acordo com suas necessidades.',
  },
];

function Slide({item, navigateToNextScreen}) {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      {item.key === 'slide3' && (
        <TouchableOpacity style={styles.button} onPress={navigateToNextScreen}>
          <Text style={styles.buttonText}> Prosseguir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function Presentation({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigateToNextScreen = () => {
    navigation.navigate('NextScreen');
  };

  const handleSlideChange = ({nativeEvent}) => {
    const newIndex = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slidesData}
        renderItem={({item}) => (
          <Slide item={item} navigateToNextScreen={navigateToNextScreen} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSlideChange}
        style={{ flex: 1 }}
      />
      <Pagination currentIndex={currentIndex} itemCount={slidesData.length} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width, // Use a largura da tela aqui
    height: '100%',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  title:{
    fontFamily: 'Karla_700Bold',
    fontSize: 24,
    fontWeight: 700,
    color: '#2B3155',
    width: '90%',
    textAlign: 'justify',
  },
  text: {
    fontFamily: 'Karla_700Bold',
    fontSize: 17,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: 700,
    width: '90%',
  },
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
  },
});
