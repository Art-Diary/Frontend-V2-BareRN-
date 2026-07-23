import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  margin: ${responsive(14)}px;
  margin-bottom: ${responsive(18)}px;
  /* font-size: 22px;
    font-weight: 800; */
  font-size: ${responsive(23)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const SelectedCard = styled.View`
  flex-direction: row;
  align-items: center;

  padding: ${responsive(14)}px;

  margin: 0px ${responsive(14)}px;
  margin-bottom: ${responsive(25)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #c4ddf2;

  border-radius: ${responsive(21)}px;

  background: #f2f8fc;
`;

export const Poster = styled.Image`
  width: ${responsive(42)}px;
  height: ${responsive(56)}px;

  border-radius: ${responsive(10)}px;

  background: #f2f2f2;
`;

export const Info = styled.View`
  flex: 1;

  margin-left: ${responsive(10)}px;
`;

export const SelectedLabel = styled.Text`
  /* font-size: 10px;
  font-weight: 700; */
  font-size: ${responsive(11)}px;
  font-family: ${FONT_NAME};

  letter-spacing: ${responsive(0.9)}px;

  color: #7eb5df;
`;

export const ExhibitionTitle = styled.Text`
  margin-top: ${responsive(3.5)}px;

  /* font-size: 14px;
  font-weight: 700; */
  font-size: ${responsive(15)}px;
  font-family: ${FONT_NAME};

  color: #3e4f5c;
`;

export const Location = styled.Text`
  margin-top: ${responsive(3.5)}px;

  /* font-size: 11px; */
  font-size: ${responsive(11.5)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;
`;

export const InputSection = styled.View`
  margin: 0px ${responsive(14)}px;
`;

export const Label = styled.Text`
  margin-bottom: ${responsive(6.8)}px;
  margin-left: ${responsive(5)}px;

  /* font-size: 12px;
  font-weight: 700; */
  font-size: ${responsive(13.5)}px;
  font-family: ${FONT_NAME};

  color: #8ba1b0;

  text-transform: uppercase;
`;

export const Button = styled.Pressable`
  height: ${responsive(49)}px;

  padding: 0px ${responsive(10)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(14.5)}px;

  background: white;

  color: #3e4f5c;
`;

export const ButtonText = styled.Text`
  /* font-size: 14px; */
  font-size: ${responsive(14.5)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
  padding: ${responsive(15)}px ${responsive(10)}px;
`;

export const Bottom = styled.View`
  padding-top: ${responsive(14)}px;
  padding-bottom: ${responsive(45)}px;
`;

export const CompleteButton = styled.TouchableOpacity<{
  disabled: boolean;
}>`
  height: ${responsive(47.5)}px;

  justify-content: center;
  align-items: center;
  margin: 0px ${responsive(14)}px;

  border-radius: ${responsive(999)}px;

  background-color: ${({disabled}: {disabled: boolean}) =>
    disabled ? '#D7E6F1' : '#7EB5DF'};

  opacity: ${({disabled}: {disabled: boolean}) => (disabled ? 0.5 : 1)};
`;

export const CompleteButtonText = styled.Text`
  color: white;
  /* font-size: 16px;
  font-weight: 700; */
  font-size: ${responsive(16.5)}px;
  font-family: ${FONT_NAME};
`;
