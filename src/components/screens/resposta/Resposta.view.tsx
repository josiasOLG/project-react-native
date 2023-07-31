/* eslint-disable prettier/prettier */
import React from 'react';
import { styles } from './Resposta.style';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import StatusBarReusable from '../../reusable/status-bar/StatusBar.reusable';

type RespostaViewRouteProp = RouteProp<any, 'RespostaView'>;

interface RespostaViewProps {
  route: RespostaViewRouteProp;
}

interface RespostaViewProps {
  tela?: string;
  item?: any;
}

const RespostaView: React.FC<RespostaViewProps> = ({ route }) => {
  const { tela, item } = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: tela }],
    });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/back-nome.png')}
      style={styles.bottomSection}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      <StatusBarReusable distacia={0} />
      <View style={styles.topo}>
        <TouchableOpacity onPress={handlePress}>
          <Image
              source={require('../../../assets/images/seta-direita-preta.png')}
              resizeMode="contain"
              style={styles.topo.image}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.upperSection}>
        <Text style={styles.title}>
          {item?.subtitle}
        </Text>
        <Text style={styles.subTitle}>
          {item?.texto}
        </Text>
      </View>
    </ImageBackground>
  );
}

export default RespostaView;
