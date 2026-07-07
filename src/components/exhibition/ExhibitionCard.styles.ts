import styled from 'styled-components/native';
import responsive from '../util/responsiveSize';
import {FONT_NAME} from '../util/style';

export const Container = styled.View`
  flex-direction: row;
  background: white;

  border-radius: ${responsive(21)}px;

  padding: ${responsive(10.5)}px;

  margin: 0px ${responsive(15)}px;
  margin-bottom: ${responsive(12.3)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
`;

export const PosterContainer = styled.View`
  position: relative;
`;

export const Poster = styled.Image`
  width: ${responsive(60)}px;
  /* width: ${responsive(56)}px; */
  /* height: 80px; */
  height: ${responsive(80)}px;

  border-radius: ${responsive(10.5)}px;
`;

export const LikeButton = styled.Pressable`
  position: absolute;

  top: -${responsive(3.5)}px;
  right: -${responsive(3.5)}px;

  width: ${responsive(21)}px;
  height: ${responsive(21)}px;

  border-radius: ${responsive(10.5)}px;

  background: white;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;

  margin-left: ${responsive(12.5)}px;

  justify-content: space-between;
`;

export const Info = styled.View``;

export const Title = styled.Text`
  font-size: ${responsive(15.5)}px;
  /* font-weight: 800; */
  font-family: ${FONT_NAME};

  color: #3e4f5c;
`;

export const Subtitle = styled.Text`
  margin-top: ${responsive(2)}px;

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
  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};

  color: #7eb5df;

  /* font-weight: bold; */
`;

export const DetailBadge = styled.View`
  background: #eaf2fa;

  padding: ${responsive(3.5)}px ${responsive(9)}px;

  border-radius: ${responsive(20)}px;
`;

export const DetailText = styled.Text`
  color: #427196;

  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};

  /* font-weight: 700; */
`;
