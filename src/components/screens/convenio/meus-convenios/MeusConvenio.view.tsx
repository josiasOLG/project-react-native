/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import { styles } from './MeusConvenio.style';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import conveniosService from '../../../../services/convenios.service';
import { RootState } from '../../../../services/interfaces/user-agreements.interface';
import Animated, { EasingNode } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { setItems } from '../../../../redux/actions/convenios-itens.actions';
import { setLoading } from '../../../../redux/actions/loading.actions';

const MeusConvenioView: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [itens, setItens] = useState<Array<any>>([]);
  const dispatch = useDispatch();

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
          const response: any = await conveniosService.get('user-agreements');
          setItens(
            response.data.map((item: any) => ({
              ...item,
              animation: new Animated.Value(1), // Adicionando a propriedade de animação a cada item
            }))
          );
        } catch (error) {
          dispatch(setLoading(false));
          console.error(error);
        }
      };

      fetchData();
    }, [])
  );

  const handleAddItem = () => {
    navigation.navigate('ConvenioView');
  };

  const gerarformulario = async (item: any) => {
    const data = {};
    conveniosService
      .post(
        `/user-agreement-parameters-values/${item?.id}/find-or-create`,
        data
      )
      .then(async () => {
        delete item.animation;
        dispatch(setItems(item));
        navigation.navigate('SalvarConvenioView');
      })
      .catch((err) => {
        console.log('err>>',err);
      });
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response: any = await conveniosService.delete(
        '/user-agreements',
        id
      );
      if (response.message !== 'deleted') {
        return;
      }
      Animated.timing(itens.find((item: any) => item.id === id)?.animation, {
        toValue: 0,
        duration: 500,
        easing: EasingNode.bezier(0.42, 0, 0.58, 1),
      }).start(() => {
        setItens((oldItems) => oldItems.filter((item: any) => item.id !== id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const animatedStyles = {
      transform: [
        {
          translateX: item.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-screenWidth, 0], // Mover o item do seu ponto de partida para a esquerda
          }),
        },
      ],
      opacity: item.animation, // Desaparecer o item
    };
    return (
      <TouchableOpacity onPress={() => gerarformulario(item)}>
        <Animated.View style={[styles.listItem, animatedStyles]}>
          <Text style={styles.listItem.texto}>{item.agreement.name}</Text>
          <View style={styles.icons}>
            <Image
              source={require('../../../../assets/images/seta-direita-preta.png')}
              style={[styles.iconSeta]}
            />
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Image
                source={require('../../../../assets/images/icon-lixeira.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/images/back-nome.png')}
        style={styles.bottomSection}
        resizeMode="cover"
      >
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
          <View style={[styles.col11, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Meus convênios</Text>
          </View>
        </View>

        {itens.length > 0 ? (
          <FlatList
            data={itens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListFooterComponent={ListFooterComponent}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <View style={styles.containerError}>
            <Text style={styles.containerError.emptyMessage}>
              Você ainda não adicionou nenhum convênio
            </Text>
            <View style={styles.containerError.footer}>
              <TouchableOpacity style={styles.button} onPress={handleAddItem}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </Fragment>
  );
};

export default MeusConvenioView;
