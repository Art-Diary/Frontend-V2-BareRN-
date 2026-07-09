import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {FONT_NAME, HEADER_FONT_SIZE} from '../util/style';
import responsive from '../util/responsiveSize';
import {MAIN_COLOR} from '../util/colors';

interface HeaderProps {
  title: string;
  children?: ReactNode;
  needColor?: boolean;
  subTitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  children,
  needColor,
  subTitle,
}) => {
  return (
    <Conatiner>
      <Main>
        <Title needColor={needColor}>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Main>
      {children}
    </Conatiner>
  );
};

export default Header;

/** style */
const Conatiner = styled.View`
  flex-direction: row;
  padding: ${responsive(13)}px ${responsive(20)}px;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.View`
  flex-direction: column;
  gap: ${responsive(5)}px;
`;

interface TitleProps {
  needColor: boolean;
}

const Title = styled.Text<TitleProps>`
  font-size: ${HEADER_FONT_SIZE}px;
  color: ${(props: TitleProps) =>
    props.needColor ? `${MAIN_COLOR}` : `${MAIN_COLOR}`};
  font-family: ${FONT_NAME};
`;

const SubTitle = styled.Text<TitleProps>`
  font-size: ${responsive(13)}px;
  color: #8ba1b0;
  font-family: ${FONT_NAME};
`;
