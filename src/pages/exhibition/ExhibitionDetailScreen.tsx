import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import PageFrame from '~/components/PageFrame';
import * as S from './ExhibitionDetailScreen.style';
import ExhibitionInfo from '~/components/exhibition/ExhibitionInfo';
import BottomActionBar from '~/components/exhibition/BottomActionBar';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchExhibitionDetailInfo} from '~/api/exhibition/exhibition';
import LoadingModal from '~/components/modal/LoadingModal';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import ReviewList from '~/components/exhibition/ReviewList';
import {
  useCreateLikeExhibition,
  useDeleteLikeExhibition,
} from '~/api/exhibition/likeExh';
import {useCreateVisitExh} from '~/api/solo/visitExh';
import DateTimePicker from '@react-native-community/datetimepicker';
import WithBackFrame from '~/components/common/WithBackFrame';

type ExhibitionDetailRouteProp = RouteProp<
  RootStackParamList,
  'ExhibitionDetail'
>;

type DetailTab = 'info' | 'reviews';

export default function ExhibitionDetailScreen() {
  const route = useRoute<ExhibitionDetailRouteProp>();
  const {exhId} = route.params;

  const [selectedTab, setSelectedTab] = useState<DetailTab>('info');
  const [showPicker, setShowPicker] = useState(false);

  const {
    data: exhibition,
    isLoading,
    isError,
  } = useFetchExhibitionDetailInfo(exhId);

  useApiErrorToast(isError);

  const {mutate: createLike} = useCreateLikeExhibition();
  const {mutate: deleteLike} = useDeleteLikeExhibition();

  const {mutate: createVisitExh, isPending} = useCreateVisitExh();

  const handleLike = (liked: boolean) => {
    if (liked) {
      deleteLike(exhId);
    } else {
      createLike(exhId);
    }
  };

  const handleVisitExh = (date: string) => {
    createVisitExh({exhId, visitDate: date});
  };

  const handleClickBottom = () => {
    setShowPicker(true);
  };

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingModal isLoading />
      </PageFrame>
    );
  }

  if (isError || !exhibition) {
    return (
      <PageFrame>
        <WithBackFrame title="전시 상세 정보" line={false} />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      {/* Header */}

      <WithBackFrame title={'전시 상세 정보'} line={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}>
        {/* 대표 이미지 */}

        <S.ImageContainer>
          <S.Image
            source={{
              uri: exhibition.poster,
            }}
          />

          <S.Gradient />

          <S.ImageInfo>
            <S.LocationChip>
              <S.LocationText>{exhibition.gallery}</S.LocationText>
            </S.LocationChip>

            <S.Title>{exhibition.exhName}</S.Title>

            <S.Date>
              {exhibition.startDate} ~ {exhibition.endDate}
            </S.Date>
          </S.ImageInfo>
        </S.ImageContainer>

        {/* 작가 / 비용 */}

        <S.Section>
          <ExhibitionInfo painter={exhibition.painter} fee={exhibition.fee} />
        </S.Section>

        {/* 탭 */}

        <S.Section>
          <S.TabContainer>
            <S.TabButton
              selected={selectedTab === 'info'}
              onPress={() => setSelectedTab('info')}>
              <S.TabText selected={selectedTab === 'info'}>
                📋 상세 소개글
              </S.TabText>
            </S.TabButton>

            <S.TabButton
              selected={selectedTab === 'reviews'}
              onPress={() => setSelectedTab('reviews')}>
              <S.TabText selected={selectedTab === 'reviews'}>
                💬 관람 리뷰
              </S.TabText>
            </S.TabButton>
          </S.TabContainer>
        </S.Section>

        {/* 소개 / 리뷰 */}

        <S.Section>
          {selectedTab === 'info' ? (
            <S.IntroductionCard>
              <S.Introduction>{exhibition.intro}</S.Introduction>
            </S.IntroductionCard>
          ) : (
            <ReviewList exhId={exhId} />
          )}
        </S.Section>
      </ScrollView>

      <BottomActionBar
        liked={exhibition.liked}
        visited={exhibition.visited}
        onLike={() => handleLike(exhibition.liked)}
        onImport={handleClickBottom}
      />
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          is24Hour={true}
          onDismiss={() => setShowPicker(false)}
          onValueChange={(_, date) => {
            const strDate = formatDate(date);

            setShowPicker(false);
            if (strDate) handleVisitExh(strDate);
          }}
        />
      )}
    </PageFrame>
  );
}
