import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const ButtonRow = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${responsive(3)}px;
`;

export const JoinButton = styled.Pressable`
  padding: ${responsive(8)}px ${responsive(11)}px;
  border-radius: ${responsive(12)}px;
  border-width: ${responsive(0.9)}px;
  border-color: #d1e1ec;
`;

export const JoinText = styled.Text`
  color: #5188b3;
  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(12)}px;
  font-family: ${FONT_NAME};
`;

export const CreateButton = styled.Pressable`
  width: ${responsive(38)}px;
  height: ${responsive(38)}px;
  border-radius: ${responsive(999)}px;
  background: #7eb5df;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

export const SectionTitle = styled.Text`
  margin: 0 ${responsive(22)}px;
  margin-bottom: ${responsive(14)}px;

  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};

  color: #6d8596;
`;
