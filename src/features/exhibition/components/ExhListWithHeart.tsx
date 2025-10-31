import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import ExhInfoWithHeart from './ExhInfoWithHeart';
import {useFetchExhibitionList} from '~/api/exhibition/exhibitionInfo';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import InfoMessageView from '~/components/InfoMessageView';
import responsive from '~/components/util/responsiveSize';

export default function ExhListWithHeart() {
  const {
    data: exhList,
    isLoading,
    isError,
  } = useFetchExhibitionList({
    keyword: null,
    field: null,
    price: null,
    state: null,
    date: null,
  }); // [TODO]

  useApiErrorToast(isError);

  return (
    <Contents>
      <LoadingModal isLoading={isLoading} />
      {/* body */}
      <FlatList<ExhInfo>
        ListEmptyComponent={
          <InfoMessageView message={'진행 중인 전시회가 없습니다.'} />
        }
        data={exhList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ExhInfoWithHeart exhInfo={item} />}
      />
    </Contents>
  );
}

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${responsive(10)}px;
  padding-top: ${responsive(5)}px;
  padding-bottom: 0px;
`;
