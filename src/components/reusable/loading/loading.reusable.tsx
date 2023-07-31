/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingModal = () => {
  const loading = useSelector((state) => state.loading.isLoading);
  return (
    <Modal animationType="slide" transparent={true} visible={loading}>
      <LinearGradient
        colors={['rgba(252, 208, 87, 0.8)', 'rgba(252, 208, 87, 0.8)']}
        style={styles.modalBackground}
      >
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size={70} color="#fff" />
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#FCD057',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoadingModal;
