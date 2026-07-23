import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {api} from '~/api';

export const gatheringKeys = {
  fetchGatheringList: () => ['fetchGatheringList'] as const,
  fetchGatheringDetailInfo: (gatheringId: number) =>
    ['fetchGatheringDetailInfo', gatheringId] as const,
};

const fetchGatheringList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/gatherings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchGatheringList = () =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringList(),
    queryFn: () => fetchGatheringList(),
    staleTime: 500000,
  });

const createGathering = async (name: string) => {
  const token = await AsyncStorage.getItem('accessToken');

  await api.post(
    `/gatherings`,
    {name},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useCreateGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createGathering(name),
    onError: err => {
      console.log(err);
      console.log('[CreateGathering] error create CreateGathering');
    },
    onSuccess: async () => {
      console.log('[CreateGathering] success create CreateGathering');
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringList(),
      });
    },
  });
};

const joinGathering = async (code: string) => {
  const token = await AsyncStorage.getItem('accessToken');

  await api.post(
    `/gatherings/join`,
    {code},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useJoinGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => joinGathering(code),
    onError: err => {
      console.log(err);
      console.log('[JoinGathering] error create JoinGathering');
    },
    onSuccess: async () => {
      console.log('[JoinGathering] success create JoinGathering');
      queryClient.invalidateQueries({
        queryKey: gatheringKeys.fetchGatheringList(),
      });
    },
  });
};

const fetchGatheringDetailInfo = async (gatheringId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/gatherings/${gatheringId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchGatheringDetailInfo = (gatheringId: number) =>
  useQuery({
    queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
    queryFn: () => fetchGatheringDetailInfo(gatheringId),
    staleTime: 500000,
  });

const createGatheringVisitedExh = async (
  gatheringId: number,
  exhId: number,
  visitDate: string,
) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.post(
    `/gatherings/${gatheringId}/visits`,
    {exhId: exhId, visitDate: visitDate},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const useCreateGatheringVisitedExh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gatheringId,
      exhId,
      visitDate,
    }: {
      gatheringId: number;
      exhId: number;
      visitDate: string;
    }) => createGatheringVisitedExh(gatheringId, exhId, visitDate),
    onError: err => {
      console.log(err);
      console.log(
        '[CreateGatheringVisitedExh] error create CreateGatheringVisitedExh',
      );
    },
    onSuccess: async (data, variables) => {
      console.log(
        '[CreateGatheringVisitedExh] success create CreateGatheringVisitedExh',
      );
      queryClient.invalidateQueries({
        queryKey: ['fetchGatheringDetailInfo', variables.gatheringId],
      });
    },
  });
};
