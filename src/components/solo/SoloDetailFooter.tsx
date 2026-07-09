import React from 'react';

import * as S from './SoloDetailFooter.style';

interface Props {
  isLastStep: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const SoloDetailFooter = ({isLastStep, onNext, onSkip}: Props) => {
  return (
    <S.Container>
      <S.PrimaryButton onPress={onNext}>
        <S.PrimaryText>
          {isLastStep ? '기록 완료하기 🕊' : '다음 질문 ✏️'}
        </S.PrimaryText>
      </S.PrimaryButton>

      <S.SkipButton onPress={onSkip}>
        <S.SkipText>이 질문 건너뛰기</S.SkipText>
      </S.SkipButton>
    </S.Container>
  );
};

export default SoloDetailFooter;
