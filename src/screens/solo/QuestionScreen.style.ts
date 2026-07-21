import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';

export const Content = styled.View`
  flex: 1;

  justify-content: space-between;
  padding: ${responsive(48)}px ${responsive(17.5)}px;
  padding-top: ${responsive(14)}px;
`;
