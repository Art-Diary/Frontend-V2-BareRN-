import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useSeparateSocialLogin, useUniteSocialLogin} from '~/api/auth/login';
import CustomTouchable from '~/components/CustomTouchable';
import DecisionModal from '~/components/modal/DecisionModal';
import LoadingModal from '~/components/modal/LoadingModal';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';
import {useUserActions} from '~/zustand/userInfo';
import {LoginUserType} from '../util/loginType';

interface EmailDuplicateModalProps {
  handleCloseModal: () => void;
  loginUserInfo: LoginUserType;
}

const EmailDuplicateModal: React.FC<EmailDuplicateModalProps> = ({
  handleCloseModal,
  loginUserInfo,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateUserInfo} = useUserActions();
  const {
    mutate: uniteSocialLogin,
    isPending: unitePending,
    isError: uniteError,
    isSuccess: uniteSuccess,
    data: uniteData,
  } = useUniteSocialLogin();
  const {
    mutate: separateSocialLogin,
    isPending: separatePending,
    isError: separateError,
    isSuccess: separateSuccess,
    data: separateData,
  } = useSeparateSocialLogin();

  useEffect(() => {
    if (uniteError) {
      showToast('다시 시도해주세요.');
    }
    if (uniteSuccess) {
      updateUserInfo({...uniteData});
      handleCloseModal();
      navigation.navigate('Main', {screen: 'Diary'});
    }
  }, [uniteError, uniteSuccess]);

  useEffect(() => {
    if (separateError) {
      showToast('다시 시도해주세요.');
    }
    if (separateSuccess) {
      updateUserInfo({...separateData});
      handleCloseModal();
      navigation.navigate('Main', {screen: 'Diary'});
    }
  }, [separateError, separateSuccess]);

  const socialLogin = (isUnite: boolean) => {
    if (isUnite) {
      uniteSocialLogin(loginUserInfo);
    } else {
      separateSocialLogin(loginUserInfo);
    }
  };

  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={unitePending || separatePending} />
      <Contents>
        <MsgWrapper>
          <Message isMainMsg>
            해당 이메일 주소로 {'\n'}이미 등록된 계정이 있습니다.
          </Message>
          <Message>
            통합을 원하시면 <HighlightMain>통합</HighlightMain>을,{'\n'}새
            계정을 원하시면 <HighlightSub>분리</HighlightSub>를 눌러주세요.
          </Message>
        </MsgWrapper>
        <TouchView>
          <ButtonDetailSection>
            <CustomTouchable onPress={() => socialLogin(false)}>
              <ButtonView>분리</ButtonView>
            </CustomTouchable>
          </ButtonDetailSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={() => socialLogin(true)}>
              <ButtonView mainButton>통합</ButtonView>
            </CustomTouchable>
          </ButtonDetailSection>
        </TouchView>
      </Contents>
    </DecisionModal>
  );
};

export default EmailDuplicateModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${responsive(30)}px;
  padding-bottom: ${responsive(30)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
`;

const MsgWrapper = styled.View`
  flex: 1px;
  width: 100%;
  flex-direction: column;
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
  gap: ${responsive(10)}px;
`;

interface MessageProps {
  color: string;
  isMainMsg: boolean;
}

const Message = styled.Text<MessageProps>`
  font-size: ${(props: MessageProps) =>
    props.isMainMsg ? `${responsive(18)}px` : `${responsive(17)}px`};
  color: ${(props: MessageProps) =>
    props.isMainMsg ? `${DARK_GREY}` : `${MIDDLE_GREY}`};
  font-family: ${FONT_NAME};
`;

const HighlightMain = styled.Text`
  color: ${MAIN_COLOR};
`;

const HighlightSub = styled.Text`
  color: ${DARK_GREY};
`;

const TouchView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${responsive(5)}px;
`;

const ButtonDetailSection = styled.View`
  width: 49%;
`;

interface ButtonViewProps {
  mainButton: boolean;
}

const ButtonView = styled.Text<ButtonViewProps>`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonViewProps) =>
    props.mainButton ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;
