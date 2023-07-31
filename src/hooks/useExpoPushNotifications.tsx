/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import NotificationService from '../services/notifications/NotificationService';


export function useNotificationListeners() {
  useEffect(() => {
    NotificationService.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    NotificationService.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      NotificationService.removeAllNotificationListeners();
    };
  }, []);
}
