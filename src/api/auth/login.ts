import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import axios from 'axios';
import {LoginUserType} from '~/features/login/util/loginType';

// TODO 삭제
const loginUserTest = async (userId: number) => {
  const res = await axios.post(`${process.env.API_URL}/users/test`, {
    userId,
  });
  return res.data;
};

// TODO 삭제
export const useLoginTest = () => {
  return useMutation({
    mutationFn: (userId: number) => loginUserTest(userId),
    onError: err => {
      console.log(err);
      console.log('[Tester Login] error Login');
    },
    onSuccess: async (res: any) => {
      console.log(res);
      try {
        await AsyncStorage.setItem('accessToken', res.accessToken);
        await AsyncStorage.setItem('initInfo', JSON.stringify(res.initInfo));
        console.log('[Tester Login] success Login');
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return res;
    },
  });
};

const loginUser = async (loginInfo: LoginUserType) => {
  const res = await axios.post(`${process.env.API_URL}/users`, {
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
      const resData = data;
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
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
  const res = await axios.patch(
    `${process.env.API_URL}/users/alarm-token`,
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

const uniteSocialLogin = async (loginInfo: LoginUserType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/users/unite`,
    {...loginInfo},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUniteSocialLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: LoginUserType) => uniteSocialLogin(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[UniteSocialLogin] error UniteSocialLogin');
    },
    onSuccess: async data => {
      const resData = data;
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[UniteSocialLogin] success UniteSocialLogin');
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};

const separateSocialLogin = async (loginInfo: LoginUserType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/users/separate`,
    {...loginInfo},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useSeparateSocialLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: LoginUserType) => separateSocialLogin(loginInfo),
    onError: err => {
      console.log(err);
      console.log('[SeparateSocialLogin] error SeparateSocialLogin');
    },
    onSuccess: async data => {
      const resData = data;
      try {
        await AsyncStorage.setItem('accessToken', resData.accessToken);
        await AsyncStorage.setItem(
          'initInfo',
          JSON.stringify(resData.initInfo),
        );
        console.log('[SeparateSocialLogin] success SeparateSocialLogin');
      } catch (error) {
        console.log('[AsyncStorage] Error storing userId', error);
      }
      return resData;
    },
  });
};
