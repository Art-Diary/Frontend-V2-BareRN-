import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.View`
  margin-top: ${responsive(22)}px;

  gap: ${responsive(5)}px;
`;

export const PrimaryButton = styled.Pressable`
  width: 100%;

  padding: ${responsive(14)}px 0px;

  align-items: center;
  justify-content: center;

  border-radius: ${responsive(999)}px;

  background-color: #7eb5df;
`;

export const PrimaryText = styled.Text`
  color: white;

  /* font-size: 14px;

  font-weight: 800; */

  font-size: ${responsive(14.5)}px;
  font-family: ${FONT_NAME};
`;

export const SkipButton = styled.Pressable`
  padding: ${responsive(6)}px 0px;

  align-items: center;
`;

export const SkipText = styled.Text`
  color: #8ba1b0;

  /* font-size: 12px;

  font-weight: 700; */

  font-size: ${responsive(13.5)}px;
  font-family: ${FONT_NAME};
`;
