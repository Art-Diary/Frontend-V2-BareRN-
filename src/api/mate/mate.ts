import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const mateKeys = {
  fetchMateList: () => ['fetchMateList'] as const,
  fetchMateSearch: (nickname: string | null) =>
    ['fetchMateSearch', nickname] as const,
  fetchMateExhList: (mateId: number) => ['fetchMateExhList', mateId] as const,
  fetchMateDiaryList: (mateId: number, exhId: number) =>
    ['fetchMateDiaryList', mateId, exhId] as const,
};

const fetchMateList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/mates`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

export const useFetchMateList = () =>
  useQuery({
    queryKey: mateKeys.fetchMateList(),
    queryFn: () => fetchMateList(),
    staleTime: 500000,
  });

const fetchMateSearch = async (nickname: string | null) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/mates/search`, {
    params: {nickname},
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

export const useFetchMateSearch = (nickname: string | null) =>
  useQuery({
    queryKey: mateKeys.fetchMateSearch(nickname),
    queryFn: () => fetchMateSearch(nickname),
    staleTime: 500000,
  });

const fetchMateExhList = async (mateId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/mates/${mateId}/exhibitions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchMateExhList = (mateId: number) =>
  useQuery({
    queryKey: mateKeys.fetchMateExhList(mateId),
    queryFn: () => fetchMateExhList(mateId),
    staleTime: 500000,
  });

const fetchMateDiaryList = async (mateId: number, exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/mates/${mateId}/exhibitions/${exhId}/diaries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchMateDiaryList = (mateId: number, exhId: number) =>
  useQuery({
    queryKey: mateKeys.fetchMateDiaryList(mateId, exhId),
    queryFn: () => fetchMateDiaryList(mateId, exhId),
    staleTime: 500000,
  });

const createMate = async (userId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/mates`,
    {userId},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateMate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => createMate(userId),
    onError: err => {
      console.log(err);
      console.log('[CreateMate] error create CreateMate');
    },
    onSuccess: async () => {
      console.log('[CreateMate] success create CreateMate');
      queryClient.invalidateQueries({queryKey: mateKeys.fetchMateList()});
    },
  });
};
