import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import {
  useCreateGatheringVisitExh,
  useFetchGatheringNotVisitDateList,
} from '~/api/gathering/gathering';
import {changeDotToHyphen} from '~/components/util/date';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {showToast} from '~/components/util/showToast';
import InfoModal from '~/components/modal/InfoModal';
import LoadingModal from '~/components/modal/LoadingModal';
import ExhItemView from '~/components/ExhItemView';
import CustomTouchable from '~/components/CustomTouchable';
import {InfoButtonIcon} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';

interface ModalProps {
  gatheringId: number;
  selectedDate: string;
  handleCloseModal: () => void;
}

const CreateGatheringVisitExhModal: React.FC<ModalProps> = ({
  gatheringId,
  selectedDate,
  handleCloseModal,
}) => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  // State Management
  const [exhInfo, setExhInfo] = useState<ExhInfo>();
  // API Hooks
  const {
    data: notVisitedexhList,
    isLoading,
    isError,
  } = useFetchGatheringNotVisitDateList(
    gatheringId,
    changeDotToHyphen(selectedDate),
  );

  useApiErrorToast(isError);

  const {
    mutate: createVisitExh,
    isError: isCreateError,
    isSuccess,
    isPending: isCreateLoading,
    error,
  } = useCreateGatheringVisitExh(gatheringId, selectedDate);

  // Effects
  useEffect(() => {
    if (isCreateError) {
      const errorMsg = error.message;

      if (errorMsg.includes('403')) {
        showToast('선택한 날짜에 방문할 수 없는 전시회입니다.');
      } else if (errorMsg.includes('409')) {
        showToast('이미 추가한 전시회입니다.');
      } else {
        showToast('다시 시도해 주세요.');
      }
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isCreateError, isSuccess]);

  // Handlers
  const onClickNextButton = () => {
    if (exhInfo) {
      createVisitExh({
        gatheringId: gatheringId,
        exhId: exhInfo.exhId,
        visitDate: changeDotToHyphen(selectedDate),
      });
    } else {
      showToast('전시회를 선택해 주세요.');
    }
  };

  const onPressExh = (item: ExhInfo) => {
    setExhInfo(item);
  };

  const moveToExhDetail = (exhId: number) => {
    handleCloseModal();
    // [TODO]
    navigation.navigate('ExhDetail', {exhId});
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isLoading || isCreateLoading} />
      <Message>전시회 추가</Message>
      <FlatList<ExhInfo>
        ListEmptyComponent={
          <SelectMsgView>
            <SelectMsgText>
              {selectedDate}에 진행하는 전시회가 없습니다.
            </SelectMsgText>
          </SelectMsgView>
        }
        data={notVisitedexhList}
        renderItem={({item, index}) => (
          <ItemWrapper>
            <LeftBar isClicked={item.exhId === exhInfo?.exhId} />
            <ExhItemView
              exhInfo={item}
              notTouchable={false}
              onTouch={() => onPressExh(item)}>
              {/* 상세보기 이동 */}
              <InfoButtonView>
                <CustomTouchable onPress={() => moveToExhDetail(item.exhId)}>
                  <InfoButtonIcon />
                </CustomTouchable>
              </InfoButtonView>
            </ExhItemView>
          </ItemWrapper>
        )}
      />
      <CustomTouchable onPress={onClickNextButton}>
        <NextButton>완료</NextButton>
      </CustomTouchable>
    </InfoModal>
  );
};

export default CreateGatheringVisitExhModal;

/** style */
const Message = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const ItemWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

interface ItemProps {
  isClicked: boolean;
}

const LeftBar = styled.View<ItemProps>`
  justify-content: center;
  background-color: ${MAIN_COLOR};
  width: ${(props: ItemProps) =>
    props.isClicked ? `${responsive(13)}px` : `0px`};
  margin-bottom: ${responsive(8)}px;
`;

const InfoButtonView = styled.View`
  justify-content: center;
  padding-right: ${responsive(8)}px;
  height: 100%;
`;

const NextButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: ${responsive(25)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
