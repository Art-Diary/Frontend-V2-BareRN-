import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MapPin, MoreVertical} from 'lucide-react-native';

import * as S from './SoloDiaryListScreen.style';

import {RootStackParamList} from '~/navigationTypes';
import DiaryQuestionCard from '~/components/solo/DiaryQuestionCard';
import {useFetchSoloDiaryList} from '~/api/solo/diary';
import {Diary} from '~/types/solo';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/common/WithBackFrame';

type Route = RouteProp<RootStackParamList, 'SoloDiaryList'>;

const SoloDiaryListScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute<Route>();

  const {ticket} = params;

  const {data, isLoading, isError} = useFetchSoloDiaryList(ticket.visitId);

  const diaryList = data ?? [];

  console.log('diaryList:', diaryList);

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingModal isLoading />
      </PageFrame>
    );
  }

  if (isError) {
    return (
      <PageFrame>
        <WithBackFrame title="기록" line={false} />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <WithBackFrame title={'기록'} line={false}>
        <S.IconButton>
          <MoreVertical size={20} color="#8BA1B0" />
        </S.IconButton>
      </WithBackFrame>

      <S.Scroll>
        <S.HeroContainer>
          <S.Image
            source={{
              uri: ticket.poster,
            }}
          />

          <S.Gradient />

          <S.HeroContent>
            {/* <S.TagRow>
              <S.PrimaryTag>
                <S.PrimaryTagText>{record.tags.reason}</S.PrimaryTagText>
              </S.PrimaryTag>

              <S.SecondaryTag>
                <S.SecondaryTagText>{record.tags.companion}</S.SecondaryTagText>
              </S.SecondaryTag>
            </S.TagRow> */}

            <S.Title>{ticket.exhName}</S.Title>

            <S.LocationRow>
              <MapPin size={14} color="#7EB5DF" />

              <S.Location>
                {ticket.gallery} · {ticket.visitDate}
              </S.Location>
            </S.LocationRow>
          </S.HeroContent>
        </S.HeroContainer>

        {/* <S.PreferenceCard>
          <S.SectionTitle>조근조근 기록한 나의 취향</S.SectionTitle>

          <S.PreferenceGrid>
            <S.PreferenceItem>
              <S.PreferenceLabel>난이도</S.PreferenceLabel>

              <S.PreferenceValue>{record.tags.difficulty}</S.PreferenceValue>
            </S.PreferenceItem>

            <S.PreferenceItem>
              <S.PreferenceLabel>목적</S.PreferenceLabel>

              <S.PreferenceValue>{record.tags.reason}</S.PreferenceValue>
            </S.PreferenceItem>
          </S.PreferenceGrid>
        </S.PreferenceCard> */}

        {diaryList.map((diary: Diary) => (
          <DiaryQuestionCard
            key={diary.soloDiaryId}
            title={`${diary.questionContent}`}
            answer={diary.answerContent}
          />
        ))}
      </S.Scroll>
    </PageFrame>
  );
};

export default SoloDiaryListScreen;
