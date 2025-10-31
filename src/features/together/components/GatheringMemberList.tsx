import React, {useState} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {MemberInfoType} from '../util/gatheringInfoType';
import CreateGatheringMemberModal from './modal/CreateGatheringMemberModal';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';

interface Props {
  gatheringId: number;
  memberList: MemberInfoType[];
}

const GatheringMemberList: React.FC<Props> = ({gatheringId, memberList}) => {
  // Hooks
  const [openCreateMemberModal, setOpenCreateMemberModal] = useState(false);

  const onPressMemberModal = () => {
    setOpenCreateMemberModal(prev => !prev);
  };

  return (
    <Container>
      <ContentText>전시 메이트</ContentText>
      <RowView>
        <FlatList
          horizontal
          ListHeaderComponent={
            <Item activeOpacity={0.6} isAdd={true} onPress={onPressMemberModal}>
              <NameText isAdd={true}>+</NameText>
            </Item>
          }
          showsHorizontalScrollIndicator={false}
          data={memberList}
          renderItem={({item, index}) => (
            <Item disabled={true} isLast={memberList.length - 1 === index}>
              <NameText>{item.nickname}</NameText>
            </Item>
          )}
        />
      </RowView>
      {openCreateMemberModal && (
        <CreateGatheringMemberModal
          gatheringId={gatheringId}
          handleCloseModal={onPressMemberModal}
        />
      )}
    </Container>
  );
};

export default GatheringMemberList;

/** style */
const Container = styled.View`
  flex-direction: column;
  gap: ${responsive(15)}px;
`;

const ContentText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(13)}px;
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
