import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: white;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(16)}px;

  padding: ${responsive(12.2)}px ${responsive(14)}px;

  margin-bottom: ${responsive(8.5)}px;
`;

export const Content = styled.View`
  flex: 1;
  margin-right: ${responsive(10.5)}px;
`;

export const Title = styled.Text`
  /* font-size: 15px;
  font-weight: 700; */
  font-size: ${responsive(16)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const SubTitle = styled.Text`
  margin-top: ${responsive(3.5)}px;

  /* font-size: 11px; */
  font-size: ${responsive(12)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const ActionBadge = styled.View`
  padding: ${responsive(5.3)}px ${responsive(10.5)}px;

  border-radius: ${responsive(999)}px;

  background: #7eb5df;
`;

export const ActionText = styled.Text`
  /* font-size: 10px;
  font-weight: 800; */
  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};
  color: white;
`;
