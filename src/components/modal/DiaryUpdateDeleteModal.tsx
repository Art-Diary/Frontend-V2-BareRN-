import React from 'react';
import styled from 'styled-components/native';
import {BORDER_COLOR, DARK_GREY, MIDDLE_GREY} from '../util/colors';
import {FONT_NAME} from '../util/style';
import DecisionModal from './DecisionModal';
import responsive from '../util/responsiveSize';
import CustomTouchable from '../CustomTouchable';
import {CloseButtonIcon, PencilUpdateIcon, TrashDeleteIcon} from '../icon';

interface ModalProps {
  handleCloseModal: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const DiaryUpdateDeleteModal: React.FC<ModalProps> = ({
  handleCloseModal,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <Contents>
        <CustomTouchable onPress={handleDelete}>
          <ItemView>
            <TrashDeleteIcon />
            <MsgWrapper>
              <Message>삭제</Message>
              <MessageSub>기록 삭제</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
        <SeperateLine />
        <CustomTouchable onPress={handleUpdate}>
          <ItemView>
            <PencilUpdateIcon />
            <MsgWrapper>
              <Message>수정</Message>
              <MessageSub>기록 수정</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
        <SeperateLine />
        <CustomTouchable onPress={handleCloseModal}>
          <ItemView>
            <CloseButtonIcon />
            <MsgWrapper>
              <Message>닫기</Message>
              <MessageSub>창 닫기</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
      </Contents>
    </DecisionModal>
  );
};

export default DiaryUpdateDeleteModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${responsive(30)}px;
  padding-bottom: ${responsive(30)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
`;

const ItemView = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${responsive(25)}px;
  align-items: center;
  padding-left: ${responsive(20)}px;
`;

const MsgWrapper = styled.View`
  flex-direction: column;
  width: 100%;
`;

const Message = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const SeperateLine = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: ${responsive(0.5)}px;
  border-color: ${BORDER_COLOR};
`;
