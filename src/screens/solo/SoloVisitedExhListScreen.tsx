import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import * as S from './SoloVisitedExhListScreen.style';

import type {SoloTicket} from '~/types/solo';
import PageFrame from '~/components/common/PageFrame';
import Header from '~/components/common/Header';
import {useFetchSoloVisitedExhList} from '~/api/solo/visitExh';
import LoadingModal from '~/components/modal/LoadingModal';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import TicketCard from '~/components/solo/TicketCard';
import WaitingCard from '~/components/solo/WaitingCard';
import {RootStackNavigationProp} from '~/App';

const SoloVisitedExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {data, isLoading, isError} = useFetchSoloVisitedExhList();

  const records = data ?? [];

  const waitingRecords = records.filter(
    (record: SoloTicket) => !record.completed,
  );
  const completedRecords = records.filter(
    (record: SoloTicket) => record.completed,
  );

  const handleWaitingCardPress = (visitId: number) => {
    navigation.navigate('CreateSoloDiary', {visitId});
  };

  const handleTicketCardPress = (ticket: SoloTicket) => {
    navigation.navigate('SoloDiaryList', {ticket});
  };

  const handleMorePress = (data: SoloTicket) => {
    // BottomSheet 열기
  };

  useApiErrorToast(isError);

  if (isLoading) {
    return (
      <PageFrame>
        <Header
          title={'Ticket Book'}
          subTitle={'나 혼자 간직하는 조근조근 전시 일기'}
        />
        <LoadingModal isLoading={isLoading} />
      </PageFrame>
    );
  }

  if (isError) {
    return (
      <PageFrame>
        <Header
          title={'Ticket Book'}
          subTitle={'나 혼자 간직하는 조근조근 전시 일기'}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <Header
        title={'Ticket Book'}
        subTitle={'나 혼자 간직하는 조근조근 전시 일기'}
      />

      {waitingRecords.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            ✍️ 감상을 기다리는 개인 티켓 ({waitingRecords.length})
          </S.SectionHeader>

          {waitingRecords.map((item: SoloTicket) => (
            <WaitingCard
              key={item.exhId}
              data={item}
              onPress={() => handleWaitingCardPress(item.visitId)}
            />
          ))}
        </S.Section>
      )}

      <S.Section>
        <S.SectionTitle>나의 티켓북 ({completedRecords.length})</S.SectionTitle>

        <FlatList<SoloTicket>
          data={completedRecords}
          keyExtractor={item => item.visitId.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 240,
            gap: 10,
          }}
          renderItem={({item, index}) => (
            <TicketCard
              key={index}
              data={item}
              onPress={() => handleTicketCardPress(item)}
              onMorePress={() => handleMorePress(item)}
            />
          )}
        />
      </S.Section>
    </PageFrame>
  );
};

export default SoloVisitedExhListScreen;
