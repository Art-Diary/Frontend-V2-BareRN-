import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import LoadingModal from '~/components/modal/LoadingModal';
import {useFetchMyVisitExhList} from '~/api/solo-note/visitExh';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import InfoMessageView from '~/components/InfoMessageView';
import Ticket from '~/components/Ticket';
import responsive from '~/components/util/responsiveSize';

export default function MyVisitExhList() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {data: myVisitExhList, isLoading, isError} = useFetchMyVisitExhList();

  useApiErrorToast(isError);

  const onPress = (exhId: number) => {
    /** 기록 상세 내용으로 이동 */
    navigation.navigate('MyDiary', {exhId});
  };

  return (
    <Contents>
      <LoadingModal isLoading={isLoading} />
      {/* body */}
      <FlatList
        ListEmptyComponent={
          <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
        }
        data={myVisitExhList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Ticket
            poster={item.poster}
            exhName={item.exhName}
            gallery={item.gallery}
            visitDate={item.visitDate}
            exhId={item.exhId}
            handleClick={onPress}
          />
        )}
      />
    </Contents>
  );
}

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${responsive(10)}px;
  padding-bottom: 0px;
  align-items: center;
  gap: ${responsive(7)}px;
`;
