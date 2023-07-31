import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ShimmerProps {
  width?: number;
  height?: number;
}

const Shimmer: React.FC<ShimmerProps> = ({ width, height }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const left = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <Animated.View
      style={{
        width,
        height,
        backgroundColor: '#E0E0E0',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          width: width,
          height: height,
          position: 'absolute',
          transform: [{ translateX: left }],
        }}
      >
        <LinearGradient
          colors={['#E0E0E0', '#F8F8F8', '#E0E0E0']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Shimmer;
