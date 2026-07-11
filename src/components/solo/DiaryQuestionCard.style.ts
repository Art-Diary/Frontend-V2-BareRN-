import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.View`
  margin: 0 ${responsive(17.5)}px ${responsive(15.5)}px;

  padding: ${responsive(15.8)}px;

  background-color: #ffffff;

  border-radius: ${responsive(17)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
`;

export const Title = styled.Text`
  margin-bottom: ${responsive(10.5)}px;

  /* font-size: 13px;
  font-weight: 700; */

  font-size: ${responsive(14.5)}px;
  font-family: ${FONT_NAME};

  color: #6d8596;
`;

export const Answer = styled.Text`
  /* font-size: 15px; */
  font-size: ${responsive(16.5)}px;
  font-family: ${FONT_NAME};

  line-height: ${responsive(21)}px;

  color: #3e4f5c;
`;
