import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Modal} from 'react-native';
import {BACK_COLOR} from '../util/colors';
import responsive from '../util/responsiveSize';

interface ModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const DecisionModal: React.FC<ModalProps> = ({handleCloseModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}>
      <Backdrop onPress={handleCloseModal}>
        <Container>
          <Contents onStartShouldSetResponder={() => true}>{children}</Contents>
        </Container>
      </Backdrop>
    </Modal>
  );
};

export default DecisionModal;

/** style */
const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: ${responsive(10)}px;
`;

const Contents = styled.View`
  background-color: ${BACK_COLOR};
  border-radius: ${responsive(20)}px;
  width: 100%;
  height: 34%;
`;
