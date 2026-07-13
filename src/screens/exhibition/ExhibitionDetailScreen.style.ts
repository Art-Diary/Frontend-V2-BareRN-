import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const ImageContainer = styled.View`
  position: relative;

  height: ${responsive(250)}px;

  background-color: #f2f7fa;
`;

export const Image = styled.Image`
  width: 100%;

  height: 100%;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['transparent', 'rgba(250,253,254,0.15)', '#FAFDFE'],
})`
  position: absolute;

  left: 0;

  right: 0;

  top: 0;

  bottom: 0;
`;

export const ImageInfo = styled.View`
  position: absolute;

  left: ${responsive(18)}px;

  right: ${responsive(18)}px;

  bottom: ${responsive(17)}px;
`;

export const LocationChip = styled.View`
  align-self: flex-start;

  padding: ${responsive(5.3)}px ${responsive(12.5)}px;

  border-radius: ${responsive(999)}px;

  background-color: #7eb5df;
`;

export const LocationText = styled.Text`
  color: white;

  /* font-weight: 800; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(12)}px;
`;

export const Title = styled.Text`
  margin-top: ${responsive(9)}px;

  /* font-size: 26px;

  font-weight: 800; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(29)}px;

  color: #3e4f5c;
`;

export const Date = styled.Text`
  margin-top: ${responsive(5.3)}px;

  /* font-size: 12px;

  font-weight: bold; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(13)}px;

  color: #8ba1b0;
`;

export const Section = styled.View`
  margin-top: ${responsive(17.5)}px;

  padding: 0px ${responsive(17.5)}px;
`;

export const TabContainer = styled.View`
  flex-direction: row;

  background-color: #f2f7fa;

  border-radius: ${responsive(16)}px;

  padding: ${responsive(3.5)}px;
`;

export const TabButton = styled.Pressable<{
  selected: boolean;
}>`
  flex: 1;

  align-items: center;

  justify-content: center;

  padding: ${responsive(10.5)}px 0px;

  border-radius: ${responsive(12)}px;

  background-color: ${({selected}: {selected: boolean}) =>
    selected ? '#FFFFFF' : 'transparent'};
`;

export const TabText = styled.Text<{
  selected: boolean;
}>`
  /* font-size: 12px;

  font-weight: 700; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(13)}px;

  color: ${({selected}: {selected: boolean}) =>
    selected ? '#5188B3' : '#8BA1B0'};
`;

export const IntroductionCard = styled.View`
  background-color: white;

  border-width: ${responsive(0.9)}px;

  border-color: #e6eff5;

  border-radius: ${responsive(18)}px;

  padding: ${responsive(15.5)}px;
`;

export const Introduction = styled.Text`
  /* font-size: 13px; */

  line-height: ${responsive(21)}px;

  font-family: ${FONT_NAME};
  font-size: ${responsive(14)}px;

  color: #5f7485;
`;
