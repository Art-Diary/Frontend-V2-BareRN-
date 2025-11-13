import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {GatheringDiaryDReqType} from '../../util/gatheringDiaryType';
import {useDeleteGatheringDiary} from '~/api/gathering/gatheringDiary';
import {showToast} from '~/components/util/showToast';
import DecisionModal from '~/components/modal/DecisionModal';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';

interface DeleteDiaryModalProps {
  gatheringDiaryRequest: GatheringDiaryDReqType;
  handleCloseModal: () => void;
}

const DeleteDiaryModal: React.FC<DeleteDiaryModalProps> = ({
  gatheringDiaryRequest,
  handleCloseModal,
}) => {
  // API Hooks
  const {
    mutate: deleteGatheringDiary,
    isPending,
    isError,
    isSuccess,
  } = useDeleteGatheringDiary();

  useEffect(() => {
    if (isError) {
      handleCloseModal();
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess, handleCloseModal]);

  const onPressDelete = () => {
    deleteGatheringDiary(gatheringDiaryRequest);
  };

  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isPending} />
      <Contents>
        <MsgWrapper>
          <Message>기록을 삭제하겠습니까?</Message>
          <MessageSub>삭제하면 복구할 수 없습니다.</MessageSub>
        </MsgWrapper>
        <ButtonSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={handleCloseModal}>
              <DeleteButton isMain={false}>닫기</DeleteButton>
            </CustomTouchable>
          </ButtonDetailSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={onPressDelete}>
              <DeleteButton isMain>삭제</DeleteButton>
            </CustomTouchable>
          </ButtonDetailSection>
        </ButtonSection>
      </Contents>
    </DecisionModal>
  );
};

export default DeleteDiaryModal;

/** style */
const Contents = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: ${responsive(20)}px;
  padding-left: ${responsive(20)}px;
  padding-right: ${responsive(20)}px;
`;

const MsgWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${responsive(5)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${responsive(20.5)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${responsive(15)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ButtonSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonDetailSection = styled.View`
  width: 49%;
`;

interface ButtonTextProps {
  isMain: boolean;
}

const DeleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonTextProps) =>
    props.isMain ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;
