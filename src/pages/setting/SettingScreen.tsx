// import {checkNotification} from '@/features/setting/util/checkNotification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {RootStackNavigationProp} from '~/App';
import React from 'react';
import {Linking, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Header from '~/components/Header';
import NameTag from '~/components/NameTag';
import PageFrame from '~/components/PageFrame';
import {DARK_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import {FONT_NAME} from '~/components/util/style';
import ProfileNameTag from '~/features/setting/components/ProfileNameTag';

export default function SettingScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.setItem('initInfo', 'false');
    queryClient.clear();
    // TODO 나중에 로그아웃 구체적으로 하기 + 푸시 알림도 변경
    showToast('로그아웃 되었습니다.');
    // 로그인 페이지로 이동
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const onPressLikeListButton = () => {
    navigation.navigate('LikeList');
  };

  const onPressSettingNotiButton = async () => {
    // const resultCheck = await checkNotification();
    // if (resultCheck) {
    navigation.navigate('SettingNoti');
    // } else {
    //   Linking.openSettings().catch(() => {
    //     showToast('설정으로 이동할 수 없습니다.');
    //   });
    // }
  };

  return (
    <PageFrame>
      {/* header */}
      <Header title={'설정'} />

      {/* body */}
      <ScrollView>
        <Contents>
          {/* 내 프로필 */}
          <SettingWrapper>
            <TitleText>내 프로필</TitleText>
            <ProfileNameTag />
          </SettingWrapper>
          {/* 설정 */}
          <SettingWrapper>
            <TitleText>설정</TitleText>
            <NameTag
              content="좋아요 전시회 목록"
              handleTouch={onPressLikeListButton}
            />
            <NameTag
              content="푸시 알림 설정"
              handleTouch={onPressSettingNotiButton}
            />
            {/* <NameTag
              content='Q&A'
              handleTouch={() => navigation.navigate('QnaList', {isAdmin: false})}
            /> */}
            {/* {userInfo.authInfo.role === 'ADMIN' && (
              <NameTag
                content="Q&A (관리자)"
                handleTouch={() =>
                  navigation.navigate('QnaList', {isAdmin: true})
                }
              />
            )} */}
            {/* [TODO] */}
            {/* <NameTag
              content='전시회 등록 확인'
              // handleTouch={() =>
              //   navigation.navigate('RegExhList', {isAdmin: false})
              // }
            />
            {userInfo.authInfo.role === 'ADMIN' && (
              <NameTag
                content="전시회 등록 확인 (관리자)"
                handleTouch={() =>
                  navigation.navigate('RegExhList', {isAdmin: true})
                }
              />
            )} */}
          </SettingWrapper>
          {/* 회원정보 */}
          <SettingWrapper>
            <TitleText>회원정보</TitleText>
            <NameTag content="로그아웃" handleTouch={handleLogout} />
            {/* [TODO] */}
            {/* <GreyNameTag
              content="탈퇴"
              handleTouch={() => handleMoveTo('LeaveArtDiary')}
            /> */}
          </SettingWrapper>
        </Contents>
      </ScrollView>
    </PageFrame>
  );
}

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${responsive(13)}px;
  padding-top: ${responsive(5)}px;
  gap: ${responsive(30)}px;
  /* border: 1px; */
`;

const SettingWrapper = styled.View`
  gap: ${responsive(10)}px;
  /* justify-content: start; */
`;

const TitleText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;
