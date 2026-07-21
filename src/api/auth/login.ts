import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@tanstack/react-query';
import {LoginUserType} from '~/components/util/loginType';
import {api} from '~/api';

const loginUser = async (loginInfo: LoginUserType) => {
  const res = await api.post(`/users`, {
    ...loginInfo,
  });
  return res.data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (loginInfo: LoginUserType) => loginUser(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[Login] error Login');
    },
    onSuccess: async data => {
      const resData = data.data;

      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem('refreshToken', resData.refreshToken);
        console.log('[Login] success Login');
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};

const updateFcmToken = async (fcmtoken: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.patch(
    `/users/alarm-token`,
    {alarmToken: fcmtoken},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateFcmToken = () => {
  return useMutation({
    mutationFn: (fcmtoken: string) => updateFcmToken(fcmtoken),
    onError: err => {
      console.log(err);
      console.log('[UpdateFcmToken] error UpdateFcmToken');
    },
    onSuccess: async () => {
      console.log('[UpdateFcmToken] success UpdateFcmToken');
    },
  });
};
