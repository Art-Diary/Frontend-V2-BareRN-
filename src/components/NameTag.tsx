import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {FONT_NAME} from './util/style';
import {DARK_GREY} from './util/colors';
import responsive from './util/responsiveSize';
import {GreyTagIcon, LoginTagIcon} from './icon';

interface TagProps {
  content: string;
  children?: ReactNode;
  login?: boolean;
  handleTouch?: () => void;
}

const NameTag: React.FC<TagProps> = ({
  content,
  children,
  login,
  handleTouch,
}) => {
  var height = responsive(13.2);
  if (login) {
    height = responsive(14.3);
  }
  return (
    <Container>
      {login ? <LoginTagIcon /> : <GreyTagIcon customHeight={47.5} />}
      <WordContainer>
        <TouchView isLogin={login} activeOpacity={0.6} onPress={handleTouch}>
          {children}
          <TitleText>{content}</TitleText>
        </TouchView>
      </WordContainer>
    </Container>
  );
};

export default NameTag;

/** style */
const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

interface TouchViewProps {
  isLogin: boolean;
}

const TouchView = styled.TouchableOpacity<TouchViewProps>`
  flex: 1;
  padding-left: ${(props: TouchViewProps) =>
    props.isLogin ? `${responsive(70)}px` : `${responsive(33)}px`};
  flex-direction: row;
  align-items: center;
  gap: ${responsive(20)}px;
`;

const TitleText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;
