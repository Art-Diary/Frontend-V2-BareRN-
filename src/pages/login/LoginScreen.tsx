import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useLoginUser} from '~/api/auth/login';
import LoadingModal from '~/components/modal/LoadingModal';
import {GoogleLogoIcon, KakaoLogoIcon, LogoIcon} from '~/components/icon';
import NameTag from '~/components/NameTag';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {handleGoogleLogin} from '~/features/login/util/googleLogin';
import {handleKakaoLogin} from '~/features/login/util/kakaoLogin';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {notificationService} from '~/features/login/util/notificationService';

/**
 * 1. [TODO] 알림 허용 여부 받기
 * 2. [TODO] 버전 확인
 */

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    mutate: userLogin,
    isSuccess: isSuccessLogin,
    isPending: isLoginPending,
    isError: isLoginError,
  } = useLoginUser();

  useApiErrorToast(isLoginError);

  useEffect(() => {
    console.log('IN Login');
  }, []);

  useEffect(() => {
    if (isSuccessLogin) {
      navigation.navigate('Main', {screen: 'Diary'});
    }
  }, [isSuccessLogin, isLoginError]);

  // 구글 로그인
  const handleSignInGoogleLogin = async () => {
    const googleInfo = await handleGoogleLogin();

    if (!googleInfo) {
      return;
    }
    // fcm token
    const fcmToken = await notificationService.getToken();
    // 로그인 요청
    userLogin({...googleInfo, alarmToken: fcmToken ?? undefined});
  };

  // kakao 로그인
  const handleSignInKakaLogin = async () => {
    const kakaoInfo = await handleKakaoLogin();

    if (!kakaoInfo) {
      return;
    }
    // fcm token
    const fcmToken = await notificationService.getToken();
    // 로그인 요청
    userLogin({...kakaoInfo, alarmToken: fcmToken ?? undefined});
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoginPending} />
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
        </LoginWrapper>
      </Contents>
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
