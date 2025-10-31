import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR, MIDDLE_GREY} from '../util/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../util/style';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import CustomTouchable from '../CustomTouchable';
import responsive from '../util/responsiveSize';

interface ErrorModalProps {
  isError: boolean;
  retry: () => void;
  isLogin?: boolean;
}

const ErrorModal: React.FC<ErrorModalProps> = ({isError, retry, isLogin}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isError) {
      setError(isError);
    }
  }, [isError]);

  const onPressBack = () => {
    if (!isLogin) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
    setError(false);
  };

  return (
    <Modal visible={isError && error} animationType="fade" transparent={true}>
      <Container>
        <Content>
          <MsgWrapper>
            <Message>다시 시도해주세요.</Message>
            <MessageSub>
              문제가 반복된다면 앱 종료 후 {'\n'}다시 시도해주세요,
            </MessageSub>
          </MsgWrapper>
          <ButtonSection>
            <ButtonDetailSection>
              <CustomTouchable onPress={onPressBack}>
                <ButtonText>닫기</ButtonText>
              </CustomTouchable>
            </ButtonDetailSection>
            <ButtonDetailSection>
              <CustomTouchable onPress={retry}>
                <ButtonText isMain>재시도</ButtonText>
              </CustomTouchable>
            </ButtonDetailSection>
          </ButtonSection>
        </Content>
      </Container>
    </Modal>
  );
};

export default ErrorModal;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.View`
  background-color: white;
  border-radius: ${responsive(4.5)}px;
  width: ${responsive(80)}px;
  height: ${responsive(27)}px;
  padding-top: ${responsive(2)}px;
  padding-bottom: ${responsive(2.5)}px;
  padding-left: ${responsive(5)}px;
  padding-right: ${responsive(5)}px;
  justify-content: space-between;
`;

const MsgWrapper = styled.View`
  flex: 1px;
  flex-direction: column;
  width: 100%;
  padding-top: ${responsive(3.5)}px;
  padding-left: ${responsive(3)}px;
  gap: ${responsive(2)}px;
`;

const Message = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${responsive(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

interface ButtonTextProps {
  isMain: string;
}

const ButtonText = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonTextProps) =>
    props.isMain ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

const ButtonSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonDetailSection = styled.View`
  width: 49%;
`;
