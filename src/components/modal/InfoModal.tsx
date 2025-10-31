import React, {ReactNode} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {BACK_COLOR} from '../util/colors';
import responsive from '../util/responsiveSize';

interface InfoModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({handleCloseModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => handleCloseModal()}>
      <Backdrop onPress={handleCloseModal}>
        {/* 컨텐츠 영역 */}
        <Container>
          <Contents onStartShouldSetResponder={() => true}>{children}</Contents>
        </Container>
      </Backdrop>
    </Modal>
  );
};

export default InfoModal;

/** style */
const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Contents = styled.View`
  background-color: ${BACK_COLOR};
  border-top-left-radius: ${responsive(20)}px;
  border-top-right-radius: ${responsive(20)}px;
  padding: ${responsive(20)}px;
  padding-top: ${responsive(25)}px;
  width: 100%;
  height: 74%;
  gap: ${responsive(17)}px;
`;
