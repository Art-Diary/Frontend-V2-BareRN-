import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const GroupCard = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 ${responsive(15)}px;
  margin-bottom: ${responsive(14)}px;
  padding: ${responsive(16)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(21)}px;
  background: white;
`;

export const GroupInfo = styled.View`
  flex: 1;
  margin-right: ${responsive(10.5)}px;
`;

export const GroupTitle = styled.Text`
  /* font-size: 18px;
  font-weight: 800; */

  font-size: ${responsive(19)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const GroupDescription = styled.Text`
  margin-top: ${responsive(3.5)}px;
  /* font-size: 12px; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const BadgeRow = styled.View`
  flex-direction: row;
  margin-top: ${responsive(12)}px;
`;

export const BlueBadge = styled.View`
  padding: ${responsive(3.5)}px ${responsive(7)}px;
  background: #e8f2fa;
  border-radius: ${responsive(999)}px;
  margin-right: ${responsive(7)}px;
`;

export const BrownBadge = styled.View`
  padding: ${responsive(3.5)}px ${responsive(7)}px;
  background: #faf6f0;
  border-radius: ${responsive(999)}px;
`;

export const BadgeText = styled.Text`
  /* font-size: 10px;
  font-weight: 700; */
  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};
`;

export const MemberContainer = styled.View`
  flex-direction: row;
`;

export const MemberCircle = styled.View`
  width: ${responsive(29.8)}px;
  height: ${responsive(29.8)}px;
  border-radius: ${responsive(999)}px;

  justify-content: center;
  align-items: center;

  margin-left: -${responsive(7)}px;

  border-width: ${responsive(1.8)}px;
  border-color: white;
  overflow: hidden;
`;

export const MemberProfile = styled.Image`
  width: 100%;
  height: 100%;
`;
