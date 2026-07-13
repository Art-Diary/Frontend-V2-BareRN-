import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {BORDER_COLOR, DARK_GREY} from '../util/colors';
import {DASH_WIDTH, FONT_NAME} from '../util/style';
import {ArrowLeft} from 'lucide-react-native';
import CustomTouchable from './CustomTouchable';
import responsive from '../util/responsiveSize';

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
      <CustomTouchable onPress={handlePressBack}>
        <ArrowLeft size={20} color="#8BA1B0" />
      </CustomTouchable>

      <TitleSection>
        <Title>{title}</Title>
      </TitleSection>
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
  align-items: center;
  padding: ${responsive(10)}px ${responsive(15)}px;
  width: 100%;
  border-style: ${(props: ContainerProps) => (props.line ? `dashed` : `none`)};
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${(props: ContainerProps) =>
    props.line ? `${DASH_WIDTH}` : `0`}px;
`;

const TitleSection = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;
