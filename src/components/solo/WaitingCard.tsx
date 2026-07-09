import React from 'react';

import * as S from './WaitingCard.style';
import {PersonalTicket} from '~/types/personal';

interface Props {
  data: PersonalTicket;
  onPress: () => void;
}

const WaitingCard = ({data, onPress}: Props) => {
  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <S.Title numberOfLines={1}>{data.exhName}</S.Title>

        <S.SubTitle numberOfLines={1}>
          {data.gallery} · {data.visitDate}
        </S.SubTitle>
      </S.Content>

      <S.ActionBadge>
        <S.ActionText>마음 적기 ✏️</S.ActionText>
      </S.ActionBadge>
    </S.Container>
  );
};

export default WaitingCard;
