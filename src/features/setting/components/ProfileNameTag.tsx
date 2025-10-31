import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import React from 'react';
import styled from 'styled-components/native';
import CustomTouchable from '~/components/CustomTouchable';
import {PencilUpdateNoUnderbarIcon, ProfileTagIcon} from '~/components/icon';
import {DARK_GREY, MIDDLE_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {useUserInfo} from '~/zustand/userInfo';

const ProfileNameTag = () => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useUserInfo();

  const onPressEditButton = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <Container>
      <ProfileTagIcon />

      <WordContainer>
        <Wrapper>
          <ProfileWrapper>
            <Profile
              source={{
                uri: `${userInfo.profile ?? process.env.DEFAULT_IMAGE}`,
              }}
              resizeMode="cover"
              alt={'이미지'}
            />
          </ProfileWrapper>
          <UserInfoColumn>
            <UserInfoRow>
              <NickName>{userInfo.nickname ?? '홍길동'}</NickName>
              <ArtWrapper>
                <Art>{userInfo.artField ?? '좋아하는 전시 분야'}</Art>
              </ArtWrapper>
            </UserInfoRow>
            <Email>{userInfo.email ?? '이메일'}</Email>
          </UserInfoColumn>
          <CustomTouchable onPress={onPressEditButton}>
            <PencilUpdateNoUnderbarIcon customHeight={15} />
          </CustomTouchable>
        </Wrapper>
      </WordContainer>
    </Container>
  );
};

export default ProfileNameTag;

/** style */
const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-left: ${responsive(23)}px;
  padding-right: ${responsive(38)}px;
  flex-direction: row;
  align-items: center;
  gap: ${responsive(10)}px;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(39)}px;
  height: ${responsive(39)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
  gap: ${responsive(1.5)}px;
  justify-content: center;
`;

const UserInfoRow = styled.View`
  flex-direction: row;
  gap: ${responsive(5)}px;
`;

const NickName = styled.Text`
  font-size: ${responsive(17.5)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const ArtWrapper = styled.View`
  justify-content: flex-end;
`;

const Art = styled.Text`
  font-size: ${responsive(12)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const Email = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-decoration-line: underline;
`;
