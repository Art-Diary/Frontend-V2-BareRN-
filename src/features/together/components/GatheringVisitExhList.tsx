import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {RootStackNavigationProp} from '~/App';
import {GatheringVisitExhInfoType} from '../util/gatheringInfoType';
import CustomTouchable from '~/components/CustomTouchable';
import {AddMyExhButtonIcon} from '~/components/icon';
import InfoMessageView from '~/components/InfoMessageView';
import Ticket from '~/components/Ticket';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

interface Props {
  gatheringId: number;
  visitExhList: GatheringVisitExhInfoType[];
}

const GatheringVisitExhList: React.FC<Props> = ({
  gatheringId,
  visitExhList,
}) => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();

  // Handlers
  const onPressCreateVisitDate = () => {
    navigation.navigate('AddGatheringVisitExh', {gatheringId});
  };

  const onPress = (exhId: number) => {
    navigation.navigate('GatheringDiary', {gatheringId, exhId});
  };

  return (
    <Container>
      <VisitExhListView>
        <ContentText>함께 한 전시 리스트</ContentText>
        <CustomTouchable onPress={onPressCreateVisitDate}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
      </VisitExhListView>
      <FlatList
        ListEmptyComponent={
          <InfoMessageView message={'아직 방문한 전시회가 없습니다.'} />
        }
        data={visitExhList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TicketWrapper key={index}>
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
        ListFooterComponent={<Footer />}
      />
    </Container>
  );
};

export default GatheringVisitExhList;

/** style */
const Container = styled.View`
  flex-direction: column;
  gap: ${responsive(15)}px;
`;

const VisitExhListView = styled.View`
  flex-direction: row;
  padding-right: ${responsive(13)}px;
  align-items: center;
  justify-content: space-between;
`;

const ContentText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-left: ${responsive(13)}px;
`;

const TicketWrapper = styled.View`
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
`;

const Footer = styled.View`
  padding-bottom: ${responsive(30)}px;
`;
