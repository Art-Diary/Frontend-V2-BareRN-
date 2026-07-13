import styled from 'styled-components/native';
import {MIDDLE_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

export const FilterContainer = styled.View`
  flex-direction: row;
  margin: 0 ${responsive(15)}px;
  background: #f2f7fa;
  border-radius: ${responsive(14)}px;
  padding: ${responsive(4)}px;
`;

export const FilterButton = styled.Pressable<{
  selected: boolean;
}>`
  flex: 1;
  padding: ${responsive(10.5)}px;
  border-radius: ${responsive(11)}px;
  background: ${({selected}: {selected: boolean}) =>
    selected ? 'white' : 'transparent'};
`;

export const FilterButtonText = styled.Text<{
  selected: boolean;
}>`
  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
  text-align: center;
  /* font-weight: 700; */
  color: ${({selected}: {selected: boolean}) =>
    selected ? '#5188B3' : '#8BA1B0'};
`;

export const SearchBox = styled.View`
  margin: ${responsive(7)}px ${responsive(15)}px;
  flex-direction: row;
  align-items: center;
  border-radius: ${responsive(11)}px;
  border-width: ${responsive(0.9)}px;
  border-color: #e6eff5;
  background: white;
  padding: 0px ${responsive(14)}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-family: ${FONT_NAME};
  font-size: ${responsive(12.3)}px;
  color: #3e4f5c;
  padding: ${responsive(15)}px ${responsive(10)}px;
  padding-bottom: ${responsive(12)}px;
`;

export const SearchButton = styled.Text`
  font-family: ${FONT_NAME};
  font-size: ${responsive(12.3)}px;
  color: #3e4f5c;
  padding: ${responsive(15)}px ${responsive(10)}px;
  padding-right: 55%;
`;

export const EmptyListView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${responsive(20)}px;
`;

export const EmptyListText = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
