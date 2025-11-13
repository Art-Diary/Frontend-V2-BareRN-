import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {EvalInfoForExh, SoloDiaryListForExh} from '../util/exhibitionType';
import {Pressable} from 'react-native';
import {SoloDiaryInfoType} from '~/features/solo-note/util/soloDiaryType';
import {useWriteDiaryActions} from '~/zustand/soloDiary';
import {showToast} from '~/components/util/showToast';
import CustomTouchable from '~/components/CustomTouchable';
import {CheckIcon, WriteDiaryButtonIcon} from '~/components/icon';
import SoloNote from '~/components/SoloNote';
import DiaryUpdateDeleteModal from '~/components/modal/DiaryUpdateDeleteModal';
import DeleteDiaryModal from '~/features/solo-note/component/DeleteDiaryModal';
import responsive from '~/components/util/responsiveSize';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import {useUserInfo} from '~/zustand/userInfo';

interface Props {
  exhId: number;
  reviewCount: number;
  isEvalFinished: boolean;
  isVisitedExh: boolean;
  reviewList: SoloDiaryListForExh[];
  evalInfos: EvalInfoForExh[];
}

const ExhReviewList: React.FC<Props> = ({
  exhId,
  reviewCount,
  isEvalFinished,
  isVisitedExh,
  reviewList,
  evalInfos,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const limit = 3;
  const userInfo = useUserInfo();
  const {updateInitEval, resetWriteDiaryInfo} = useWriteDiaryActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [soloDiaryData, setSoloDiaryData] = useState<SoloDiaryInfoType>({
    soloDiaryId: 0,
    exhId: exhId,
    questionId: 0,
    question: '',
    answer: '',
    writeDate: '',
    isPublic: true,
  });

  const onPressButton = () => {
    // 방문 날짜가 있으면 평가 여부에 따라 다름
    // 없으면 추가해달라고 알림
    if (!isVisitedExh) {
      showToast('먼저 전시회 티켓을 만들어주세요.');
      return;
    }
    // reset
    resetWriteDiaryInfo();
    updateInitEval(!isEvalFinished);
    navigation.navigate(
      isEvalFinished ? 'WriteFirstSoloDiary' : 'DoEvaluation',
      {exhId},
    );
  };

  const clickMoreReview = () => {
    navigation.navigate('ExhForMoreReview', {
      exhId,
      reviewCount,
      isEvalFinished,
      isVisitedExh,
    });
  };

  const changeModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleModal = (soloDiary: SoloDiaryInfoType) => {
    setSoloDiaryData({...soloDiary, exhId});
    changeModal();
  };

  const onPressUpdate = () => {
    changeModal();
    navigation.navigate('UpdateSoloDiary', {soloDiary: soloDiaryData});
  };

  const onPressDelete = () => {
    setIsDeleteModalOpen(prev => !prev);
    changeModal();
  };

  const onPressRealDelete = () => {
    setIsDeleteModalOpen(prev => !prev);
  };

  return (
    <ReView>
      <TitleWrapper>
        <Title>{'기록'}</Title>
        <CustomTouchable onPress={onPressButton}>
          <WriteDiaryButtonIcon />
        </CustomTouchable>
      </TitleWrapper>
      {/* evaluations */}
      {evalInfos.length > 0 && (
        <SectionNameView>
          <SectionNameText>{'이런 점이 좋았어!'}</SectionNameText>
          {evalInfos.map((item: EvalInfoForExh, index: number) => (
            <InfoView key={index}>
              <QuestionWrapper>
                <CheckIcon />
                <InfoText>{item.factorName}</InfoText>
              </QuestionWrapper>
              <ChoiceView>
                <ChoiceText>{item.optionName}</ChoiceText>
              </ChoiceView>
            </InfoView>
          ))}
        </SectionNameView>
      )}
      {/* reviews */}
      {reviewList.length > 0 ? (
        <ReviewWrapper>
          <ReviewCountView>
            <ReviewCountTitle>{'기록 ' + reviewCount + '개'}</ReviewCountTitle>
            {reviewList.map((item: any, index: number) => (
              // 내 것 만 길게 터치 가능하도록
              <Pressable
                key={index}
                disabled={item.userId !== userInfo.userId}
                onLongPress={() => handleModal(item)}
                delayLongPress={400}>
                <SoloNote soloDiary={item} />
              </Pressable>
            ))}
          </ReviewCountView>
          {reviewCount > limit && (
            <MoreReview>
              <CustomTouchable activeOpacity={0.6} onPress={clickMoreReview}>
                <MoreReviewTitle>{'기록들 더보기 >'}</MoreReviewTitle>
              </CustomTouchable>
            </MoreReview>
          )}

          {isModalOpen && (
            <DiaryUpdateDeleteModal
              handleCloseModal={changeModal}
              handleUpdate={onPressUpdate}
              handleDelete={onPressDelete}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteDiaryModal
              soloDiary={soloDiaryData}
              handleCloseModal={onPressRealDelete}
            />
          )}
        </ReviewWrapper>
      ) : (
        <NoReview> {'기록이 아직 없습니다.'}</NoReview>
      )}
    </ReView>
  );
};

export default ExhReviewList;

/** style */
const ReView = styled.View`
  flex-direction: column;
  width: 100%;
  padding: ${responsive(15)}px;
  margin-bottom: ${responsive(50)}px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const SectionNameView = styled.View``;

const SectionNameText = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(20)}px;
  padding-bottom: ${responsive(12)}px;
`;

const QuestionWrapper = styled.View`
  flex-direction: row;
  gap: ${responsive(7)}px;
`;

const InfoView = styled.View`
  flex-direction: row;
  gap: ${responsive(10)}px;
  justify-content: space-between;
  margin-bottom: ${responsive(1)}px;
`;

const InfoText = styled.Text`
  font-size: ${responsive(17.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ChoiceView = styled.View`
  justify-content: space-between;
  align-items: center;
  border-radius: ${responsive(20)}px;
  border-color: ${MAIN_COLOR};
  border-width: ${responsive(1.3)}px;
  padding-top: ${responsive(3)}px;
  padding-bottom: ${responsive(3)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
  margin-bottom: ${responsive(1)}px;
`;

const ChoiceText = styled.Text`
  font-size: ${responsive(15.5)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  text-align: center;
`;

// review section
const ReviewCountView = styled.View``;

const ReviewCountTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
  padding-bottom: ${responsive(20)}px;
`;

const ReviewWrapper = styled.View`
  padding-top: ${responsive(25)}px;
`;

const NoReview = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(15)}px;
`;

// more review
const MoreReview = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: ${responsive(20)}px;
`;

const MoreReviewTitle = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
