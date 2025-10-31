import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import responsive from './util/responsiveSize';

interface Props {
  children?: ReactNode;
}

const BodyFrame: React.FC<Props> = ({children}) => {
  return <Container>{children}</Container>;
};

export default BodyFrame;

/** style */
const Container = styled.View`
  flex: 1;
  padding: ${responsive(18)}px;
  padding-top: 0px;
  padding-bottom: ${responsive(41)}px;
  /* overflow: hidden; */
`;
