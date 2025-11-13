import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import styled from 'styled-components/native';
import {useUpdateUserInfo} from '~/api/auth/userInfo';
import BodyFrame from '~/components/BodyFrame';
import PageFrame from '~/components/PageFrame';
import WithBackFrame from '~/components/WithBackFrame';
import CustomTouchable from '~/components/CustomTouchable';
import {GoogleLogoIcon, KakaoLogoIcon, NaverLogoIcon} from '~/components/icon';
import LoadingModal from '~/components/modal/LoadingModal';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';
import EditArtCategory from '~/features/setting/components/EditArtCategory';
import EditNickname from '~/features/setting/components/EditNickname';
import ImageInputForm from '~/features/setting/components/ImageInputForm';
import {changeImageSize} from '~/features/setting/util/resizeImage';
import {useUserInfo} from '~/zustand/userInfo';

const EditProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();
  const [nicknameKeyword, setNicknameKeyword] = useState<string>(
    userInfo.nickname ?? '',
  );
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [imageUri, setImageUri] = useState<string | undefined>(
    userInfo.profile,
  );
  const [art, setArt] = useState<string>(userInfo.artField ?? '');

  const {
    mutate: updateUserInfo,
    isPending,
    isError,
    isSuccess,
  } = useUpdateUserInfo();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해 주세요.');
    }
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  const onPressCompleteButton = async () => {
    if (!isVerified) {
      showToast('닉네임 중복 확인해 주세요.');
      return;
    }
    // nickname
    if (checkBlankInKeyword(nicknameKeyword)) {
      showToast('닉네임을 작성해주세요.');
      return;
    }
    // art field
    if (checkBlankInKeyword(art)) {
      showToast('관심 전시 분야를 선택해 주세요.');
      return;
    }
    const formData = new FormData();

    formData.append('nickname', nicknameKeyword);
    formData.append('favoriteArt', art);

    if (imageUri) {
      let blob;
      if (imageUri.indexOf('file:///') !== -1) {
        const resultResizedImage = await changeImageSize(imageUri);
        blob = new Blob([JSON.stringify(resultResizedImage)]);
      } else {
        blob = new Blob([
          JSON.stringify({
            name: imageUri,
            type: 'image/JPEG',
            uri: imageUri,
          }),
        ]);
      }
      formData.append('profile', blob);
    }
    updateUserInfo(formData);
  };

  return (
    <PageFrame>
      <WithBackFrame title="" line={true} />
      <LoadingModal isLoading={isPending} />

      {/* body */}
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={{flex: 1}}>
          <BodyFrame>
            <Wrapper>
              {/* 프로필 */}
              <ImageInputForm image={imageUri} handleImage={setImageUri} />
              {/* 닉네임 */}
              <EditNickname
                getNickname={nicknameKeyword}
                setNickname={setNicknameKeyword}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
              />
              {/* 좋아하는 전시 분야 */}
              <EditArtCategory
                title={'좋아하는 전시 분야'}
                getValue={art}
                setValue={setArt}
              />
              {/* 이메일 */}
              <ContentColumn>
                <SectionName>이메일</SectionName>
                <BoxView>
                  {userInfo.providerType === 'naver' ? (
                    <NaverLogoIcon customHeight={2.6} />
                  ) : userInfo.providerType === 'gmail' ||
                    userInfo.providerType === 'google' ? (
                    <GoogleLogoIcon customHeight={2.6} />
                  ) : userInfo.providerType === 'kakao' ? (
                    <KakaoLogoIcon customHeight={2.6} />
                  ) : (
                    <></>
                  )}
                  <EmailText>{userInfo.email}</EmailText>
                </BoxView>
              </ContentColumn>
            </Wrapper>
            {/* 완료 버튼 */}
            <CustomTouchable onPress={onPressCompleteButton}>
              <CompleteButton>완료</CompleteButton>
            </CustomTouchable>
          </BodyFrame>
        </KeyboardAvoidingView>
      </View>
    </PageFrame>
  );
};

export default EditProfileScreen;

/** style */
const Wrapper = styled.View`
  flex: 1;
  gap: ${responsive(10)}px;
  padding-top: ${responsive(13)}px;
`;

const ContentColumn = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${responsive(8)}px;
`;

const SectionName = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const BoxView = styled.View`
  border-radius: ${responsive(15)}px;
  flex-direction: row;
  background-color: ${LIGHT_GREY};
  padding: ${responsive(15)}px;
  gap: ${responsive(1.5)}px;
  align-items: center;
`;

const EmailText = styled.Text`
  font-size: ${responsive(17)}px;
  color: white;
  font-family: ${FONT_NAME};
  text-align: center;
`;

const CompleteButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
