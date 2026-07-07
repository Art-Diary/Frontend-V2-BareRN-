import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';
import {LIGHT_GREY} from '../util/colors';

interface LikeButtonProps {
  liked: boolean;
}

interface VisitButtonProps {
  visited: boolean;
}

export const Container = styled.View`
  position: absolute;

  left: 0;
  right: 0;
  bottom: ${responsive(31)}px;

  flex-direction: row;

  align-items: center;

  padding: ${responsive(14)}px ${responsive(17.5)}px;

  background-color: rgba(250, 253, 254, 0.95);

  border-top-width: ${responsive(0.9)}px;
  border-top-color: #eef4f8;
`;

export const LikeButton = styled.Pressable<LikeButtonProps>`
  width: ${responsive(49)}px;

  height: ${responsive(49)}px;

  margin-right: ${responsive(10.5)}px;

  border-radius: ${responsive(14)}px;

  align-items: center;

  justify-content: center;

  background-color: ${({liked}: {liked: boolean}) =>
    liked ? '#FEF2F2' : '#FFFFFF'};

  border-width: ${responsive(0.9)}px;

  border-color: ${({liked}: {liked: boolean}) =>
    liked ? '#FECACA' : '#E6EFF5'};
`;

export const ImportButton = styled.Pressable<VisitButtonProps>`
  flex: 1;

  height: ${responsive(49)}px;

  border-radius: ${responsive(14)}px;

  align-items: center;

  justify-content: center;

  background-color: ${({visited}: {visited: boolean}) =>
    visited ? LIGHT_GREY : '#7eb5df'};
`;

export const ImportText = styled.Text`
  color: white;

  /* font-size: 14px;

  font-weight: 800; */

  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
`;
