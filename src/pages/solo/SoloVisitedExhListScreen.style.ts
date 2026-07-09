import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

// export const Container = styled.View`
//   flex: 1;
//   background-color: #fafdfe;
//   padding: 16px 20px 0;
// `;

// export const Header = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 24px;
// `;

// export const HeaderContent = styled.View`
//   flex: 1;
// `;

// export const TitleRow = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;

// export const Title = styled.Text`
//   font-size: 30px;
//   font-weight: 800;
//   color: #7eb5df;
// `;

// export const Badge = styled.View`
//   margin-left: 8px;
//   padding: 3px 10px;
//   border-radius: 999px;
//   background-color: #e6f0f8;
// `;

// export const BadgeText = styled.Text`
//   font-size: 10px;
//   font-weight: 700;
//   color: #5188b3;
// `;

// export const SubTitle = styled.Text`
//   margin-top: 4px;
//   font-size: 12px;
//   font-weight: 500;
//   color: #8ba1b0;
// `;

export const AddButton = styled.Pressable`
  width: ${responsive(38)}px;
  height: ${responsive(38)}px;
  border-radius: ${responsive(999)}px;
  background-color: #7eb5df;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.View`
  margin: 0 ${responsive(15)}px;
  margin-bottom: ${responsive(14)}px;
`;

export const SectionHeader = styled.Text`
  margin-bottom: ${responsive(10)}px;
  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
  color: #5188b3;
`;

export const SectionTitle = styled.Text`
  margin-bottom: ${responsive(10)}px;
  padding-left: ${responsive(3.5)}px;
  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
  color: #6d8596;
`;
