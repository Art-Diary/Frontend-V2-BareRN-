import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from 'App';
import {FlatList} from 'react-native';
import {GatheringInfoType} from '../util/gatheringInfoType';
import CreateGatheringModal from './modal/CreateGatheringModal';
import {useFetchGatheringList} from '~/api/gathering/gathering';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

const GatheringList = () => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const [openCreateGatheringModal, setOpenCreateGatheringModal] =
    useState(false);

  // API Hooks
  const {data: gatheringList, isLoading, isError} = useFetchGatheringList();

  useApiErrorToast(isError);

  const onPressGatheringModal = () => {
    setOpenCreateGatheringModal(prev => !prev);
  };

  const pressEnterGathering = (item: GatheringInfoType) => {
    navigation.navigate('GatheringDetail', {
      gatheringInfo: {
        gatheringId: item.gatheringId,
        gatheringName: item.gatheringName,
      },
    });
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ContentText>모임 목록</ContentText>
      <RowView>
        <FlatList
          horizontal
          ListHeaderComponent={
            <Item
              activeOpacity={0.6}
              isAdd={true}
              onPress={onPressGatheringModal}>
              <NameText isAdd={true}>+</NameText>
            </Item>
          }
          showsHorizontalScrollIndicator={false}
          data={gatheringList}
          renderItem={({item, index}) => (
            <Item
              key={index}
              activeOpacity={0.6}
              isLast={gatheringList.length - 1 === index}
              onPress={() => pressEnterGathering(item)}>
              <NameText>{item.gatheringName}</NameText>
            </Item>
          )}
        />
      </RowView>
      {openCreateGatheringModal && (
        <CreateGatheringModal handleCloseModal={onPressGatheringModal} />
      )}
    </Container>
  );
};

export default GatheringList;

const Container = styled.View`
  flex-direction: column;
  gap: ${responsive(15)}px;
`;

const ContentText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(5)}px;
  padding-left: ${responsive(13)}px;
`;

const RowView = styled.View`
  flex-direction: row;
  gap: ${responsive(8)}px;
`;

interface NameProps {
  isAdd: boolean;
}

const Item = styled.TouchableOpacity<NameProps>`
  border-top-left-radius: ${responsive(7)}px;
  border-top-right-radius: ${responsive(7)}px;
  border-width: ${responsive(1.5)}px;
  border-color: ${(props: NameProps) =>
    props.isAdd ? `${MIDDLE_GREY}` : `${MAIN_COLOR}`};
  background-color: ${(props: NameProps) =>
    props.isAdd ? `none` : `${MAIN_COLOR}`};
  padding-top: ${(props: NameProps) =>
    props.isAdd ? `${responsive(8)}px` : `${responsive(11)}px`};
  padding-bottom: ${(props: NameProps) =>
    props.isAdd ? `${responsive(8)}px` : `${responsive(11)}px`};
  padding-left: ${(props: NameProps) =>
    props.isAdd ? `${responsive(15)}px` : `${responsive(11)}px`};
  padding-right: ${(props: NameProps) =>
    props.isAdd ? `${responsive(15)}px` : `${responsive(11)}px`};
  align-items: center;
  justify-content: center;
  margin-left: ${(props: NameProps) =>
    props.isAdd ? `${responsive(15)}px` : `${responsive(0)}px`};
  margin-right: ${responsive(7)}px;
`;

const NameText = styled.Text<NameProps>`
  font-size: ${(props: NameProps) =>
    props.isAdd ? `${responsive(25)}px` : `${responsive(17.5)}px`};
  color: ${(props: NameProps) => (props.isAdd ? `${MIDDLE_GREY}` : 'white')};
  font-family: ${FONT_NAME};
`;
