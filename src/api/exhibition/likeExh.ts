import AsyncStorage from '@react-native-async-storage/async-storage';
import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import {ExhibitionDetail, ExhibitionPage} from '~/types/exhibition';
import {api} from '~/api';

const createLikeExhibition = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await api.post(`/exhibitions/${exhId}/likes`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useCreateLikeExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exhId: number) => createLikeExhibition(exhId),

    onMutate: async (exhId: number) => {
      // 이전 데이터 저장 (에러 시 복구용)
      const previousLists = queryClient.getQueriesData({
        queryKey: ['exhibitionList'],
      });

      const previousDetail = queryClient.getQueryData([
        'exhibitionDetail',
        exhId,
      ]);

      // 쿼리 캔슬
      await queryClient.cancelQueries({
        queryKey: ['exhibitionList'],
      });

      await queryClient.cancelQueries({
        queryKey: ['exhibitionDetail', exhId],
      });

      // 목록 캐시 수정
      queryClient.setQueriesData(
        {
          queryKey: ['exhibitionList'],
        },
        (old: InfiniteData<ExhibitionPage> | undefined) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              content: page.content.map(exhibition =>
                exhibition.exhId === exhId
                  ? {
                      ...exhibition,
                      liked: true,
                    }
                  : exhibition,
              ),
            })),
          };
        },
      );

      // 상세 캐시 수정
      queryClient.setQueryData(
        ['exhibitionDetail', exhId],
        (old: ExhibitionDetail | undefined) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            liked: true,
          };
        },
      );

      return {
        previousLists,
        previousDetail,
      };
    },

    onError: (_, exhId, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      queryClient.setQueryData(
        ['exhibitionDetail', exhId],
        context?.previousDetail,
      );
    },

    // onSettled: (_, __, exhId) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['exhibitionList'],
    //   });

    //   queryClient.invalidateQueries({
    //     queryKey: ['exhibitionDetail', exhId],
    //   });
    // },
  });
};

const deleteLikeExhibition = async (exhId: number) => {
  const token = await AsyncStorage.getItem('accessToken');

  const res = await api.delete(`/exhibitions/${exhId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const useDeleteLikeExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLikeExhibition,

    onMutate: async (exhId: number) => {
      const previousLists = queryClient.getQueriesData({
        queryKey: ['exhibitionList'],
      });

      const previousDetail = queryClient.getQueryData([
        'exhibitionDetail',
        exhId,
      ]);

      await queryClient.cancelQueries({
        queryKey: ['exhibitionList'],
      });

      await queryClient.cancelQueries({
        queryKey: ['exhibitionDetail', exhId],
      });

      queryClient.setQueriesData(
        {
          queryKey: ['exhibitionList'],
        },
        (old: InfiniteData<ExhibitionPage> | undefined) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              content: page.content.map(exhibition =>
                exhibition.exhId === exhId
                  ? {
                      ...exhibition,
                      liked: false,
                    }
                  : exhibition,
              ),
            })),
          };
        },
      );

      queryClient.setQueryData(
        ['exhibitionDetail', exhId],
        (old: ExhibitionDetail | undefined) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            liked: false,
          };
        },
      );

      return {
        previousLists,
        previousDetail,
      };
    },

    onError: (_, exhId, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      queryClient.setQueryData(
        ['exhibitionDetail', exhId],
        context?.previousDetail,
      );
    },

    // onSettled: (_, __, exhId) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['exhibitionList'],
    //   });

    //   queryClient.invalidateQueries({
    //     queryKey: ['exhibitionDetail', exhId],
    //   });
    // },
  });
};
