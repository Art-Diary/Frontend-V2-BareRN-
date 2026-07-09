import React from 'react';
import {Image} from 'react-native';
import {Calendar, MapPin, MoreVertical} from 'lucide-react-native';

import * as S from './TicketCard.style';
import {PersonalTicket} from '~/types/personal';

interface Props {
  data: PersonalTicket;
  onPress: () => void;
  onMorePress: () => void;
}

const TicketCard = ({data, onPress, onMorePress}: Props) => {
  return (
    <S.Container onPress={onPress}>
      <S.CoverContainer>
        <Image
          source={{uri: data.poster}}
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        <S.ReasonBadge>
          <S.ReasonText>힐링</S.ReasonText>
        </S.ReasonBadge>
      </S.CoverContainer>

      <S.Content>
        <S.TopRow>
          <S.Title numberOfLines={1}>{data.exhName}</S.Title>

          <S.MoreButton onPress={onMorePress}>
            <MoreVertical size={16} color="#A2B6C5" />
          </S.MoreButton>
        </S.TopRow>

        <S.LocationRow>
          <MapPin size={12} color="#7EB5DF" />
          <S.Location numberOfLines={1}>{data.gallery}</S.Location>
        </S.LocationRow>

        <S.BottomRow>
          <S.DateRow>
            <Calendar size={12} color="#7EB5DF" />
            <S.Date>{data.visitDate}</S.Date>
          </S.DateRow>

          <S.CompletedBadge>
            <S.CompletedText>완성 🕊</S.CompletedText>
          </S.CompletedBadge>
        </S.BottomRow>
      </S.Content>
    </S.Container>
  );
};

export default TicketCard;
