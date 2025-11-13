import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Alert, Linking} from 'react-native';
// import VersionCheck from 'react-native-version-check';
import {RootStackNavigationProp} from '~/App';
// import messaging from '@react-native-firebase/messaging';
import {getApp, initializeApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
} from '@react-native-firebase/messaging';
import {useFetchEvaluationInfo} from '~/api/solo-note/evaluation';
import {useEvaluationActions} from '~/zustand/evaluationInfo';
import {useLoginTest, useLoginUser, useUpdateFcmToken} from '~/api/auth/login';
import {useUserActions} from '~/zustand/userInfo';
import {showToast} from '~/components/util/showToast';
import LoadingModal from '~/components/modal/LoadingModal';
import {GoogleLogoIcon, KakaoLogoIcon, LogoIcon} from '~/components/icon';
import NameTag from '~/components/NameTag';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {handleGoogleLogin} from '~/features/login/util/googleLogin';
import {handleKakaoLogin} from '~/features/login/util/kakaoLogin';
import messaging from '@react-native-firebase/messaging';
import EmailDuplicateModal from '~/features/login/components/EmailDuplicateModal';
import {LoginUserType} from '~/features/login/util/loginType';
import {useFetchQuestionList} from '~/api/question/question';
import {useQuestionActions} from '~/zustand/questionInfo';

/**
 * 1. [TODO] 알림 허용 여부 받기
 * 2. 로그인하기
 * 3. 로그인 유지
 * 4. 처음 로그인 시 바로 로그인이 안되는 문제
  // TODO [AxiosError: Network Error]
[TODO] 버전 확인
 */

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [state, setState] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isDuplicateModalOpen, setDuplicateModalOpen] =
    useState<boolean>(false);
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserType | null>(
    null,
  );
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    data: evaluationInfo,
    isLoading,
    isError,
  } = useFetchEvaluationInfo(state);
  const {
    data: questionInfo,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useFetchQuestionList(state);
  const {updateEvaluationInfo} = useEvaluationActions();
  const {updateQuestionInfo} = useQuestionActions();
  const {updateUserInfo} = useUserActions();
  // const {updateEmail, updateProviderType, updateProviderId} = useUserLoginActions();
  // Hooks
  const {
    mutate: testerLogin,
    isSuccess: isSuccessTest,
    data,
    isPending,
  } = useLoginTest(); // TODO 삭제
  const {
    mutate: userLogin,
    isSuccess: isSuccessLogin,
    data: loginData,
    isPending: isLoginPending,
    isError: isLoginError,
    error,
  } = useLoginUser();
  const {
    mutate: updateFcmToken,
    isPending: isFcmPending,
    isError: isFcmError,
    isSuccess: isFcmSuccess,
  } = useUpdateFcmToken();

  useEffect(() => {
    if (
      evaluationInfo &&
      evaluationInfo.length > 0 &&
      questionInfo &&
      questionInfo.length > 0
    ) {
      updateEvaluationInfo(evaluationInfo);
      updateQuestionInfo(questionInfo);
      setIsLoadingOpen(false);
      navigation.navigate('Main', {screen: 'Diary'});
    }
  }, [evaluationInfo, questionInfo]);

  useEffect(() => {
    if (isSuccessLogin) {
      const settingUserInfo = async () => {
        console.log('user:', loginData);
        await AsyncStorage.setItem('@user', JSON.stringify(loginData));
        updateUserInfo({...loginData});
        // [TODO] noti 설정 리스트 zustand에 넣어놓기
        setState(true);
      };
      settingUserInfo();
    }
    if (isLoginError) {
      const errorMsg = error.message;

      if (errorMsg.includes('409')) {
        setDuplicateModalOpen(true);
      } else {
        showToast('다시 시도해 주세요.');
      }
      setIsLoadingOpen(false);
    }
  }, [isSuccessLogin, isLoginError]);

  // fcm 토큰 가져오기
  const handleFcmToken = async () => {
    try {
      const newFcmToken = await messaging().getToken();
      setPushToken(newFcmToken);
      return newFcmToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 구글 로그인
  const handleSignInGoogleLogin = async () => {
    setIsLoadingOpen(true);
    const googleInfo = await handleGoogleLogin();

    if (googleInfo) {
      // fcm token
      const fcmToken = await handleFcmToken();
      const requestInfo = {...googleInfo, alarmToken: fcmToken ?? undefined};

      setLoginUserInfo(requestInfo);
      // 로그인 요청
      userLogin(requestInfo);
    }
  };

  // kakao 로그인
  const handleSignInKakaLogin = async () => {
    setIsLoadingOpen(true);
    const kakaoInfo = await handleKakaoLogin();

    if (kakaoInfo) {
      // fcm token
      const fcmToken = await handleFcmToken();
      const requestInfo = {...kakaoInfo, alarmToken: fcmToken ?? undefined};

      setLoginUserInfo(requestInfo);
      // 로그인 요청
      userLogin(requestInfo);
    }
  };

  // 로그인 했는지 확인
  const handleCheckLogin = async () => {
    const user = await AsyncStorage.getItem('@user');
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (user && accessToken) {
      updateUserInfo(JSON.parse(user));
      setState(true);
      // fcmToken 변경 확인
      const fcmToken = await handleFcmToken();
      if (fcmToken !== pushToken) {
        setPushToken(fcmToken);
        // 새로 업데이터 api 요청
        if (fcmToken) updateFcmToken(fcmToken);
      }
    }
  };

  useEffect(() => {
    // on loading
    setIsLoadingOpen(true);
    handleCheckLogin();
    setIsLoadingOpen(false);
  }, []);

  // // TODO 삭제
  // useEffect(() => {
  //   if (isSuccessTest) {
  //     console.log('user:', data);
  //     updateUserInfo({...data});
  //     setState(true);
  //   }
  // }, [isSuccessTest]);

  // // TODO 삭제
  // const handleTester = async () => {
  //   testerLogin(32);
  // };

  return (
    <Container>
      <LoadingModal
        isLoading={isPending || isLoginPending || isFcmPending || isLoadingOpen}
      />
      <Contents>
        <ArtDiaryMainWrapper>
          <LogoIcon />
          <ArtDiary>Art Diary</ArtDiary>
        </ArtDiaryMainWrapper>
        <LoginWrapper>
          <NameTag
            login={true}
            content="Google 로그인"
            handleTouch={handleSignInGoogleLogin}>
            <GoogleLogoIcon />
          </NameTag>
          <NameTag
            login={true}
            content="Kakao 로그인"
            handleTouch={handleSignInKakaLogin}>
            <KakaoLogoIcon />
          </NameTag>
          {/* TODO 삭제 */}
          {/* <CustomTouchable onPress={handleTester}>
            <Tester>테스터 3</Tester>
          </CustomTouchable> */}
        </LoginWrapper>
      </Contents>
      {isDuplicateModalOpen && loginUserInfo && (
        <EmailDuplicateModal
          handleCloseModal={() => setDuplicateModalOpen(false)}
          loginUserInfo={loginUserInfo}
        />
      )}
    </Container>
  );
};

export default LoginScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #d4ebf8;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArtDiaryMainWrapper = styled.View`
  height: 50%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${responsive(10)}px;
`;

const ArtDiary = styled.Text`
  font-size: ${responsive(40)}px;
  color: #0a3981;
  font-family: ${FONT_NAME};
  text-align: center;
`;

const LoginWrapper = styled.View`
  height: 30%;
  align-items: center;
  padding-left: ${responsive(3)}px;
  padding-bottom: ${responsive(40)}px;
  width: 100%;
  gap: ${responsive(7)}px;
  justify-content: flex-end;
`;

const Tester = styled.Text`
  margin: 5px;
  font-size: ${responsive(17)}px;
  color: white;
  font-family: ${FONT_NAME};
  text-decoration: underline;
`;
