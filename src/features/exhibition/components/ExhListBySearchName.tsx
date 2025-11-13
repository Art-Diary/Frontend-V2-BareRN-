import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchExhListBySearch} from '~/api/exhibition/exhibitionInfo';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import ExhItemView from '~/components/ExhItemView';
import {BACK_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/util/style';
import responsive from '~/components/util/responsiveSize';

interface SearchProps {
  searchName: string;
}

const ExhListBySearchName: React.FC<SearchProps> = ({searchName}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  // search_result_list 가져오기
  const {
    data: searchContents,
    isLoading,
    isError,
    isSuccess,
  } = useFetchExhListBySearch(searchName);

  useApiErrorToast(isError);

  const onPressExhItem = (item: ExhInfo) => {
    navigation.navigate('ExhDetail', {
      exhId: item.exhId,
    });
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ScrollView style={{flex: 1}} scrollEventThrottle={200}>
        {searchContents && searchContents.length ? (
          <PreSearch>
            {'검색 결과 ('}
            {searchContents.length}
            {'개)'}
          </PreSearch>
        ) : (
          <PreSearch>{'해당 검색 결과가 없습니다.'}</PreSearch>
        )}
        {searchContents?.map((item: ExhInfo, index: number) => (
          <ExhItemView
            key={index}
            exhInfo={{...item}}
            notTouchable={false}
            onTouch={onPressExhItem}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default ExhListBySearchName;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
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
