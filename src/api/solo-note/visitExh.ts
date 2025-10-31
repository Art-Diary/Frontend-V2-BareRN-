import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {calendarKeys} from '../calendar/calendar';
import {exhibitionKeys} from '../exhibition/exhibitionInfo';
import {VisitExhCReqType} from '~/features/solo-note/util/soloDiaryType';

export const myVisitExhKeys = {
  fetchMyExhList: () => ['fetchMyExhList'] as const,
};

const fetchMyVisitExhList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/exh-visits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchMyVisitExhList = () =>
  useQuery({
    queryKey: myVisitExhKeys.fetchMyExhList(),
    queryFn: fetchMyVisitExhList,
    staleTime: 500000,
  });

const createVisitExh = async (createInfo: VisitExhCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/exh-visits/${createInfo.exhId}/date`,
    createInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateVisitExh = (visitDate: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createInfo: VisitExhCReqType) => createVisitExh(createInfo),
    onError: err => {
      console.log(err);
      console.log('[CreateVisitExh] error create CreateVisitExh');
    },
    onSuccess: async (data, variables) => {
      console.log('[CreateVisitExh] success create CreateVisitExh');
      queryClient.invalidateQueries({
        queryKey: calendarKeys.fetchCalendar(
          'alone',
          null,
          Number(visitDate.split('.')[0]),
          Number(visitDate.split('.')[1]),
        ),
      });
      queryClient.invalidateQueries({
        queryKey: myVisitExhKeys.fetchMyExhList(),
      });
      queryClient.invalidateQueries({
        queryKey: exhibitionKeys.exhibitionDetail(variables.exhId),
      });
    },
  });
};
