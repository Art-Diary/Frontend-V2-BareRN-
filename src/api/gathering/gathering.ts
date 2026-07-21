import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {api} from '~/api';

export const gatheringKeys = {
  fetchGatheringList: () => ['fetchGatheringList'] as const,
  // fetchGatheringDetailInfo: (gatheringId: number) =>
  //   ['fetchGatheringDetailInfo', gatheringId] as const
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

// const fetchGatheringDetailInfo = async (gatheringId: number) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   const res = await axios.get(
//     `${process.env.API_URL}/gatherings/${gatheringId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
//   return res.data;
// };

// export const useFetchGatheringDetailInfo = (gatheringId: number) =>
//   useQuery({
//     queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
//     queryFn: () => fetchGatheringDetailInfo(gatheringId),
//     staleTime: 500000,
//   });

// const createGatheringVisitExh = async (info: GatheringVisitExhCReqType) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   const res = await axios.post(
//     `${process.env.API_URL}/gatherings/${info.gatheringId}/exh-visits`,
//     {exhId: info.exhId, visitDate: info.visitDate},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
//   return res.data;
// };

// export const useCreateGatheringVisitExh = (
//   gatheringId: number,
//   date: string,
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (info: GatheringVisitExhCReqType) =>
//       createGatheringVisitExh(info),
//     onError: err => {
//       console.log(err);
//       console.log(
//         '[CreateGatheringVisitExh] error create CreateGatheringVisitExh',
//       );
//     },
//     onSuccess: async (data, variables) => {
//       console.log(
//         '[CreateGatheringVisitExh] success create CreateGatheringVisitExh',
//       );
//       queryClient.invalidateQueries({
//         queryKey: gatheringKeys.fetchGatheringVisitDateList(
//           gatheringId,
//           Number(date.split('.')[0]),
//           Number(date.split('.')[1]),
//         ),
//       });
//       queryClient.invalidateQueries({
//         queryKey: gatheringKeys.fetchGatheringDetailInfo(gatheringId),
//       });
//     },
//   });
// };
