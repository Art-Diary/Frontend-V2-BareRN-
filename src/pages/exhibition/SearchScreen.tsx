import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

import {
  FilterContainer,
  FilterButton,
  FilterButtonText,
  SearchInput,
  SearchBox,
  SearchButton,
  EmptyListView,
  EmptyListText,
} from '~/pages/exhibition/SearchScreen.styles';

import {Exhibition} from '~/types/exhibition';
import {useFetchExhibitionList} from '~/api/exhibition/exhibition';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import PageFrame from '~/components/PageFrame';
import Header from '~/components/Header';
import {Search} from 'lucide-react-native';
import ExhibitionCard from '~/components/exhibition/ExhibitionCard';
import LoadingModal from '~/components/modal/LoadingModal';
import {removeControlCharacter} from '~/components/util/checkKeyword';
import CustomTouchable from '~/components/CustomTouchable';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

type SearchFilterType = 'keyword' | 'date';

export default function SearchScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [filterType, setFilterType] = useState<SearchFilterType>('keyword');
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const {
    data: exhibitions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchExhibitionList(searchKeyword, searchDate);

  useApiErrorToast(isError);

  const list = exhibitions?.pages.flatMap(page => page.content) ?? [];

  const onChangeText = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setKeyword(cleaned);
  }, []);

  const handleSearch = useCallback(() => {
    setSearchKeyword(keyword?.trim() || null);
  }, [keyword]);

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  const onPress = (exhId: number) => {
    navigation.navigate('ExhibitionDetail', {exhId});
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <Header title={'전시회'} subTitle={'새로운 예술의 영감을 만나보세요'} />

      <FilterContainer>
        <FilterButton
          selected={filterType === 'keyword'}
          onPress={() => {
            setFilterType('keyword');
            setSearchKeyword(keyword);
            setSearchDate(null);
          }}>
          <FilterButtonText selected={filterType === 'keyword'}>
            키워드로 찾기 🔍
          </FilterButtonText>
        </FilterButton>

        <FilterButton
          selected={filterType === 'date'}
          onPress={() => {
            setFilterType('date');
            setSearchKeyword(null);
            setSearchDate(selectedDate);
          }}>
          <FilterButtonText selected={filterType === 'date'}>
            날짜로 맞춤 검색 📅
          </FilterButtonText>
        </FilterButton>
      </FilterContainer>

      {filterType === 'keyword' ? (
        <SearchBox>
          <Search size={18} color="#A2B6C5" />

          <SearchInput
            placeholder="전시 이름, 작가, 미술관 검색..."
            value={keyword}
            onChangeText={onChangeText}
            onSubmitEditing={handleSearch}
          />
        </SearchBox>
      ) : (
        <SearchBox>
          <CustomTouchable onPress={() => setShowPicker(true)}>
            <SearchButton>
              {selectedDate ?? '날짜 선택 (YYYY-MM-DD)'}
            </SearchButton>
          </CustomTouchable>
          {showPicker && (
            <DateTimePicker
              value={selectedDate ? new Date(selectedDate) : new Date()}
              mode="date"
              display="default"
              is24Hour={true}
              onDismiss={() => setShowPicker(false)}
              onValueChange={(event, date) => {
                const strDate = formatDate(date);
                setShowPicker(false);
                if (strDate) {
                  setSearchDate(strDate);
                  setSelectedDate(strDate);
                }
              }}
            />
          )}
        </SearchBox>
      )}

      <FlatList<Exhibition>
        data={list}
        keyExtractor={item => item.exhId.toString()}
        renderItem={({item}) => (
          <ExhibitionCard
            exhibition={item}
            onPress={() => onPress(item.exhId)}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          <EmptyListView>
            <EmptyListText>검색 결과가 없습니다.</EmptyListText>
          </EmptyListView>
        }
      />
    </PageFrame>
  );
}
