import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.Pressable<{
  selected: boolean;
}>`
  flex-direction: row;

  padding: ${responsive(12.3)}px;
  margin: 0px ${responsive(14)}px;
  margin-bottom: ${responsive(8)}px;

  border-width: ${responsive(1.9)}px;
  border-color: ${({selected}: {selected: boolean}) =>
    selected ? '#7EB5DF' : '#E6EFF5'};

  border-radius: ${responsive(17.5)}px;

  background-color: ${({selected}: {selected: boolean}) =>
    selected ? '#F6FBFE' : '#FFFFFF'};
`;

export const Poster = styled.Image`
  width: ${responsive(63)}px;
  height: ${responsive(84)}px;

  border-radius: ${responsive(10)}px;

  background-color: #f3f6f9;
`;

export const Content = styled.View`
  flex: 1;

  /* height: 100%; */
  margin-left: ${responsive(12.5)}px;
  justify-content: space-between;
`;

export const Info = styled.View``;

export const Title = styled.Text`
  /* font-size: 16px;
  font-weight: 700; */
  font-size: ${responsive(17.5)}px;
  font-family: ${FONT_NAME};

  color: #3e4f5c;
`;

export const Subtitle = styled.Text`
  margin-top: ${responsive(2)}px;

  /* font-size: 13px; */
  font-size: ${responsive(11.2)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;
`;

export const Bottom = styled.View`
  flex-direction: row;

  justify-content: space-between;

  align-items: center;
`;

export const Date = styled.Text`
  margin-top: ${responsive(3)}px;

  /* font-size: 12px; */
  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};

  color: #7eb5df;
`;

export const CheckContainer = styled.View`
  margin-left: ${responsive(10)}px;

  justify-content: center;
  align-items: center;
`;
