import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useFetchSearchHistoryList} from '~/api/exhibition/exhibitionInfo';
import CustomTouchable from '~/components/CustomTouchable';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {BACK_COLOR, LIGHT_GREY, MIDDLE_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/util/style';

interface SearchProps {
  handleChangeState: () => void;
  handleSearchName: (value: string) => void;
  handleKeyword: (value: string) => void;
}

const SearchHistoryList: React.FC<SearchProps> = ({
  handleChangeState,
  handleSearchName,
  handleKeyword,
}) => {
  const limit = 10; //보여주는 검색 기록 개수

  // API Hooks
  const {
    data: searchHistoryList,
    isLoading,
    isError,
  } = useFetchSearchHistoryList(); // search_history_list 가져오기

  useApiErrorToast(isError);

  // const {
  //   mutate: addSearchContent,
  //   isSuccess: isSuccessAddSearch,
  //   isLoading: isLoadingAddSearch,
  //   isError: isErrorAddSearch,
  // } = useAddSearchContent(new Date()); //검색 기록 추가
  // const {
  //   mutate: deleteSearchContent,
  //   isLoading: isLoadingDeleteSearch,
  //   isError: isErrorDeleteSearch,
  // } = useDeleteSearchContent(); //검색 기록 삭제

  // // Effects
  // useEffect(() => {
  //   if (isSuccessAddSearch) {
  //     handleChangeState();
  //   }
  // }, [isSuccessAddSearch]);

  // useEffect(() => {
  //   if (isErrorAddSearch || isErrorDeleteSearch) {
  //     showToast('다시 시도해주세요.');
  //   }
  // }, [isErrorAddSearch, isErrorDeleteSearch]);

  // Handlers
  const onPressPreSearch = (text: string) => {
    handleKeyword(text);
    handleSearchName(text);
    // addSearchContent(text);
  };

  const onPressDelete = (searchId: number) => {
    //searchList에서 삭제할 기록 searchId
    // deleteSearchContent(searchId);
  };

  return (
    <Container>
      {/* <LoadingModal
        isLoading={isLoading || isLoadingAddSearch || isLoadingDeleteSearch}
      /> */}
      {searchHistoryList && searchHistoryList.length ? (
        <PreSearch>{'최근검색기록'}</PreSearch>
      ) : (
        <PreSearch>{'최근검색기록이 없습니다.'}</PreSearch>
      )}

      {searchHistoryList?.slice(0, limit).map((item: any, index: number) => (
        <PreSearchView key={index}>
          <CustomTouchable onPress={() => onPressPreSearch(item.searchContent)}>
            <PreSearchList>{item.searchContent}</PreSearchList>
          </CustomTouchable>
          <CustomTouchable onPress={() => onPressDelete(item.searchId)}>
            <PreSearchList>{'X'}</PreSearchList>
          </CustomTouchable>
        </PreSearchView>
      ))}
    </Container>
  );
};

export default SearchHistoryList;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const PreSearchView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${responsive(1.8)}px;
  padding-bottom: ${responsive(1.8)}px;
  padding-left: ${responsive(8.3)}px;
  gap: ${responsive(6)}px;
`;

const PreSearch = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(4.5)}px;
  padding-bottom: ${responsive(1.5)}px;
  padding-left: ${responsive(5.5)}px;
  padding-right: ${responsive(5.5)}px;
`;

const PreSearchList = styled.Text`
  color: ${LIGHT_GREY};
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  text-align: center;
`;
