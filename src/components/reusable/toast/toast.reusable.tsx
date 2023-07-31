/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

const ToastMessage = ({ type, text1, text2 }) => {
  return (
    <BaseToast
      style={[styles.toast, type === 'success' && styles.toastSuccess, type === 'info' && styles.toastInfo, type === 'error' && styles.toastError]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text, styles.text1]}
      text2Style={[styles.text, styles.text2]}
      text1={text1}
      text2={text2}
    />
  );
};

const ToastReusable = () => {
  const toastConfig = {
    success: (props) => <ToastMessage {...props} type="success" />,
    error: (props) => <ToastMessage {...props} type="error" />,
    info: (props) => <ToastMessage {...props} type="info" />,
  };

  return (
    <View style={styles.container}>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  toast: {
    height: 65,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -15,
  },
  toastSuccess: {
    backgroundColor: '#fff',
    borderLeftColor: '#388E3C',
  },
  toastInfo: {
    backgroundColor: '#fff',
    borderLeftColor: '#1976D2',
  },
  toastError: {
    backgroundColor: '#fff',
    borderLeftColor: '#D32F2F',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 0,
  },
  text: {
    fontFamily: 'Karla_400Regular',
  },
  text1: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  text2: {
    fontSize: 14,
    color: '#333',
  },
});

export default ToastReusable;
