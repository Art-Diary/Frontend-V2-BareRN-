import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {exhibitionKeys} from './exhibitionInfo';
import {DeleteLikeType} from '~/features/setting/util/likeType';

export const likeKeys = {
  fetchLikeList: () => ['fetchLikeList'] as const,
};

const fetchLikeList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/like-exhibitions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchLikeList = () =>
  useQuery({
    queryKey: likeKeys.fetchLikeList(),
    queryFn: () => fetchLikeList(),
    staleTime: 500000,
  });

const createLikeExh = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/like-exhibitions`,
    {exhId: exhId},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateLikeExh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhId: number) => createLikeExh(exhId),
    onError: err => {
      console.log(err);
      console.log('[CreateLikeExh] error create CreateLikeExh');
    },
    onSuccess: async (data, variables) => {
      console.log('[CreateLikeExh] success create CreateLikeExh');
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(variables),
      });
      queryClient.invalidateQueries({queryKey: exhibitionKeys.listRoot});
      queryClient.invalidateQueries({queryKey: likeKeys.fetchLikeList()});
    },
  });
};

const deleteLikeExh = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.delete(
    `${process.env.API_URL}/like-exhibitions/${exhId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useDeleteLikeExh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhId: number) => deleteLikeExh(exhId),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExh] error delete DeleteLikeExh');
    },
    onSuccess: async (data, variables) => {
      console.log('[DeleteLikeExh] success delete DeleteLikeExh');
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(variables),
      });
      queryClient.invalidateQueries({queryKey: exhibitionKeys.listRoot});
      queryClient.invalidateQueries({queryKey: likeKeys.fetchLikeList()});
    },
  });
};

const deleteLikeExhList = async (exhList: DeleteLikeType[]) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/like-exhibitions/unlike`,
    exhList,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useDeleteLikeExhList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhList: DeleteLikeType[]) => deleteLikeExhList(exhList),
    onError: err => {
      console.log(err);
      console.log('[DeleteLikeExhList] error delete DeleteLikeExhList');
    },
    onSuccess: async (data, variables) => {
      console.log('[DeleteLikeExhList] success delete DeleteLikeExhList');
      queryClient.invalidateQueries({queryKey: exhibitionKeys.listRoot});
      queryClient.invalidateQueries({queryKey: likeKeys.fetchLikeList()});
    },
  });
};
