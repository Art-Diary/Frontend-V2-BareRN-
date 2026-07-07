import styled from 'styled-components/native';
import {BACK_COLOR} from '../util/colors';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.View`
  background-color: ${BACK_COLOR};

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(21.5)}px;

  padding: ${responsive(13.8)}px;
`;

export const Row = styled.View`
  flex-direction: row;

  align-items: center;

  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const Label = styled.Text`
  margin-left: ${responsive(7)}px;

  /* font-size: 12px;

  font-weight: 700; */

  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;
`;

export const Value = styled.Text`
  flex: 1;

  margin-left: ${responsive(14)}px;

  text-align: right;

  /* font-size: 13px;

  font-weight: 700; */

  font-size: ${responsive(15)}px;
  font-family: ${FONT_NAME};

  color: #3e4f5c;
`;

export const Divider = styled.View`
  height: ${responsive(0.8)}px;

  margin: ${responsive(12.3)}px 0px;

  background-color: #f2f7fa;
`;

export const CostBadge = styled.View`
  background-color: #e6f0f8;

  padding: ${responsive(3.5)}px ${responsive(8.8)}px;

  border-radius: ${responsive(999)}px;
`;

export const Cost = styled.Text`
  color: #5188b3;

  /* font-size: 12px;

  font-weight: 700; */
  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
`;
