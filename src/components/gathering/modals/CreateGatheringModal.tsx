import React from 'react';
import {Modal} from 'react-native';
import {X} from 'lucide-react-native';

import * as S from './CreateGatheringModal.style';

interface Props {
  visible: boolean;
  newGatheringName: string;
  onChangeName: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateGatheringModal = ({
  visible,
  newGatheringName,
  onChangeName,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <S.Overlay>
        <S.Container>
          <S.Header>
            <S.Title>새로운 모임방 만들기 🎨</S.Title>

            <S.CloseButton onPress={onClose}>
              <X size={14} color="#8BA1B0" />
            </S.CloseButton>
          </S.Header>

          <S.Content>
            <S.Field>
              <S.Label>모임 이름</S.Label>

              <S.Input
                placeholder="예) 수요일 전시 탐방대 🛸"
                placeholderTextColor="#AAB7C2"
                value={newGatheringName}
                onChangeText={onChangeName}
              />
            </S.Field>
          </S.Content>

          <S.SubmitButton
            disabled={!newGatheringName.trim()}
            onPress={onSubmit}>
            <S.SubmitText>모임 개설 완료 🚀</S.SubmitText>
          </S.SubmitButton>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};

export default CreateGatheringModal;
