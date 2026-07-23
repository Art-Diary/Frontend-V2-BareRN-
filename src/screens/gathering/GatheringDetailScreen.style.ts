import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const AddButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${responsive(1)}px;
`;

export const AddButtonText = styled.Text`
  /* font-size: 12px;
  font-weight: 700; */

  font-size: ${responsive(16)}px;
  font-family: ${FONT_NAME};
  color: #7eb5df;
`;

export const MemberPanel = styled.View`
  margin: 0 ${responsive(15)}px;
  padding: ${responsive(14)}px;
  margin-bottom: ${responsive(14)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #d9ebf7;

  border-radius: ${responsive(22)}px;
  background: #f2f8fc;
`;

export const MemberHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MemberTitle = styled.Text`
  /* font-size: 12px;
  font-weight: 700; */

  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
  color: #5188b3;
`;

export const InviteButton = styled.Pressable`
  flex-direction: row;
  align-items: center;

  padding: ${responsive(5.3)}px ${responsive(9)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(999)}px;
  background: white;
`;

export const InviteButtonText = styled.Text`
  margin-left: ${responsive(3)}px;
  /* font-size: 10px;
  font-weight: 800; */

  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};
  color: #7eb5df;
`;

export const MemberList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${responsive(10.5)}px;
`;

export const MemberChip = styled.View`
  flex-direction: row;
  align-items: center;

  margin-right: ${responsive(5)}px;
  margin-bottom: ${responsive(4)}px;

  padding: ${responsive(4)}px ${responsive(7)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(999)}px;
  background: white;
`;

export const MemberCircle = styled.View`
  width: ${responsive(18.5)}px;
  height: ${responsive(18.5)}px;

  border-radius: ${responsive(999)}px;

  justify-content: center;
  align-items: center;

  margin-right: ${responsive(5)}px;
  border-width: 0px;
  border-color: white;
  overflow: hidden;
`;

export const MemberProfile = styled.Image`
  width: 100%;
  height: 100%;
`;

export const MemberAvatarText = styled.Text`
  color: white;
  /* font-size: 9px;
  font-weight: 800; */

  font-size: ${responsive(10)}px;
  font-family: ${FONT_NAME};
`;

export const MemberName = styled.Text`
  /* font-size: 12px;
  font-weight: 700; */

  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const SectionTitle = styled.Text`
  margin: 0 ${responsive(20)}px;
  margin-bottom: ${responsive(14)}px;
  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
  color: #8c7f72;
`;

export const EmptyContainer = styled.View`
  margin: 0 ${responsive(15)}px;
  padding: ${responsive(35)}px ${responsive(15)}px;

  align-items: center;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(21)}px;

  background: white;
`;

export const EmptyText = styled.Text`
  /* font-size: 12px; */
  font-size: ${responsive(13.5)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const EmptyButton = styled.Pressable`
  margin-top: ${responsive(10.5)}px;

  padding: ${responsive(8.8)}px ${responsive(16)}px;

  border-radius: ${responsive(999)}px;
  background: #7eb5df;
`;

export const EmptyButtonText = styled.Text`
  color: white;
  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(13.5)}px;
  font-family: ${FONT_NAME};
`;

export const ExhibitionList = styled(FlatList as new () => FlatList<any>)`
  flex: 1;
`;

export const ExhibitionCard = styled.TouchableOpacity`
  margin: 0 ${responsive(15)}px;
  margin-bottom: ${responsive(14)}px;
  flex-direction: row;

  padding: ${responsive(10.5)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(21.5)}px;

  background: white;
`;

export const ExhibitionImage = styled.Image`
  width: ${responsive(56)}px;
  height: ${responsive(73.5)}px;

  border-radius: ${responsive(10)}px;
  background: #f2f7fa;
`;

export const ExhibitionContent = styled.View`
  flex: 1;
  margin-left: ${responsive(10.5)}px;
  justify-content: space-between;
`;

export const ExhibitionTitle = styled.Text`
  /* font-size: 14px;
  font-weight: 800; */
  font-size: ${responsive(15.5)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const ExhibitionLocation = styled.Text`
  margin-top: ${responsive(3)}px;
  /* font-size: 10px; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const ExhibitionFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ExhibitionDate = styled.Text`
  /* font-size: 10px;
  font-weight: 700; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};
  color: #7eb5df;
`;

export const ChatBadge = styled.View`
  padding: ${responsive(3.5)}px ${responsive(6.8)}px;
  border-radius: ${responsive(999)}px;
  background: #eaf2fa;
`;

export const ChatBadgeText = styled.Text`
  /* font-size: 9px;
  font-weight: 800; */
  font-size: ${responsive(10.5)}px;
  font-family: ${FONT_NAME};
  color: #427196;
`;
