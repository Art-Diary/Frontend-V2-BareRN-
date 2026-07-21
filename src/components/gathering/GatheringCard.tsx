import React from 'react';

import * as S from './GatheringCard.style';
import {Gathering} from '~/types/gathering';
import {RootStackNavigationProp} from '~/App';
import {useNavigation} from '@react-navigation/native';
import {DEFAULT_IMAGE} from '@env';

interface Props {
  gathering: Gathering;
}

const GatheringCard = ({gathering}: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressGroup = () => {
    navigation.navigate('GatheringDetail', {gatheringId: gathering.id});
  };

  return (
    <S.GroupCard onPress={onPressGroup}>
      <S.GroupInfo>
        <S.GroupTitle numberOfLines={1}>{gathering.name}</S.GroupTitle>

        <S.BadgeRow>
          <S.BlueBadge>
            <S.BadgeText>👥 {gathering.memberList.length}명 참여</S.BadgeText>
          </S.BlueBadge>

          <S.BrownBadge>
            <S.BadgeText>🎫 {gathering.exhibitionCount}개의 발자국</S.BadgeText>
          </S.BrownBadge>
        </S.BadgeRow>
      </S.GroupInfo>

      <S.MemberContainer>
        {gathering.memberList.slice(0, 3).map((member, index) => (
          <S.MemberCircle key={index}>
            <S.MemberProfile
              source={{
                uri: member.profile ?? DEFAULT_IMAGE,
              }}
            />
          </S.MemberCircle>
        ))}
      </S.MemberContainer>
    </S.GroupCard>
  );
};

export default GatheringCard;
