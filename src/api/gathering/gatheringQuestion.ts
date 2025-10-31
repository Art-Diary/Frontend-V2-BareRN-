import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  GatheringQuestionCReqType,
  GatheringQuestionUReqType,
} from '~/features/together/util/gatheringQuestionType';

export const gatheringQuestionKeys = {
  fetchGatheringQuestionList: (gatheringId: number, exhId: number) =>
    ['fetchGatheringQuestionList', gatheringId, exhId] as const,
};

const fetchGatheringQuestionList = async (
  gatheringId: number,
  exhId: number,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}/exh-visits/${exhId}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchGatheringQuestionList = (
  gatheringId: number,
  exhId: number,
) =>
  useQuery({
    queryKey: gatheringQuestionKeys.fetchGatheringQuestionList(
      gatheringId,
      exhId,
    ),
    queryFn: () => fetchGatheringQuestionList(gatheringId, exhId),
    staleTime: 500000,
  });

const createGatheringQuestion = async (info: GatheringQuestionCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits/${info.exhId}/questions`,
    info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGatheringQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringQuestionCReqType) =>
      createGatheringQuestion(info),
    onError: err => {
      console.log(err);
      console.log(
        '[CreateGatheringQuestion] error create CreateGatheringQuestion',
      );
    },
    onSuccess: async (data, variables) => {
      console.log(
        '[CreateGatheringQuestion] success create CreateGatheringQuestion',
      );
      //   invalidate
      queryClient.invalidateQueries({
        queryKey: gatheringQuestionKeys.fetchGatheringQuestionList(
          variables.gatheringId,
          variables.exhId,
        ),
      });
    },
  });
};

const updateGatheringQuestion = async (info: GatheringQuestionUReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits/${info.exhId}/questions/${info.questionId}`,
    info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateGatheringQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringQuestionUReqType) =>
      updateGatheringQuestion(info),
    onError: err => {
      console.log(err);
      console.log(
        '[UpdateGatheringQuestion] error update UpdateGatheringQuestion',
      );
    },
    onSuccess: async (data, variables) => {
      console.log(
        '[UpdateGatheringQuestion] success update UpdateGatheringQuestion',
      );
      //   invalidate
      queryClient.invalidateQueries({
        queryKey: gatheringQuestionKeys.fetchGatheringQuestionList(
          variables.gatheringId,
          variables.exhId,
        ),
      });
    },
  });
};
