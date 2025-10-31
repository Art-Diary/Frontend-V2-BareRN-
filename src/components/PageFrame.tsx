import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {BACK_COLOR} from './util/colors';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import responsive from './util/responsiveSize';

interface Props {
  children?: ReactNode;
}

const PageFrame: React.FC<Props> = ({children}) => {
  const insets = useSafeAreaInsets();
  const {height: screenHeight} = Dimensions.get('window');
  // 화면의 총 길이에서 하단 안전 영역 크기만큼 빼줌
  const availableHeight = screenHeight - insets.bottom;
  return (
    // <SafeAreaView style={{height: availableHeight}}>
    <Container>{children}</Container>
    // </SafeAreaView>
  );
};

export default PageFrame;

/** style */
const Container = styled.View`
  flex: 1;
  padding-top: ${responsive(23)};
  background-color: ${BACK_COLOR};
  overflow: hidden;
`;
