import React, {ReactNode, useCallback} from 'react';
import styled from 'styled-components/native';
import {removeControlCharacter} from './util/checkKeyword';
import {DARK_GREY, MAIN_COLOR} from './util/colors';
import {FONT_NAME} from './util/style';
import {DeleteButtonIcon, SearchButtonIcon} from './icon';
import CustomTouchable from './CustomTouchable';
import responsive from './util/responsiveSize';

interface SearchFrameProps {
  searchKeyword: string;
  onPressSearch: () => void;
  handleSearchKeyword: (keyword: string) => void;
  children: ReactNode;
  searchMessage?: string;
  handleCurrentPage?: (currentPage: boolean) => void; //deleteButton이 true일 때만, 즉 전시회탭에서 검색어로 전시회를 조회할 때만
}

const SearchFrame: React.FC<SearchFrameProps> = ({
  searchKeyword,
  onPressSearch,
  handleSearchKeyword,
  children,
  searchMessage,
  handleCurrentPage,
}) => {
  const onChangeText = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    handleSearchKeyword(cleaned);
  }, []);

  const onPressDelete = () => {
    if (handleCurrentPage) {
      handleCurrentPage(false);
    }
    handleSearchKeyword('');
  };
  return (
    <ContentsContainer>
      {/* 검색창 */}
      <SearchContainer>
        <SearchView>
          <WordContent>
            <SearchWord
              haveText={searchKeyword}
              onSubmitEditing={onPressSearch} // 키보드 상에서 엔터 누르면 확인 버튼 누르는 것과 같음.
              onChangeText={onChangeText}
              placeholder={!searchKeyword ? searchMessage : ''}
              value={searchKeyword}
            />
            {searchKeyword && (
              <DeleteIconTouch onPress={onPressDelete}>
                <DeleteButtonIcon />
              </DeleteIconTouch>
            )}
          </WordContent>
          <CustomTouchable onPress={onPressSearch}>
            <SearchButtonIcon />
          </CustomTouchable>
        </SearchView>
        <UnderLine />
      </SearchContainer>
      {/* 검색창 아래 */}
      {children}
    </ContentsContainer>
  );
};

export default SearchFrame;

/** style */
const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const SearchContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

const SearchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${responsive(3)}px;
  align-items: center;
`;

const WordContent = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
`;

interface SearchWordProps {
  haveText: boolean;
}
const SearchWord = styled.TextInput<SearchWordProps>`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-bottom: ${responsive(7)}px;
  width: ${(props: SearchWordProps) => !props.haveText && `90%`};
`;

const DeleteIconTouch = styled.TouchableOpacity`
  align-self: center;
`;

const UnderLine = styled.View`
  border-bottom-width: ${responsive(1.7)}px;
  border-color: ${MAIN_COLOR};
`;
