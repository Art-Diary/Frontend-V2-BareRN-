import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {exhibitionKeys} from '../exhibition/exhibitionInfo';
import {
  SoloDiaryCReqType,
  SoloDiaryDReqType,
  SoloDiaryUReqType,
} from '~/features/solo-note/util/soloDiaryType';

export const soloDiaryKeys = {
  fetchSoloDiaryList: (exhId: number) => ['fetchSoloDiaryList', exhId] as const,
};

const fetchSoloDiaryList = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/exh-visits/${exhId}/diaries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchSoloDiaryList = (exhId: number) =>
  useQuery({
    queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
    queryFn: () => fetchSoloDiaryList(exhId),
    staleTime: 500000,
  });

const createSoloDiary = async (createInfo: SoloDiaryCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/exh-visits/${createInfo.exhId}/diaries`,
    createInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateSoloDiary = (exhId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createInfo: SoloDiaryCReqType) => createSoloDiary(createInfo),
    onError: err => {
      console.log(err);
      console.log('[WriteNewSoloDiary] error create NewSoloDiary');
    },
    onSuccess: async () => {
      console.log('[WriteNewSoloDiary] success create NewSoloDiary');
      queryClient.invalidateQueries({
        queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
      });
    },
  });
};

const updateSoloDiary = async (soloDiary: SoloDiaryUReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(
    `${process.env.API_URL}/exh-visits/${soloDiary.exhId}/diaries/${soloDiary.soloDiaryId}`,
    soloDiary,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateSoloDiary = (exhId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (soloDiary: SoloDiaryUReqType) => updateSoloDiary(soloDiary),
    onError: err => {
      console.log(err);
      console.log('[UpdateSoloDiary] error update UpdateSoloDiary');
    },
    onSuccess: async () => {
      console.log('[UpdateSoloDiary] success update UpdateSoloDiary');
      queryClient.invalidateQueries({
        queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
      });
    },
  });
};

export const deleteSoloDiary = async (soloDiary: SoloDiaryDReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  await axios.delete(
    `${process.env.API_URL}/exh-visits/${soloDiary.exhId}/diaries/${soloDiary.soloDiaryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useDeleteSoloDiary = (exhId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (soloDiary: SoloDiaryDReqType) => deleteSoloDiary(soloDiary),
    onError: err => {
      console.log(err);
      console.log('[DeleteSoloDiary] error delete DeleteSoloDiary');
    },
    onSuccess: async () => {
      console.log('[DeleteSoloDiary] success delete DeleteSoloDiary');
      queryClient.invalidateQueries({
        queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(exhId),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
      });
    },
  });
};
