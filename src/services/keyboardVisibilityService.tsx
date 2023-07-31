/* eslint-disable prettier/prettier */

import { useState, useEffect } from 'react';
import { Keyboard, Dimensions } from 'react-native';

export default function useKeyboardVisibility() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

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

  return { keyboardVisible, screenWidth };
}
