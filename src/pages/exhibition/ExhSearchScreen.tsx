import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import PageFrame from '~/components/PageFrame';
import SearchFrame from '~/components/SearchFrame';
import WithBackFrame from '~/components/WithBackFrame';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {showToast} from '~/components/util/showToast';
import ExhListBySearchName from '~/features/exhibition/components/ExhListBySearchName';
import SearchHistoryList from '~/features/exhibition/components/SearchHistoryList';

export default function ExhSearchScreen() {
  const [keyword, setKeyword] = useState<string>(''); //검색 단어
  const [searchName, setSearchName] = useState<string>(''); // 검색할 단어 (검색 기록 추가,업데이트하기 위해 필요)
  const [changeState, setChangeState] = useState<boolean>(false); // 최근 기록한 검색어(false), 검색 결과 전시회 리스트(true) 분별 용도

  //   const {
  //     mutate: addSearchContent,
  //     isLoading,
  //     isError,
  //     isSuccess,
  //   } = useAddSearchContent(new Date());

  //   useEffect(() => {
  //     if (isError) {
  //       showToast('다시 시도해 주세요');
  //     }
  //     if (isSuccess) {
  //       setCurrentPage(true);
  //     }
  //   }, [isError, isSuccess]);

  const onPressSearch = () => {
    if (checkBlankInKeyword(keyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      //   addSearchContent(keyword);
      setSearchName(keyword);
    }
    Keyboard.dismiss();
  };

  const handleChangeState = () => {
    setChangeState(prev => !prev);
  };

  return (
    <PageFrame>
      {/* header */}
      <WithBackFrame line={false} />

      {/* body */}
      {/* <SearchFrame
        searchKeyword={keyword}
        onPressSearch={onPressSearch}
        handleSearchKeyword={setKeyword}
        searchMessage={'전시회를 검색하세요'}
        // handleCurrentPage={setCurrentPage}
      >
        {changeState ? (
          // 검색한 전시회 조회
          <ExhListBySearchName searchName={searchName} />
        ) : (
          // 검색했던 기록 조회
          <SearchHistoryList
            handleChangeState={handleChangeState}
            handleSearchName={setSearchName}
            handleKeyword={setKeyword}
          />
        )}
      </SearchFrame> */}
    </PageFrame>
  );
}
