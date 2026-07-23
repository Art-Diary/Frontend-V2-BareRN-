import React, {useEffect, useState} from 'react';

import * as S from './GatheringAddExhibitionStep2Screen.style';
import PageFrame from '~/components/common/PageFrame';
import WithBackFrame from '~/components/common/WithBackFrame';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useCreateGatheringVisitedExh} from '~/api/gathering/gathering';
import LoadingModal from '~/components/modal/LoadingModal';
import {showToast} from '~/components/util/toastConfig';
import {RootStackNavigationProp} from '~/App';

type Route = RouteProp<RootStackParamList, 'GatheringAddExhibitionStep2'>;

const GatheringAddExhibitionStep2Screen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useRoute<Route>();
  const exhibition = params.exhibition;
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    mutateAsync: createGatheringVisitedExh,
    isPending,
    isError,
    isSuccess,
  } = useCreateGatheringVisitedExh();

  useEffect(() => {
    if (isError) {
      showToast('해당 날짜를 선택할 수 없습니다');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigation.pop(2);
    }
  }, [isSuccess]);

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  const onComplete = () => {
    if (!selectedDate) {
      showToast('날짜를 선택해 주세요');
      return;
    }
    createGatheringVisitedExh({
      gatheringId: params.gatheringId,
      exhId: exhibition.exhId,
      visitDate: selectedDate,
    });
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      <WithBackFrame title={'전시회 추가 (2/2)'} />
      <S.Content>
        <S.Title>언제 방문하셨나요? 📅</S.Title>

        <S.SelectedCard>
          <S.Poster
            source={{
              uri: exhibition.poster,
            }}
          />

          <S.Info>
            <S.SelectedLabel>SELECTED</S.SelectedLabel>

            <S.ExhibitionTitle numberOfLines={1}>
              {exhibition.exhName}
            </S.ExhibitionTitle>

            <S.Location numberOfLines={1}>
              {exhibition.painter} · {exhibition.gallery}
            </S.Location>
          </S.Info>
        </S.SelectedCard>

        <S.InputSection>
          <S.Label>방문 일자</S.Label>

          <S.Button onPress={() => setShowPicker(true)}>
            {selectedDate ? (
              <S.ButtonText>{selectedDate}</S.ButtonText>
            ) : (
              <S.ButtonText>날짜를 선택해 주세요</S.ButtonText>
            )}
          </S.Button>
        </S.InputSection>
        {showPicker && (
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="date"
            display="default"
            is24Hour={true}
            onDismiss={() => setShowPicker(false)}
            onValueChange={(event, date) => {
              const strDate = formatDate(date);
              setShowPicker(false);
              if (strDate) {
                setSelectedDate(strDate);
              }
            }}
          />
        )}
      </S.Content>

      <S.Bottom>
        <S.CompleteButton disabled={!selectedDate} onPress={onComplete}>
          <S.CompleteButtonText>모임에 전시회 등록하기</S.CompleteButtonText>
        </S.CompleteButton>
      </S.Bottom>
    </PageFrame>
  );
};

export default GatheringAddExhibitionStep2Screen;
