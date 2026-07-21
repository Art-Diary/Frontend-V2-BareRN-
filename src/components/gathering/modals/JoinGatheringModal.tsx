import React from 'react';
import {Modal} from 'react-native';
import {X} from 'lucide-react-native';

import * as S from './JoinGatheringModal.style';

interface Props {
  visible: boolean;
  joinGroupCode: string;
  joinGroupError?: string;
  onChangeCode: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const JoinGatheringModal = ({
  visible,
  joinGroupCode,
  joinGroupError,
  onChangeCode,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <S.Overlay>
        <S.Container>
          <S.Header>
            <S.Title>참여 코드로 가입하기 🔑</S.Title>

            <S.CloseButton onPress={onClose}>
              <X size={14} color="#8BA1B0" />
            </S.CloseButton>
          </S.Header>

          <S.Content>
            <S.Label>가입할 모임 고유코드</S.Label>

            <S.Input
              placeholder="예) g1"
              placeholderTextColor="#AAB7C2"
              value={joinGroupCode}
              onChangeText={onChangeCode}
              autoCapitalize="none"
            />

            {!!joinGroupError && <S.ErrorText>{joinGroupError}</S.ErrorText>}
          </S.Content>

          <S.SubmitButton disabled={!joinGroupCode.trim()} onPress={onSubmit}>
            <S.SubmitText>가입 완료하기</S.SubmitText>
          </S.SubmitButton>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};

export default JoinGatheringModal;
