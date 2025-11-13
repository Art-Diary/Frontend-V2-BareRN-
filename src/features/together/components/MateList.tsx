import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import MateNameTag from './MateNameTag';
import CreateMateModal from './modal/CreateMateModal';
import {MateInfoType} from '../util/mateInfoType';
import {useFetchMateList} from '~/api/mate/mate';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import {AddMyExhButtonIcon} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

const MateList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [openCreateMateModal, setOpenCreateMateModal] = useState(false);
  const {data: mateList, isLoading, isError} = useFetchMateList();

  useApiErrorToast(isError);

  const onPressMate = (item: MateInfoType) => {
    // 메이트 클릭
    navigation.navigate('MateExhList', {mateInfo: {...item}});
  };

  const onPressCreateMateModal = () => {
    setOpenCreateMateModal(prev => !prev);
  };

  return (
    <Container>
      {/* 전시메이트 리스트 */}
      <LoadingModal isLoading={isLoading} />
      <MateListView>
        <ContentText>전시메이트 목록</ContentText>
        <CustomTouchable onPress={onPressCreateMateModal}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
      </MateListView>
      <ScrollView>
        {mateList &&
          mateList.map((item: any, index: number) => {
            return (
              <CustomTouchable key={index} onPress={() => onPressMate(item)}>
                <UserInfoWrapper>
                  <MateNameTag isSelected={true}>
                    <UserInfo>
                      <ProfileWrapper>
                        <Profile
                          source={{
                            uri: `${item.profile ?? process.env.DEFAULT_IMAGE}`,
                          }}
                          resizeMode="cover"
                          alt={'이미지 읽기 실패'}
                        />
                      </ProfileWrapper>
                      <UserInfoColumn>
                        <NickName>{item.nickname}</NickName>
                        <Art>
                          {item.favoriteArt === '.' || !item.favoriteArt
                            ? '그외'
                            : item.favoriteArt}
                        </Art>
                      </UserInfoColumn>
                    </UserInfo>
                  </MateNameTag>
                </UserInfoWrapper>
              </CustomTouchable>
            );
          })}
      </ScrollView>
      {openCreateMateModal && (
        <CreateMateModal handleCloseModal={onPressCreateMateModal} />
      )}
    </Container>
  );
};

export default MateList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

const MateListView = styled.View`
  flex-direction: row;
  padding-left: ${responsive(13)}px;
  padding-right: ${responsive(13)}px;
  padding-bottom: ${responsive(15)}px;
  align-items: center;
  justify-content: space-between;
`;

const ContentText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const UserInfoWrapper = styled.View`
  padding-bottom: ${responsive(10)}px;
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: ${responsive(10)}px;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  border-color: ${MAIN_COLOR};
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(37)}px;
  height: ${responsive(37)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex-direction: column;
  gap: ${responsive(2.5)}px;
  justify-content: center;
`;

const NickName = styled.Text`
  font-size: ${responsive(17.5)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Art = styled.Text`
  font-size: ${responsive(13.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
