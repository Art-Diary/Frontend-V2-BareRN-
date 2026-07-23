import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${responsive(21)}px;
  background-color: rgba(61, 79, 92, 0.5);
`;

export const Container = styled.View`
  width: 100%;
  background: white;
  border-radius: ${responsive(28)}px;
  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
  padding: ${responsive(21)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${responsive(17.5)}px;
`;

export const TitleContainer = styled.View`
  flex: 1;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: ${responsive(5)}px;
  /* font-size: 16px;
  font-weight: 800; */
  font-size: ${responsive(17)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const SubTitle = styled.Text`
  margin-top: ${responsive(3)}px;
  /* font-size: 10px; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const CloseButton = styled.TouchableOpacity`
  width: ${responsive(24.5)}px;
  height: ${responsive(24.5)}px;
  border-radius: ${responsive(999)}px;
  background: #f2f7fa;
  justify-content: center;
  align-items: center;
`;

export const CodeBox = styled.View`
  background: #f2f8fc;
  border-width: ${responsive(0.9)}px;
  border-color: #d9ebf7;
  border-radius: ${responsive(18)}px;
  padding: ${responsive(12.4)}px;
`;

export const CodeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${responsive(8.7)}px;
`;

export const CodeLabel = styled.Text`
  /* font-size: 10px;
  font-weight: 800; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};
  color: #5188b3;
`;

export const CodeHint = styled.Text`
  /* font-size: 9px; */
  font-size: ${responsive(10.8)}px;
  font-family: ${FONT_NAME};
  color: #a2b6c5;
`;

export const CodeRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CodeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
  border-radius: ${responsive(10)}px;
  padding: ${responsive(10.5)}px;
  margin-right: ${responsive(7)}px;
`;

export const CodeText = styled.Text`
  color: #5188b3;
  /* font-size: 12px;
  font-weight: bold; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
`;

export const CopyButton = styled.Pressable<{copied: boolean}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CloseModalButton = styled.Pressable`
  margin-top: ${responsive(17.8)}px;
  background: #eef4f8;
  border-radius: ${responsive(10)}px;
  padding: ${responsive(12.3)}px;
  align-items: center;
`;

export const CloseModalText = styled.Text`
  color: #6d8596;
  /* font-size: 12px;
  font-weight: bold; */

  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
`;
