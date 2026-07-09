import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {DiaryAnswer} from '~/types/personal';

const createSoloDiary = async (visitId: number, answers: DiaryAnswer[]) => {
  const token = await AsyncStorage.getItem('accessToken');
  const body = answers.map(answer => ({
    ...answer,
    isPublic: true,
  }));
  const res = await axios.post(
    `${process.env.API_URL}/users/me/visits/${visitId}/diaries`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateSoloDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      visitId,
      answers,
    }: {
      visitId: number;
      answers: DiaryAnswer[];
    }) => createSoloDiary(visitId, answers),

    onError: err => {
      console.log(err);
      console.log('[WriteNewSoloDiary] error create NewSoloDiary');
    },

    onSuccess: async (_, variables) => {
      console.log('[WriteNewSoloDiary] success create NewSoloDiary');
      queryClient.invalidateQueries({
        queryKey: ['fetchPersonalVisitedList'],
      });
    },
  });
};
