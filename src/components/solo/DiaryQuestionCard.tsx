import React from 'react';

import * as S from './DiaryQuestionCard.style';

interface Props {
  title: string;
  answer?: string;
}

const DiaryQuestionCard = ({title, answer}: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.Answer>{answer?.trim() || '기록을 패스했어요.'}</S.Answer>
    </S.Container>
  );
};

export default DiaryQuestionCard;
