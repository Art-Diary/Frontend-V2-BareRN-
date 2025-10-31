import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {DASH_WIDTH, FONT_NAME, HEADER_FONT_SIZE} from './util/style';
import responsive from './util/responsiveSize';
import {BACK_COLOR, BORDER_COLOR, DARK_GREY, MAIN_COLOR} from './util/colors';

interface HeaderProps {
  title: string;
  children?: ReactNode;
  needColor?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, children, needColor}) => {
  return (
    <Container>
      <Title needColor={needColor}>{title}</Title>
      {children}
    </Container>
  );
};

export default Header;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between; /* 양 끝으로 버튼 배치 */
  align-items: center;
  padding: ${responsive(13)}px;
  width: 100%;
  /* border-style: dashed;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
  background-color: ${BACK_COLOR}; */
`;

interface TitleProps {
  needColor: boolean;
}

const Title = styled.Text<TitleProps>`
  font-size: ${HEADER_FONT_SIZE}px;
  color: ${DARK_GREY};
  color: ${(props: TitleProps) =>
    props.needColor ? `${MAIN_COLOR}` : `${DARK_GREY}`};
  font-family: ${FONT_NAME};
`;
