import React from 'react';
import { View } from 'react-native';
import Shimmer from './Shimmer';

interface CardSkeletonProps {
  width?: number;
  height?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ width, height }) => (
  <View>
    <Shimmer width={width} height={height} />
  </View>
);
