import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {useFetchSoloDiaryList} from '~/api/solo-note/soloDiary';
import BodyFrame from '~/components/BodyFrame';
import InfoMessageView from '~/components/InfoMessageView';
import SoloNote from '~/components/SoloNote';
import WithBackFrame from '~/components/WithBackFrame';
import CustomTouchable from '~/components/CustomTouchable';
import {WriteDiaryButtonIcon} from '~/components/icon';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import DiaryUpdateDeleteModal from '~/components/modal/DiaryUpdateDeleteModal';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import DeleteDiaryModal from '~/features/solo-note/component/DeleteDiaryModal';
import EvalInfo from '~/features/solo-note/component/EvalInfo';
import {SoloDiaryInfoType} from '~/features/solo-note/util/soloDiaryType';
import {RootStackParamList} from '~/navigationTypes';
import {useWriteDiaryActions} from '~/zustand/soloDiary';
import PageFrame from '~/components/PageFrame';

type MyDiaryScreenProp = RouteProp<RootStackParamList, 'MyDiary'>;

interface Props {
  route: MyDiaryScreenProp;
}

const MyDiaryScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const {
    data: soloDiaryListWithEval,
    isLoading,
    isError,
  } = useFetchSoloDiaryList(exhId);
  const [soloDiaryData, setSoloDiaryData] = useState<SoloDiaryInfoType>({
    soloDiaryId: 0,
    exhId: exhId,
    questionId: 0,
    question: '',
    answer: '',
    writeDate: '',
    isPublic: true,
  });
  const {updateInitEval, resetWriteDiaryInfo} = useWriteDiaryActions();

  useApiErrorToast(isError);

  const onPressNewButton = () => {
    // reset
    resetWriteDiaryInfo();
    if (soloDiaryListWithEval?.evalInfoList.length > 0) {
      // initEval
      updateInitEval(false);
      navigation.navigate('WriteFirstSoloDiary', {exhId});
    } else {
      // initEval
      updateInitEval(true);
      navigation.navigate('DoEvaluation', {exhId});
    }
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
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      {/* header */}
      <WithBackFrame line={true}>
        <CustomTouchable onPress={onPressNewButton}>
          <WriteDiaryButtonIcon />
        </CustomTouchable>
      </WithBackFrame>
      {/* body */}
      <BodyFrame>
        <FlatList<SoloDiaryInfoType>
          ListHeaderComponent={() =>
            soloDiaryListWithEval?.evalInfoList.length > 0 ? (
              <EvalInfo
                exhId={exhId}
                evalInfoList={soloDiaryListWithEval?.evalInfoList}
              />
            ) : null
          }
          ListEmptyComponent={
            <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
          }
          data={soloDiaryListWithEval?.soloDiaryInfoList ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Pressable
              onLongPress={() => handleModal(item)}
              delayLongPress={400} // 길게 누르는 최소 시간(ms) 기본 ~500, 원하는 값으로
              style={{
                marginBottom:
                  index === soloDiaryListWithEval?.soloDiaryInfoList.length - 1
                    ? responsive(30)
                    : 0,
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

export default MyDiaryScreen;
