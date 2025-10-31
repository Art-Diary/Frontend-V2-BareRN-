import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {EvalChoiceUReqType} from '~/features/solo-note/util/soloDiaryType';
import {soloDiaryKeys} from './soloDiary';

const fetchEvaluationInfo = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/evaluation`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchEvaluationInfo = (state: boolean) =>
  useQuery({
    queryKey: ['evaluation', state],
    queryFn: () => fetchEvaluationInfo(),
    staleTime: 500000,
    enabled: state,
  });

const updateEvalChoice = async (evalChoiceInfo: EvalChoiceUReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.patch(
    `${process.env.API_URL}/exh-visits/${evalChoiceInfo.exhId}/evaluations`,
    evalChoiceInfo.evalInfoList,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useUpdateEvalChoice = (exhId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (evalChoiceInfo: EvalChoiceUReqType) =>
      updateEvalChoice(evalChoiceInfo),
    onError: err => {
      console.log(err);
      console.log('[UpdateEvalChoice] error update UpdateEvalChoice');
    },
    onSuccess: async () => {
      console.log('[UpdateEvalChoice] success update UpdateEvalChoice');
      queryClient.invalidateQueries({
        queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
      });
    },
  });
};
