import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import responsive from './util/responsiveSize';
import {DARK_GREY, MAIN_COLOR} from './util/colors';
import {FONT_NAME} from './util/style';

interface CenterQuestionProps {
  question: string;
  children?: ReactNode;
}

const CenterQuestion: React.FC<CenterQuestionProps> = ({
  question,
  children,
}) => {
  return (
    <Container>
      <QuestionWrapper>
        <Mascot />
        <QuestionText>{question}</QuestionText>
      </QuestionWrapper>
      {children}
    </Container>
  );
};

export default CenterQuestion;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${responsive(5)}px;
  align-items: center;
  margin-top: ${responsive(25)}px;
`;

const QuestionWrapper = styled.View`
  flex-direction: column;
  gap: ${responsive(20)}px;
  align-items: center;
`;

const Mascot = styled.Image`
  width: ${responsive(73)}px;
  height: ${responsive(73)}px;
  background-color: ${MAIN_COLOR};
  border-radius: 50px;
`;

const QuestionText = styled.Text`
  font-size: ${responsive(22)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;
