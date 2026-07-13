import messaging from '@react-native-firebase/messaging';

export const notificationService = {
  async getToken() {
    try {
      return await messaging().getToken();
    } catch {
      return null;
    }
  },
};
