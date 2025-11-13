import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import styled from 'styled-components/native';
import CustomTouchable from './CustomTouchable';
import {RootStackNavigationProp} from '~/App';
import {BackButtonIcon} from './icon';
import responsive from './util/responsiveSize';
import {BORDER_COLOR, DARK_GREY} from './util/colors';
import {BACK_FONT_SIZE, DASH_WIDTH, FONT_NAME} from './util/style';

interface BackProps {
  title?: string;
  line: boolean;
  children?: ReactNode;
}

const WithBackFrame: React.FC<BackProps> = ({title, line, children}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePressBack = useCallback(() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return true; // 이벤트 소비(기본 뒤로가기 막음)
    }
    return false; // 기본 동작 허용(앱 종료 등)
  }, [navigation]);

  useEffect(() => {
    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      handlePressBack,
    );
    return () => sub.remove();
  }, [handlePressBack]);

  return (
    <Container line={line}>
      <LeftSection>
        <CustomTouchable onPress={handlePressBack}>
          <BackButtonIcon />
        </CustomTouchable>
        <Title>{title}</Title>
      </LeftSection>
      {children}
    </Container>
  );
};

export default WithBackFrame;

/** style */
interface ContainerProps {
  line: boolean;
}

const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between; /* 양 끝으로 버튼 배치 */
  align-items: center;
  padding-top: ${responsive(10)}px;
  padding-bottom: ${responsive(9)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
  width: 100%;
  border-style: ${(props: ContainerProps) => (props.line ? `dashed` : `none`)};
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${(props: ContainerProps) =>
    props.line ? `${DASH_WIDTH}` : `0`}px;
`;

const Title = styled.Text`
  font-size: ${BACK_FONT_SIZE}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${responsive(8)}px;
`;
