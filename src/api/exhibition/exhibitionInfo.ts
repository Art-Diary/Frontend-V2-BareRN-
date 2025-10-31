import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {ExhibitionReqType} from '~/features/exhibition/util/exhibitionType';

const normalize = (p: ExhibitionReqType) => ({
  keyword: p.keyword ?? null,
  field: p.field ?? null,
  price: p.price ?? null,
  state: p.state ?? null,
  date: p.date ?? null,
});

export const exhibitionKeys = {
  exhibitionMoreReview: (exhId: number) =>
    ['exhibitionMoreReview', exhId] as const,
  exhibitionDetail: (exhId: number) => ['exhibitionDetail', exhId] as const,
  listRoot: ['exhibitionList'] as const,
  exhibitionList: (info: ExhibitionReqType) =>
    ['exhibitionList', normalize(info)] as const,
  exhListBySearch: (searchName: string) =>
    ['exhListBySearch', searchName] as const,
  searchHistoryList: () => ['searchHistoryList'] as const,
};

const fetchExhibitionList = async (info: ExhibitionReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/exhibitions`, {
    params: info,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchExhibitionList = (info: ExhibitionReqType) =>
  useQuery({
    queryKey: exhibitionKeys.exhibitionList(info),
    queryFn: () => fetchExhibitionList(info),
    staleTime: 500000,
  });

const fetchNotVisitedExhList = async (date: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/exhibitions/date`, {
    params: {date},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchNotVisitedExhList = (date: string) =>
  useQuery({
    queryKey: ['notVisitedexhibitions', date],
    queryFn: () => fetchNotVisitedExhList(date),
    staleTime: 500000,
  });

const fetchExhibitionDetailInfo = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/exhibitions/${exhId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchExhibitionDetailInfo = (exhId: number) =>
  useQuery({
    queryKey: exhibitionKeys.exhibitionDetail(exhId),
    queryFn: () => fetchExhibitionDetailInfo(exhId),
    staleTime: 500000,
  });

const fetchExhibitionMoreReview = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/exhibitions/${exhId}/diaries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchExhibitionMoreReview = (exhId: number) =>
  useQuery({
    queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
    queryFn: () => fetchExhibitionMoreReview(exhId),
    staleTime: 500000,
  });

const fetchExhListBySearch = async (searchName: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/exhibitions/search`, {
    params: {searchName},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchExhListBySearch = (searchName: string) =>
  useQuery({
    queryKey: exhibitionKeys.exhListBySearch(searchName),
    queryFn: () => fetchExhListBySearch(searchName),
    staleTime: 500000,
  });

const fetchSearchHistoryList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchSearchHistoryList = () =>
  useQuery({
    queryKey: exhibitionKeys.searchHistoryList(),
    queryFn: () => fetchSearchHistoryList(),
    staleTime: 500000,
  });
