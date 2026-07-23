import React from 'react';
import {CheckCircle} from 'lucide-react-native';

import * as S from './ExhibitionSearchCard.style';
import {Exhibition} from '~/types/exhibition';

interface Props {
  exhibition: Exhibition;
  selected: boolean;
  onPress: () => void;
}

const ExhibitionSearchCard = ({exhibition, selected, onPress}: Props) => {
  return (
    <S.Container activeOpacity={0.8} selected={selected} onPress={onPress}>
      <S.Poster
        source={{
          uri: exhibition.poster,
        }}
      />

      <S.Content>
        <S.Info>
          <S.Title numberOfLines={1}>{exhibition.exhName}</S.Title>

          <S.Subtitle numberOfLines={1}>
            {exhibition.painter} · {exhibition.gallery}
          </S.Subtitle>
        </S.Info>
        <S.Date>
          {exhibition.startDate} ~ {exhibition.endDate}
        </S.Date>
      </S.Content>

      <S.CheckContainer>
        <CheckCircle
          size={24}
          color={selected ? '#7EB5DF' : '#D6E2EC'}
          fill={selected ? '#7EB5DF' : 'transparent'}
        />
      </S.CheckContainer>
    </S.Container>
  );
};

export default ExhibitionSearchCard;
