import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {GreyTagIcon, MateTagIcon} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';

interface TagProps {
  isSelected?: boolean;
  isForSearChNewMate?: boolean;
  children: ReactNode;
}

const MateNameTag: React.FC<TagProps> = ({
  isSelected,
  isForSearChNewMate,
  children,
}) => {
  const customHeight = isForSearChNewMate ? 46 : 48.2;
  return (
    <Container>
      {isSelected ? (
        <MateTagIcon customHeight={customHeight} />
      ) : (
        <GreyTagIcon />
      )}
      <WordContainer>
        <Wrapper>{children}</Wrapper>
      </WordContainer>
    </Container>
  );
};

export default MateNameTag;

const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-left: ${responsive(23)}px;
  flex-direction: row;
  align-items: center;
`;
