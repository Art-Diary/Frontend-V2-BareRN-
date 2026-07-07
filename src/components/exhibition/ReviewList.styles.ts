import styled from 'styled-components/native';
import {FONT_NAME} from '../util/style';
import responsive from '../util/responsiveSize';

export const Container = styled.View`
  background-color: white;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(16)}px;

  padding: ${responsive(12.3)}px;

  margin-bottom: ${responsive(9)}px;
`;

export const ReviewText = styled.Text`
  /* font-size: 14px; */

  line-height: ${responsive(19.3)}px;

  font-size: ${responsive(15.5)}px;
  font-family: ${FONT_NAME};

  color: #3d4f5c;
`;
