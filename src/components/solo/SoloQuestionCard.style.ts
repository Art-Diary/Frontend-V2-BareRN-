import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.View`
  gap: ${responsive(6.8)}px;
`;

export const Tag = styled.Text<{
  color: string;
  background: string;
}>`
  align-self: flex-start;

  padding: ${responsive(4.3)}px ${responsive(10.5)}px;

  border-radius: ${responsive(999)}px;

  background-color: #e8f2fa;

  color: #5188b3;

  /* font-size: 12px;

  font-weight: 800; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
`;

export const Title = styled.Text`
  margin-top: ${responsive(6.8)}px;

  color: #3e4f5c;

  line-height: ${responsive(30)}px;

  /* font-size: 24px;

  font-weight: 800; */

  font-size: ${responsive(25)}px;
  font-family: ${FONT_NAME};
`;

export const Input = styled.TextInput`
  width: 100%;

  height: ${responsive(170)}px;

  margin-top: ${responsive(10.5)}px;

  padding: ${responsive(18)}px;

  background-color: white;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(22)}px;

  color: #3e4f5c;

  /* font-size: 15px; */
  font-size: ${responsive(15.5)}px;
  font-family: ${FONT_NAME};
`;
