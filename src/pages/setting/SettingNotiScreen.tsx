import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import WithBackFrame from '~/components/WithBackFrame';
import {DARK_GREY, LIGHT_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import UpdateNoti from '~/features/setting/components/UpdateNoti';
import {NotiInfoType} from '~/features/setting/util/notiType';
import {useUserInfo} from '~/zustand/userInfo';
import PageFrame from '~/components/PageFrame';

const SettingNotiScreen = () => {
  const {notiList} = useUserInfo();

  return (
    <PageFrame>
      <WithBackFrame title="푸시 알림 설정" line={true} />

      {/* body */}
      <Content>
        <FlatList<NotiInfoType>
          showsVerticalScrollIndicator={false}
          data={notiList}
          renderItem={({item, index}) => (
            <ContentRow>
              <ContentColumn>
                <AlarmText>{item.notiName}</AlarmText>
                <AlarmSubText>{item.notiSubText}</AlarmSubText>
              </ContentColumn>
              <UpdateNoti notiList={notiList} noti={item} />
            </ContentRow>
          )}
        />
      </Content>
    </PageFrame>
  );
};

export default SettingNotiScreen;

/** style */
const Content = styled.View`
  flex: 1;
  padding: ${responsive(15)}px;
  padding-top: ${responsive(17)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: ${responsive(15)}px;
`;

const ContentColumn = styled.View`
  flex-direction: column;
  gap: ${responsive(3)}px;
`;

const AlarmText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const AlarmSubText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
`;
