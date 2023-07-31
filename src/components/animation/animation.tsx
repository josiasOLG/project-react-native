/* eslint-disable prettier/prettier */
import { Animated } from 'react-native';

export const animatedWidth = new Animated.Value(0);
export const animatedTextOpacity = new Animated.Value(0);
export const animatedTextTranslateX = new Animated.Value(0);
export const animatedButtonRadius = new Animated.Value(0);
export const animatedBackground = new Animated.Value(0);

export const startAnimations = (screenWidth, keyboardVisible) => {
  if (keyboardVisible) {
    Animated.parallel([
      Animated.timing(animatedBackground, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedWidth, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedTextOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedTextTranslateX, {
        toValue: -150,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedButtonRadius, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  } else {
    Animated.parallel([
      Animated.timing(animatedBackground, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedWidth, {
        toValue: 20,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animatedTextOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedTextTranslateX, {
        toValue: -30,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedButtonRadius, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }
};
