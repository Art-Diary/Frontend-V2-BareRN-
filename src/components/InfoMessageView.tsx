import React from 'react';
import styled from 'styled-components/native';
import {AREA_FONT_SIZE, FONT_NAME} from './util/style';
import {BACK_COLOR, MIDDLE_GREY} from './util/colors';
import responsive from './util/responsiveSize';

interface InfoMessageProps {
  message: string;
}

const InfoMessageView: React.FC<InfoMessageProps> = ({message}) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default InfoMessageView;

/** style */
const Container = styled.View`
  flex: 1;
  padding-top: ${responsive(20)}px;
  align-items: center;
  background-color: ${BACK_COLOR};
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
