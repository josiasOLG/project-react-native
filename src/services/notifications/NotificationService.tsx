/* eslint-disable prettier/prettier */
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import pushNotificationService from '../push-notification.service';
import * as Device from 'expo-device';

class NotificationService {
  expoPushToken: string | undefined;
  notificationReceivedListener: Notifications.Subscription | null = null;
  notificationResponseReceivedListener: Notifications.Subscription | null =
    null;

  constructor() {
    // this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      token = (await Notifications.getExpoPushTokenAsync()).data;
      if (token) {
        this.expoPushToken = token;
        await this.sendPushTokenToServer(token);
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  addNotificationReceivedListener = (
    handler: (notification: Notifications.Notification) => void
  ) => {
    this.notificationReceivedListener =
      Notifications.addNotificationReceivedListener(handler);
  };

  addNotificationResponseReceivedListener = (
    handler: (response: Notifications.NotificationResponse) => void
  ) => {
    this.notificationResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener(handler);
  };

  removeAllNotificationListeners = () => {
    if (this.notificationReceivedListener) {
      this.notificationReceivedListener.remove();
      this.notificationReceivedListener = null;
    }
    if (this.notificationResponseReceivedListener) {
      this.notificationResponseReceivedListener.remove();
      this.notificationResponseReceivedListener = null;
    }
  };

  sendPushTokenToServer = async (token: string) => {
    try {
      const param = {
        title: 'Novidades no App!',
        message: 'Agora, você pode solicitar um empréstimo pessoal direto no nosso aplicativo. Experimente hoje mesmo!',
        token: token,
      };
      await pushNotificationService.post('/notifications', param);
    } catch (error) {
      console.error('Failed to send push token to server:', error);
    }
  };
}

export default new NotificationService();
