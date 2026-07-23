import React from 'react';
import {Modal} from 'react-native';
import {Check, Clipboard, Users, X} from 'lucide-react-native';

import * as S from './InviteCodeModal.style';
import responsive from '~/components/util/responsiveSize';

interface Props {
  visible: boolean;
  inviteCode: string;
  linkCopied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

const InviteCodeModal = ({
  visible,
  inviteCode,
  linkCopied,
  onCopy,
  onClose,
}: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <S.Overlay>
        <S.Container>
          <S.Header>
            <S.TitleContainer>
              <S.TitleRow>
                <Users size={16} color="#7EB5DF" />
                <S.Title>초대 코드 공유하기</S.Title>
              </S.TitleRow>

              <S.SubTitle>참여 코드를 전달하여 멤버를 초대해 보세요</S.SubTitle>
            </S.TitleContainer>

            <S.CloseButton onPress={onClose}>
              <X size={14} color="#8BA1B0" />
            </S.CloseButton>
          </S.Header>

          <S.CodeBox>
            <S.CodeHeader>
              <S.CodeLabel>모임 가입용 초대코드</S.CodeLabel>

              <S.CodeHint>버튼을 누르면 바로 복사됩니다</S.CodeHint>
            </S.CodeHeader>

            <S.CodeRow>
              <S.CodeContainer>
                <S.CodeText>{inviteCode}</S.CodeText>

                <S.CopyButton copied={linkCopied} onPress={onCopy}>
                  {linkCopied ? (
                    <Check size={16} color="#5188b3" />
                  ) : (
                    <Clipboard size={responsive(16)} color={'#5188b3'} />
                  )}
                </S.CopyButton>
              </S.CodeContainer>
            </S.CodeRow>
          </S.CodeBox>

          <S.CloseModalButton onPress={onClose}>
            <S.CloseModalText>닫기</S.CloseModalText>
          </S.CloseModalButton>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
};

export default InviteCodeModal;
