/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import { styles } from './keyboard.style';
import { useNavigation } from '@react-navigation/native';

const KeyboardReusable = ({pagina}) => {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleContinue = () => {
    // Implemente a função que será chamada quando o botão Continuar for pressionado
    navigation.navigate(pagina);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.content}>
          {keyboardVisible && (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Avançar</Text>
              <Image
                source={require('../../../assets/images/seta-direita.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
    </KeyboardAvoidingView>
  );
};

export default KeyboardReusable;
