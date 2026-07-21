import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {DiaryAnswer} from '~/types/solo';
import {api} from '~/api';

export const soloDiaryKeys = {
  fetchSoloDiaryList: (visitId: number) =>
    ['fetchSoloDiaryList', visitId] as const,
};

const fetchSoloDiaryList = async (visitId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/users/me/visits/${visitId}/diaries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const useFetchSoloDiaryList = (visitId: number) =>
  useQuery({
    queryKey: soloDiaryKeys.fetchSoloDiaryList(visitId),
    queryFn: () => fetchSoloDiaryList(visitId),
    staleTime: 500000,
  });

const createSoloDiary = async (visitId: number, answers: DiaryAnswer[]) => {
  const token = await AsyncStorage.getItem('accessToken');
  const body = answers.map(answer => ({
    ...answer,
    isPublic: true,
  }));
  const res = await api.post(`/users/me/visits/${visitId}/diaries`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

// const updateSoloDiary = async (soloDiary: SoloDiaryUReqType) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   const res = await axios.patch(
//     `${process.env.API_URL}/exh-visits/${soloDiary.exhId}/diaries/${soloDiary.soloDiaryId}`,
//     soloDiary,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
//   return res.data;
// };

// export const useUpdateSoloDiary = (exhId: number) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (soloDiary: SoloDiaryUReqType) => updateSoloDiary(soloDiary),
//     onError: err => {
//       console.log(err);
//       console.log('[UpdateSoloDiary] error update UpdateSoloDiary');
//     },
//     onSuccess: async () => {
//       console.log('[UpdateSoloDiary] success update UpdateSoloDiary');
//       queryClient.invalidateQueries({
//         queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
//       });
//       queryClient.invalidateQueries({
//         queryKey: exhibitionKeys.exhibitionDetail(exhId),
//       });
//       queryClient.invalidateQueries({
//         queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
//       });
//     },
//   });
// };

// export const deleteSoloDiary = async (soloDiary: SoloDiaryDReqType) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   await axios.delete(
//     `${process.env.API_URL}/exh-visits/${soloDiary.exhId}/diaries/${soloDiary.soloDiaryId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// };

// export const useDeleteSoloDiary = (exhId: number) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (soloDiary: SoloDiaryDReqType) => deleteSoloDiary(soloDiary),
//     onError: err => {
//       console.log(err);
//       console.log('[DeleteSoloDiary] error delete DeleteSoloDiary');
//     },
//     onSuccess: async () => {
//       console.log('[DeleteSoloDiary] success delete DeleteSoloDiary');
//       queryClient.invalidateQueries({
//         queryKey: soloDiaryKeys.fetchSoloDiaryList(exhId),
//       });
//       queryClient.invalidateQueries({
//         queryKey: exhibitionKeys.exhibitionDetail(exhId),
//       });
//       queryClient.invalidateQueries({
//         queryKey: exhibitionKeys.exhibitionMoreReview(exhId),
//       });
//     },
//   });
// };
