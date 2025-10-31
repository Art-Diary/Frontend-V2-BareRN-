import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {NotiRequestUType} from '~/features/setting/util/notiType';
import {useUserActions} from '~/zustand/userInfo';

const fetchVerifyNickname = async (nickname: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/users/verify`, {
    params: {nickname},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchVerifyNickname = (nickname: string, state: boolean) =>
  useQuery({
    queryKey: ['fetchVerifyNickname', nickname],
    queryFn: () => fetchVerifyNickname(nickname),
    staleTime: 500000,
    enabled: state,
    retry: 0,
  });

const updateUserInfo = async (info: FormData) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(`${process.env.API_URL}/users`, info, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const useUpdateUserInfo = () => {
  const {updateUserInfo: storeUserInfo} = useUserActions();

  return useMutation({
    mutationFn: (info: FormData) => updateUserInfo(info),
    onError: err => {
      console.log(err);
      console.log('[UpdateUserInfo] error update UpdateUserInfo');
    },
    onSuccess: async data => {
      console.log('[UpdateUserInfo] success update UpdateUserInfo');
      storeUserInfo({...data});
    },
  });
};

const updateNotiSetting = async (info: NotiRequestUType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(
    `${process.env.API_URL}/users/notifications/${info.notiId}`,
    info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateNotiSetting = () => {
  return useMutation({
    mutationFn: (info: NotiRequestUType) => updateNotiSetting(info),
    onError: err => {
      console.log(err);
      console.log('[UpdateNotiSetting] error update UpdateNotiSetting');
    },
    onSuccess: async data => {
      console.log('[UpdateNotiSetting] success update UpdateNotiSetting');
    },
  });
};
