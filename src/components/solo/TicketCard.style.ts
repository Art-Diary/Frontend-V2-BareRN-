import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.Pressable`
  flex-direction: row;
  background: white;
  border-radius: ${responsive(21)}px;
  border: ${responsive(0.9)}px solid #e6eff5;
  overflow: hidden;
`;

export const CoverContainer = styled.View`
  width: ${responsive(84)}px;
  height: ${responsive(112)}px;
  background: #f2f7fa;
`;

export const ReasonBadge = styled.View`
  position: absolute;
  top: ${responsive(7)}px;
  left: ${responsive(7)}px;

  padding: ${responsive(3.5)}px ${responsive(8.5)}px;

  border-radius: ${responsive(999)}px;

  background: rgba(250, 253, 254, 0.95);
`;

export const ReasonText = styled.Text`
  /* font-size: 10px;
  font-weight: 700; */
  font-size: ${responsive(10)}px;
  font-family: ${FONT_NAME};
  color: #5188b3;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${responsive(14)}px;
  justify-content: space-between;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const Title = styled.Text`
  flex: 1;

  /* font-size: 16px;
  font-weight: 800; */
  font-size: ${responsive(18)}px;
  font-family: ${FONT_NAME};

  color: #3e4f5c;

  margin-right: ${responsive(7)}px;
`;

export const MoreButton = styled.Pressable`
  padding: ${responsive(3.5)}px;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: ${responsive(5.4)}px;
`;

export const Location = styled.Text`
  flex: 1;

  margin-left: ${responsive(3.5)}px;

  /* font-size: 12px; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;
`;

export const BottomRow = styled.View`
  flex-direction: row;

  justify-content: space-between;

  align-items: center;

  margin-top: ${responsive(10.5)}px;

  padding-top: ${responsive(9)}px;

  border-top-width: ${responsive(0.9)}px;
  border-top-color: #f2f7fa;
`;

export const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Date = styled.Text`
  margin-left: ${responsive(3.5)}px;

  /* font-size: 11px;

  font-weight: 700; */
  font-size: ${responsive(12)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;
`;

export const CompletedBadge = styled.View`
  background: #e8f2fa;

  padding: ${responsive(2.5)}px ${responsive(7)}px;

  border-radius: ${responsive(999)}px;
`;

export const CompletedText = styled.Text`
  /* font-size: 9px;

  font-weight: 700; */
  font-size: ${responsive(10)}px;
  font-family: ${FONT_NAME};

  color: #5188b3;
`;
