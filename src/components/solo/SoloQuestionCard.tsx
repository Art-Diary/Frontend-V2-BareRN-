import React from 'react';

import * as S from './SoloQuestionCard.style';

interface Props {
  question: string;
  answer: string;
  onChangeAnswer: (answer: string) => void;
}

const SoloQuestionCard = ({question, answer, onChangeAnswer}: Props) => {
  return (
    <S.Container>
      <S.Title>{question}</S.Title>

      <S.Input
        multiline
        textAlignVertical="top"
        placeholder={
          '예) 알록달록한 원색 캐릭터들이 춤을 추던 커다란 메인 캔버스화가 참 마음에 들었어요.'
        }
        value={answer}
        onChangeText={(text: string) => onChangeAnswer(text)}
      />
    </S.Container>
  );
};

export default SoloQuestionCard;
