import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export const calendarKeys = {
  fetchCalendar: (
    kind: string,
    gatheringId: number | null,
    year: number,
    month: number,
  ) => ['fetchCalendar', kind, gatheringId, year, month] as const,
};

const fetchCalendar = async (
  kind: string,
  gatheringId: number | null,
  year: number,
  month: number,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/calendars`, {
    params: {kind, gatheringId, year, month},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchCalendar = (
  kind: string,
  gatheringId: number | null,
  year: number,
  month: number,
) =>
  useQuery({
    queryKey: calendarKeys.fetchCalendar(kind, gatheringId, year, month),
    queryFn: () => fetchCalendar(kind, gatheringId, year, month),
    staleTime: 500000,
  });
