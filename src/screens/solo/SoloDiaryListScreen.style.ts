import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const IconButton = styled.Pressable``;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const HeroContainer = styled.View`
  position: relative;
  height: ${responsive(250)}px;
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

export const HeroContent = styled.View`
  position: absolute;

  left: ${responsive(18)}px;

  right: ${responsive(18)}px;

  bottom: ${responsive(17)}px;
`;

export const Title = styled.Text`
  /* font-size: 26px;
  font-weight: 800; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(29)}px;

  color: #3e4f5c;

  margin-bottom: ${responsive(6)}px;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Location = styled.Text`
  margin-left: ${responsive(3.5)}px;
  text-align: center;

  /* font-size: 12px; */

  font-family: ${FONT_NAME};
  font-size: ${responsive(12.5)}px;

  color: #8ba1b0;
`;

// export const TagRow = styled.View`
//   flex-direction: row;
//   margin-bottom: 10px;
// `;

// export const PrimaryTag = styled.View`
//   background-color: #7eb5df;

//   padding: 5px 12px;

//   border-radius: 999px;

//   margin-right: 8px;
// `;

// export const PrimaryTagText = styled.Text`
//   font-size: 10px;
//   font-weight: 700;
//   color: white;
// `;

// export const SecondaryTag = styled.View`
//   background-color: white;

//   padding: 5px 12px;

//   border-radius: 999px;

//   border-width: 1px;
//   border-color: #e6eff5;
// `;

// export const SecondaryTagText = styled.Text`
//   font-size: 10px;
//   font-weight: 700;
//   color: #427196;
// `;

// export const PreferenceCard = styled.View`
//   margin: 20px;

//   padding: 18px;

//   background-color: white;

//   border-radius: 24px;

//   border-width: 1px;
//   border-color: #e6eff5;
// `;

// export const SectionTitle = styled.Text`
//   font-size: 13px;
//   font-weight: 700;

//   color: #5f7485;

//   margin-bottom: 14px;
// `;

// export const PreferenceGrid = styled.View`
//   flex-direction: row;
// `;

// export const PreferenceItem = styled.View`
//   flex: 1;

//   padding: 14px;

//   margin-right: 8px;

//   background-color: #fafdfe;

//   border-radius: 16px;

//   border-width: 1px;
//   border-color: #eef4f8;
// `;

// export const PreferenceLabel = styled.Text`
//   font-size: 11px;

//   color: #8ba1b0;
// `;

// export const PreferenceValue = styled.Text`
//   margin-top: 6px;

//   font-size: 13px;
//   font-weight: 700;

//   color: #427196;
// `;
