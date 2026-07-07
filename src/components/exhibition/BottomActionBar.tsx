import React from 'react';
import {Heart} from 'lucide-react-native';

import * as S from './BottomActionBar.styles';

interface Props {
  liked: boolean;
  visited: boolean;
  onLike: () => void;
  onImport: () => void;
}

export default function BottomActionBar({
  liked,
  visited,
  onLike,
  onImport,
}: Props) {
  return (
    <S.Container>
      <S.LikeButton
        liked={liked}
        onPress={onLike}
        style={({pressed}: {pressed: Boolean}) => ({
          opacity: pressed ? 0.85 : 1,
        })}>
        <Heart
          size={20}
          color={liked ? '#F87171' : '#8BA1B0'}
          fill={liked ? '#F87171' : 'none'}
        />
      </S.LikeButton>

      <S.ImportButton
        visited={visited}
        onPress={onImport}
        disabled={visited}
        style={({pressed}: {pressed: Boolean}) => ({
          opacity: pressed ? 0.85 : 1,
        })}>
        <S.ImportText>
          {visited
            ? '티켓북에 쏙 담았어요'
            : '이 전시 내 티켓북으로 쏙 가져오기 🎫'}
        </S.ImportText>
      </S.ImportButton>
    </S.Container>
  );
}
