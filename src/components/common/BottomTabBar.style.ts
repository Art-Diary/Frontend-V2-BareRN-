import styled from 'styled-components/native';
import {Pressable, View, Text} from 'react-native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled(View)`
  height: ${responsive(54)}px;
  margin-bottom: ${responsive(42)}px;
  border-top-width: ${responsive(0.9)}px;
  border-top-color: #eef4f8;

  background-color: rgba(250, 253, 254, 0.95);

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TabButton = styled(Pressable)`
  flex: 1;

  align-items: center;
  justify-content: center;

  gap: ${responsive(1.9)}px;
`;

export const IconWrapper = styled(View)<{active: boolean}>`
  color: ${({active}: {active: boolean}) => (active ? '#7EB5DF' : '#A2B6C5')};
`;

export const Label = styled(Text)<{active: boolean}>`
  /* font-size: 10px;
  font-weight: 800; */

  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};

  color: ${({active}: {active: boolean}) => (active ? '#7EB5DF' : '#A2B6C5')};
`;
