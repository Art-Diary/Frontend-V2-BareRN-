import styled from 'styled-components/native';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const Title = styled.Text`
  margin: ${responsive(14)}px;
  margin-bottom: ${responsive(18)}px;
  /* font-size: 22px;
  font-weight: 800; */
  font-size: ${responsive(23)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const SearchInput = styled.TextInput`
  height: ${responsive(42)}px;

  padding: 0px ${responsive(16)}px;

  margin: 0px ${responsive(14)}px;
  margin-bottom: ${responsive(18)}px;

  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;

  border-radius: ${responsive(16)}px;

  background-color: white;

  /* font-size: 14px; */
  font-size: ${responsive(14.5)}px;
  font-family: ${FONT_NAME};
  color: #3e4f5c;
`;

export const EmptyContainer = styled.View`
  justify-content: center;
  align-items: center;

  padding: ${responsive(53)}px;
`;

export const EmptyText = styled.Text`
  /* font-size: 14px; */
  font-size: ${responsive(14.5)}px;
  font-family: ${FONT_NAME};
  color: #8ba1b0;
`;

export const Bottom = styled.View`
  padding-top: ${responsive(14)}px;
  padding-bottom: ${responsive(45)}px;
`;

export const NextButton = styled.Pressable<{
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

export const NextButtonText = styled.Text`
  color: white;
  /* font-size: 16px;
  font-weight: 700; */
  font-size: ${responsive(16.5)}px;
  font-family: ${FONT_NAME};
`;
