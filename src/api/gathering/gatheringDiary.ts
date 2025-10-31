import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  GatheringDiaryCReqType,
  GatheringDiaryDReqType,
  GatheringDiaryUReqType,
} from '~/features/together/util/gatheringDiaryType';

export const gatheringDiaryKeys = {
  fetchGatheringDiaryList: (
    gatheringId: number,
    exhId: number,
    questionId: number,
  ) => ['fetchGatheringDiaryList', gatheringId, exhId, questionId] as const,
};

const fetchGatheringDiaryList = async (
  gatheringId: number,
  exhId: number,
  questionId: number,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}/exh-visits/${exhId}/questions/${questionId}/diaries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchGatheringDiaryList = (
  gatheringId: number,
  exhId: number,
  questionId: number,
  active: boolean,
) =>
  useQuery({
    queryKey: gatheringDiaryKeys.fetchGatheringDiaryList(
      gatheringId,
      exhId,
      questionId,
    ),
    queryFn: () => fetchGatheringDiaryList(gatheringId, exhId, questionId),
    staleTime: 500000,
    enabled: active,
  });

const createGatheringDiary = async (info: GatheringDiaryCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  console.log(info);
  const res = await axios.post(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits/${info.exhId}/questions/${info.questionId}/diaries`,
    info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGatheringDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringDiaryCReqType) => createGatheringDiary(info),
    onError: err => {
      console.log(err);
      console.log('[CreateGatheringDiary] error create CreateGatheringDiary');
    },
    onSuccess: async (data, variables) => {
      console.log('[CreateGatheringDiary] success create CreateGatheringDiary');
      queryClient.invalidateQueries({
        queryKey: gatheringDiaryKeys.fetchGatheringDiaryList(
          variables.gatheringId,
          variables.exhId,
          variables.questionId,
        ),
      });
    },
  });
};

const updateGatheringDiary = async (info: GatheringDiaryUReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits/${info.exhId}/questions/${info.questionId}/diaries/${info.gatheringDiaryId}`,
    info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateGatheringDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringDiaryUReqType) => updateGatheringDiary(info),
    onError: err => {
      console.log(err);
      console.log('[UpdateGatheringDiary] error update UpdateGatheringDiary');
    },
    onSuccess: async (data, variables) => {
      console.log('[UpdateGatheringDiary] success update UpdateGatheringDiary');
      queryClient.invalidateQueries({
        queryKey: gatheringDiaryKeys.fetchGatheringDiaryList(
          variables.gatheringId,
          variables.exhId,
          variables.questionId,
        ),
      });
    },
  });
};

export const deleteGatheringDiary = async (info: GatheringDiaryDReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  await axios.delete(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits/${info.exhId}/questions/${info.questionId}/diaries/${info.gatheringDiaryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useDeleteGatheringDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringDiaryDReqType) => deleteGatheringDiary(info),
    onError: err => {
      console.log(err);
      console.log('[DeleteGatheringDiary] error delete DeleteGatheringDiary');
    },
    onSuccess: async (data, variables) => {
      console.log('[DeleteGatheringDiary] success delete DeleteGatheringDiary');
      queryClient.invalidateQueries({
        queryKey: gatheringDiaryKeys.fetchGatheringDiaryList(
          variables.gatheringId,
          variables.exhId,
          variables.questionId,
        ),
      });
    },
  });
};
