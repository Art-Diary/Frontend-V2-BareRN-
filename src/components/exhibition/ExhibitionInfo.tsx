import React from 'react';
import {DollarSign, User} from 'lucide-react-native';

import * as S from './ExhibitionInfo.styles';

interface Props {
  painter: string;
  fee: string;
}

export default function ExhibitionInfo({painter, fee}: Props) {
  return (
    <S.Container>
      <S.Row>
        <S.Left>
          <User size={14} color="#7EB5DF" />

          <S.Label>작가</S.Label>
        </S.Left>

        <S.Value numberOfLines={1}>{painter}</S.Value>
      </S.Row>

      <S.Divider />

      <S.Row>
        <S.Left>
          <DollarSign size={14} color="#7EB5DF" />

          <S.Label>비용</S.Label>
        </S.Left>

        <S.CostBadge>
          <S.Cost>{fee}</S.Cost>
        </S.CostBadge>
      </S.Row>
    </S.Container>
  );
}
