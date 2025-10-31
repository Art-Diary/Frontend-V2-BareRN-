import React, {useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from 'App';
import {FlatList, Pressable} from 'react-native';
import {RootStackParamList} from '~/navigationTypes';
import {useWriteDiaryActions} from '~/zustand/soloDiary';
import {SoloDiaryInfoType} from '~/features/solo-note/util/soloDiaryType';
import {useFetchExhibitionMoreReview} from '~/api/exhibition/exhibitionInfo';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {showToast} from '~/components/util/showToast';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import WithBackFrame from '~/components/WithBackFrame';
import {WriteDiaryButtonIcon} from '~/components/icon';
import BodyFrame from '~/components/BodyFrame';
import InfoMessageView from '~/components/InfoMessageView';
import SoloNote from '~/components/SoloNote';
import responsive from '~/components/util/responsiveSize';
import DiaryUpdateDeleteModal from '~/components/modal/DiaryUpdateDeleteModal';
import DeleteDiaryModal from '~/features/solo-note/component/DeleteDiaryModal';
import {LIGHT_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import {useUserInfo} from '~/zustand/userInfo';

type ExhForMoreReviewProp = RouteProp<RootStackParamList, 'ExhForMoreReview'>;

interface Props {
  route: ExhForMoreReviewProp;
}

const ExhForMoreReviewScreen: React.FC<Props> = ({route}) => {
  const {exhId, reviewCount, isEvalFinished, isVisitedExh} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const {updateInitEval, resetWriteDiaryInfo} = useWriteDiaryActions();
  const [soloDiaryData, setSoloDiaryData] = useState<SoloDiaryInfoType>({
    soloDiaryId: 0,
    exhId: exhId,
    questionId: 0,
    question: '',
    answer: '',
    writeDate: '',
    isPublic: true,
  });
  // API Hooks
  const {
    data: moreReviewList,
    isLoading,
    isError,
  } = useFetchExhibitionMoreReview(exhId);
  useApiErrorToast(isError);

  const onPressNewButton = () => {
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

  const changeModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleModal = (soloDiary: SoloDiaryInfoType) => {
    console.log(soloDiary);
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
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <WithBackFrame title="기록" line={true}>
        <CustomTouchable onPress={onPressNewButton}>
          <WriteDiaryButtonIcon />
        </CustomTouchable>
      </WithBackFrame>
      <BodyFrame>
        <FlatList<SoloDiaryInfoType>
          ListHeaderComponent={() => (
            <ReviewCountTitle>
              {moreReviewList && '기록 ' + moreReviewList.length + '개'}
            </ReviewCountTitle>
          )}
          ListEmptyComponent={
            <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
          }
          data={moreReviewList ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            // 내 것만 가능하도록
            <Pressable
              disabled={item.userId !== userInfo.userId}
              onLongPress={() => handleModal(item)}
              delayLongPress={400} // 길게 누르는 최소 시간(ms) 기본 ~500, 원하는 값으로
              style={{
                marginBottom:
                  index === moreReviewList.length - 1 ? responsive(30) : 0,
              }}>
              <SoloNote soloDiary={item} />
            </Pressable>
          )}
        />
      </BodyFrame>
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
    </PageFrame>
  );
};

export default ExhForMoreReviewScreen;

/** style */
const ReviewCountTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(15)}px;
  padding-bottom: ${responsive(20)}px;
`;
