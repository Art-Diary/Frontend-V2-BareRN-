import AsyncStorage from '@react-native-async-storage/async-storage';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {api} from '~/api';

export const exhibitionKeys = {
  exhibitionList: (keyword: string | null, date: string | null) =>
    ['exhibitionList', keyword, date] as const,
  exhibitionDetail: (exhId: number) => ['exhibitionDetail', exhId] as const,
  exhibitionReviewList: (exhId: number) =>
    ['exhibitionReviewList', exhId] as const,
};

const fetchExhibitionList = async (
  keyword: string | null,
  date: string | null,
  page: number,
  size: number,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/exhibitions`, {
    params: {keyword, date, page, size},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchExhibitionList = (
  keyword: string | null,
  date: string | null,
) =>
  useInfiniteQuery({
    queryKey: exhibitionKeys.exhibitionList(keyword, date),
    initialPageParam: 0,
    queryFn: ({pageParam = 0}) =>
      fetchExhibitionList(keyword, date, pageParam, 20),
    getNextPageParam: lastPage =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 500000,
  });

const fetchExhibitionDetailInfo = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/exhibitions/${exhId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchExhibitionDetailInfo = (exhId: number) =>
  useQuery({
    queryKey: exhibitionKeys.exhibitionDetail(exhId),
    queryFn: () => fetchExhibitionDetailInfo(exhId),
    staleTime: 500000,
  });

const fetchExhibitionReviewListInfo = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/exhibitions/${exhId}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchExhibitionReviewListInfo = (exhId: number) =>
  useQuery({
    queryKey: exhibitionKeys.exhibitionReviewList(exhId),
    queryFn: () => fetchExhibitionReviewListInfo(exhId),
    staleTime: 500000,
  });
