import {RouteProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {RootStackNavigationProp} from 'App';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchMateExhList} from '~/api/mate/mate';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import InfoMessageView from '~/components/InfoMessageView';
import Ticket from '~/components/Ticket';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

type MateExhListProp = RouteProp<RootStackParamList, 'MateExhList'>;

interface Props {
  route: MateExhListProp;
}

const MateExhListScreen: React.FC<Props> = ({route}) => {
  const {mateInfo} = route.params;
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  // API Hooks
  const {
    data: mateExhList,
    isLoading,
    isError,
  } = useFetchMateExhList(mateInfo.userId);

  useApiErrorToast(isError);

  // Handlers
  const onPress = (exhId: number) => {
    navigation.navigate('MateDiaryList', {mateInfo, exhId});
  };

  return (
    <PageFrame>
      {/* header */}
      <LoadingModal isLoading={isLoading} />
      <WithBackFrame
        title={
          mateInfo.nickname === ''
            ? '전시 메이트의 기록'
            : mateInfo.nickname + '의 기록'
        }
        line={true}
      />
      {/* body */}
      {/* 메이트 정보 */}
      <FlatList
        ListEmptyComponent={
          <InfoMessageView
            message={'아직 전시 메이트의 전시회에 대한 기록이 없습니다.'}
          />
        }
        data={mateExhList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TicketWrapper>
            <Ticket
              poster={item.poster}
              exhName={item.exhName}
              gallery={item.gallery}
              visitDate={item.visitDate}
              exhId={item.exhId}
              handleClick={onPress}
            />
          </TicketWrapper>
        )}
        ListHeaderComponent={
          <UserInfo>
            <ProfileWrapper>
              <Profile
                source={{
                  uri: `${mateInfo.profile ?? process.env.DEFAULT_IMAGE}`,
                }}
                resizeMode="cover"
                alt={'이미지 읽기 실패'}
              />
            </ProfileWrapper>
            <UserInfoColumn>
              <NickName>
                {mateInfo.nickname === '' ? '전시 메이트' : mateInfo.nickname}
              </NickName>
              <Art>{mateInfo.artField === '' ? '없음' : mateInfo.artField}</Art>
            </UserInfoColumn>
          </UserInfo>
        }
        ListFooterComponent={<Footer />}
      />
    </PageFrame>
  );
};

export default MateExhListScreen;

/** style */
const TicketWrapper = styled.View`
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  gap: ${responsive(8)}px;
  align-items: center;
  padding: ${responsive(15)}px;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(45)}px;
  height: ${responsive(45)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex-direction: column;
  gap: ${responsive(3)}px;
  justify-content: center;
`;

const NickName = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Art = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const Footer = styled.View`
  padding-bottom: ${responsive(30)}px;
`;
