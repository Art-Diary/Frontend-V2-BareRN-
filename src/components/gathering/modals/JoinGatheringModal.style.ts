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
  align-items: center;
  margin-bottom: ${responsive(17.5)}px;
`;

export const Title = styled.Text`
  /* font-size: 14px;
  font-weight: 800; */
  font-size: ${responsive(15)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const CloseButton = styled.Pressable`
  width: ${responsive(24.5)}px;
  height: ${responsive(24.5)}px;
  border-radius: ${responsive(999)}px;
  background: #f2f7fa;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  margin-bottom: ${responsive(17.5)}px;
`;

export const Label = styled.Text`
  /* font-size: 10px;
  font-weight: 800; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
  margin-bottom: ${responsive(7)}px;
`;

export const Input = styled.TextInput`
  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
  border-radius: ${responsive(10)}px;
  background: #fafdfe;
  padding: ${responsive(10.5)}px ${responsive(14)}px;
  /* font-size: 12px; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const ErrorText = styled.Text`
  margin-top: ${responsive(7)}px;
  /* font-size: 10px; */
  font-size: ${responsive(10)}px;
  font-family: ${FONT_NAME};
  color: #ef4444;
  font-weight: bold;
`;

export const SubmitButton = styled.Pressable<{disabled: boolean}>`
  padding: ${responsive(12.3)}px;
  border-radius: ${responsive(10)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({disabled}: {disabled: boolean}) =>
    disabled ? '#D5E2EB' : '#7EB5DF'};
`;

export const SubmitText = styled.Text`
  color: white;
  /* font-size: 12px;
  font-weight: 800; */
  font-size: ${responsive(13)}px;
  font-family: ${FONT_NAME};
`;
