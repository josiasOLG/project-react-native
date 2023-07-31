/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function StatusBarReusable({distacia}) {
  const array = [distacia, 0];
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <View style={{ paddingTop: statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={['#2B3155', '#6975BC']}
        locations={[array[0], 0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: StatusBar.currentHeight,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }}
       />
    </View>
  );
}

export default StatusBarReusable;
