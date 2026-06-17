import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUpdateFcmToken} from '~/api/auth/login';
import {notificationService} from '../util/notificationService';

export const useBootstrap = () => {
  // const setUser = useUserStore(
  //   state => state.setUser,
  // );
  const {mutate: updateFcmToken} = useUpdateFcmToken();

  const initialize = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      return false;
    }

    try {
      // const me = await getMe();

      // setUser(me);

      const fcmToken = await notificationService.getToken();

      if (fcmToken) {
        updateFcmToken(fcmToken);
      }

      return true;
    } catch {
      return false;
    }
  };

  return {
    initialize,
  };
};
