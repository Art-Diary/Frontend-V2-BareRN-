import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import MateNameTag from './MateNameTag';
import {MateInfoType} from '../util/mateInfoType';
import {useFetchMateSearch} from '~/api/mate/mate';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import InfoMessageView from '~/components/InfoMessageView';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

interface SearchNewMateListProps {
  searchKeyword: string;
  selectedMate: number;
  handleSelectedMate: (userId: number) => void;
}

const SearchNewMateList: React.FC<SearchNewMateListProps> = ({
  searchKeyword,
  selectedMate,
  handleSelectedMate,
}) => {
  const {
    data: searchMateList,
    isLoading,
    isError,
  } = useFetchMateSearch(searchKeyword);

  useApiErrorToast(isError);

  const pressItem = (item: any) => {
    if (item.userId === selectedMate) {
      handleSelectedMate(-1);
    } else {
      handleSelectedMate(item.userId);
    }
  };

  return (
    <MateListView>
      <LoadingModal isLoading={isLoading} />
      {!searchMateList ||
      (searchMateList.notMate.length === 0 &&
        searchMateList.alreadyMate.length === 0) ? (
        <InfoMessageView message={'검색 결과가 없습니다.'} />
      ) : (
        <ScrollView
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {searchMateList.notMate.length !== 0 && (
            <>
              <Message>추가 가능한 전시 메이트</Message>
              {searchMateList.notMate.map(
                (item: MateInfoType, index: number) => {
                  return (
                    <CustomTouchable
                      onPress={() => pressItem(item)}
                      key={index}>
                      <UserInfoWrapper>
                        <MateNameTag
                          isForSearChNewMate
                          isSelected={item.userId === selectedMate}>
                          <UserInfo>
                            <ProfileWrapper>
                              <Profile
                                source={{
                                  uri: `${
                                    item.profile ?? process.env.DEFAULT_IMAGE
                                  }`,
                                }}
                                alt={'이미지 읽기 실패'}
                              />
                            </ProfileWrapper>
                            <UserInfoColumn>
                              <NickName>{item.nickname}</NickName>
                              <Art>
                                {item.artField === '.' || !item.artField
                                  ? '그외'
                                  : item.artField}
                              </Art>
                            </UserInfoColumn>
                          </UserInfo>
                        </MateNameTag>
                      </UserInfoWrapper>
                    </CustomTouchable>
                  );
                },
              )}
            </>
          )}
          {searchMateList.alreadyMate.length !== 0 && (
            <>
              <Message>이미 추가된 전시 메이트</Message>
              {searchMateList.alreadyMate.map(
                (item: MateInfoType, index: number) => {
                  return (
                    <CustomTouchable
                      onPress={() => pressItem(item)}
                      disabled
                      key={index}>
                      <UserInfoWrapper>
                        <MateNameTag>
                          <UserInfo>
                            <ProfileWrapper>
                              <Profile
                                source={{
                                  uri: `${
                                    item.profile ?? process.env.DEFAULT_IMAGE
                                  }`,
                                }}
                                alt={'이미지 읽기 실패'}
                              />
                            </ProfileWrapper>
                            <UserInfoColumn>
                              <NickName>{item.nickname}</NickName>
                              <Art>
                                {item.artField === '.' || !item.artField
                                  ? '그외'
                                  : item.artField}
                              </Art>
                            </UserInfoColumn>
                          </UserInfo>
                        </MateNameTag>
                      </UserInfoWrapper>
                    </CustomTouchable>
                  );
                },
              )}
            </>
          )}
        </ScrollView>
      )}
    </MateListView>
  );
};

export default SearchNewMateList;

/** style */
const Message = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(15)}px;
  padding-bottom: ${responsive(10)}px;
`;

const MateListView = styled.View`
  flex: 1;
  flex-direction: column;
`;

const UserInfoWrapper = styled.View`
  padding-bottom: ${responsive(8)}px;
  align-items: center;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${responsive(8)}px;
`;

const ProfileWrapper = styled.View`
  border-color: ${MAIN_COLOR};
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(35)}px;
  height: ${responsive(35)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserInfoColumn = styled.View`
  flex-direction: column;
  gap: ${responsive(1.5)}px;
  justify-content: center;
`;

const NickName = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Art = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
