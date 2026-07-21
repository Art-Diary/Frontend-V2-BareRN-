import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {showToast} from '~/components/util/toastConfig';
import {api} from '~/api';

export const soloVisitExhKeys = {
  fetchSoloVisitedExhList: () => ['fetchSoloVisitedExhList'] as const,
};

const createVisitExh = async (exhId: number, visitDate: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.post(
    `/users/me/visits`,
    {exhId, visitDate},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateVisitExh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({exhId, visitDate}: {exhId: number; visitDate: string}) =>
      createVisitExh(exhId, visitDate),

    onError: error => {
      showToast('관람 가능한 날짜가 아닙니다');
      console.log(error);
      console.log('[CreateVisitExh] error create CreateVisitExh');
    },

    onSuccess: (_, variables) => {
      console.log('[CreateVisitExh] success create CreateVisitExh');

      queryClient.invalidateQueries({
        queryKey: ['exhibitionDetail', variables.exhId],
      });

      queryClient.invalidateQueries({
        queryKey: ['fetchSoloVisitedExhList'],
      });
    },
  });
};

const fetchSoloVisitedExhList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/users/me/visits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchSoloVisitedExhList = () =>
  useQuery({
    queryKey: soloVisitExhKeys.fetchSoloVisitedExhList(),
    queryFn: fetchSoloVisitedExhList,
    staleTime: 500000,
  });
