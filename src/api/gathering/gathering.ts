import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  GatheringMemberCReqType,
  GatheringVisitExhCReqType,
} from '~/features/together/util/gatheringInfoType';

export const gatheringKeys = {
  fetchGatheringList: () => ['fetchGatheringList'] as const,
  fetchGatheringDetailInfo: (gatheringId: number) =>
    ['fetchGatheringDetailInfo', gatheringId] as const,
  fetchGatheringMemberSearch: (gatheringId: number, nickname: string) =>
    ['fetchGatheringDetailInfo', gatheringId, nickname] as const,
  fetchGatheringVisitDateList: (
    gatheringId: number,
    year: number,
    month: number,
  ) => ['fetchGatheringVisitDateList', gatheringId, year, month],
  fetchGatheringNotVisitDateList: (gatheringId: number, date: string) => [
    'fetchGatheringNotVisitDateList',
    gatheringId,
    date,
  ],
};

const fetchGatheringList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/gatherings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchGatheringList = () =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringList(),
    queryFn: () => fetchGatheringList(),
    staleTime: 500000,
  });

const createGathering = async (gatheringName: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/gatherings`,
    {gatheringName},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringName: string) => createGathering(gatheringName),
    onError: err => {
      console.log(err);
      console.log('[CreateGathering] error create CreateGathering');
    },
    onSuccess: async (data, variables) => {
      console.log('[CreateGathering] success create CreateGathering');
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringList(),
      });
    },
  });
};

const fetchGatheringDetailInfo = async (gatheringId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useFetchGatheringDetailInfo = (gatheringId: number) =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
    queryFn: () => fetchGatheringDetailInfo(gatheringId),
    staleTime: 500000,
  });

const fetchGatheringMemberSearch = async (
  gatheringId: number,
  nickname: string,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}/search`,
    {
      params: {nickname},
      headers: {Authorization: `Bearer ${token}`},
    },
  );
  return res.data;
};

export const useFetchGatheringMemberSearch = (
  gatheringId: number,
  nickname: string,
) =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringMemberSearch(gatheringId, nickname),
    queryFn: () => fetchGatheringMemberSearch(gatheringId, nickname),
    staleTime: 500000,
  });

const createGatheringMember = async (info: GatheringMemberCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/gatherings/${info.gatheringId}`,
    {userId: info.userId},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGatheringMember = (gatheringId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringMemberCReqType) => createGatheringMember(info),
    onError: err => {
      console.log(err);
      console.log('[CreateGatheringMember] error create CreateGatheringMember');
    },
    onSuccess: async (data, variables) => {
      console.log(
        '[CreateGatheringMember] success create CreateGatheringMember',
      );
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
      });
    },
  });
};

const fetchGatheringVisitDateList = async (
  gatheringId: number,
  year: number,
  month: number,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}/exh-visits`,
    {
      params: {year, month},
      headers: {Authorization: `Bearer ${token}`},
    },
  );
  return res.data;
};

export const useFetchGatheringVisitDateList = (
  gatheringId: number,
  year: number,
  month: number,
) =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringVisitDateList(
      gatheringId,
      year,
      month,
    ),
    queryFn: () => fetchGatheringVisitDateList(gatheringId, year, month),
    staleTime: 500000,
  });

const fetchGatheringNotVisitDateList = async (
  gatheringId: number,
  date: string,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(
    `${process.env.API_URL}/gatherings/${gatheringId}/exh-visits/date`,
    {
      params: {date},
      headers: {Authorization: `Bearer ${token}`},
    },
  );
  return res.data;
};

export const useFetchGatheringNotVisitDateList = (
  gatheringId: number,
  date: string,
) =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringNotVisitDateList(gatheringId, date),
    queryFn: () => fetchGatheringNotVisitDateList(gatheringId, date),
    staleTime: 500000,
  });

const createGatheringVisitExh = async (info: GatheringVisitExhCReqType) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.post(
    `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits`,
    {exhId: info.exhId, visitDate: info.visitDate},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGatheringVisitExh = (
  gatheringId: number,
  date: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: GatheringVisitExhCReqType) =>
      createGatheringVisitExh(info),
    onError: err => {
      console.log(err);
      console.log(
        '[CreateGatheringVisitExh] error create CreateGatheringVisitExh',
      );
    },
    onSuccess: async (data, variables) => {
      console.log(
        '[CreateGatheringVisitExh] success create CreateGatheringVisitExh',
      );
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringVisitDateList(
          gatheringId,
          Number(date.split('.')[0]),
          Number(date.split('.')[1]),
        ),
      });
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
      });
    },
  });
};
