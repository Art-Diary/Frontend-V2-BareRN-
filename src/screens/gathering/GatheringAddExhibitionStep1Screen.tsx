import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

import * as S from './GatheringAddExhibitionStep1Screen.style';
import ExhibitionSearchCard from '~/components/gathering/ExhibitionSearchCard';
import {} from '~/types/gathering';
import PageFrame from '~/components/common/PageFrame';
import WithBackFrame from '~/components/common/WithBackFrame';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useFetchExhibitionList} from '~/api/exhibition/exhibition';
import {removeControlCharacter} from '~/components/util/checkKeyword';
import {Exhibition} from '~/types/exhibition';
import LoadingModal from '~/components/modal/LoadingModal';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {RootStackParamList} from '~/navigationTypes';

type Route = RouteProp<RootStackParamList, 'GatheringAddExhibitionStep1'>;

const GatheringAddExhibitionStep1Screen = () => {
  const {params} = useRoute<Route>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedExhibition, setSelectedExhibition] =
    useState<Exhibition | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>('....'); // 수정
  const [keyword, setKeyword] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchExhibitionList(searchKeyword, null);

  useApiErrorToast(isError);

  const exhibitions = data?.pages.flatMap(page => page.content) ?? [];

  const onNext = () => {
    if (selectedExhibition)
      navigation.navigate('GatheringAddExhibitionStep2', {
        gatheringId: params.gatheringId,
        exhibition: selectedExhibition,
      });
  };

  const onSelectExhibition = (item: Exhibition) => {
    setSelectedExhibition(item);
  };

  const onChangeKeyword = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setKeyword(cleaned);
  }, []);

  const handleSearch = useCallback(() => {
    setSearchKeyword(keyword?.trim() || null);
    setSelectedExhibition(null);
  }, [keyword]);

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <WithBackFrame title={'전시회 추가 (1/2)'} />

      <S.Title>같이 다녀온 전시를 골라주세요 🎨</S.Title>

      <S.SearchInput
        placeholder="전시회 이름, 작가, 미술관 검색..."
        placeholderTextColor="#A2B6C5"
        value={keyword}
        onChangeText={onChangeKeyword}
        onSubmitEditing={handleSearch}
      />
      <FlatList<Exhibition>
        data={exhibitions}
        keyExtractor={item => item.exhId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ExhibitionSearchCard
            exhibition={item}
            selected={selectedExhibition === item}
            onPress={() => onSelectExhibition(item)}
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
          <S.EmptyContainer>
            <S.EmptyText>검색 결과가 없습니다</S.EmptyText>
          </S.EmptyContainer>
        }
      />

      <S.Bottom>
        <S.NextButton disabled={!selectedExhibition} onPress={onNext}>
          <S.NextButtonText>이동</S.NextButtonText>
        </S.NextButton>
      </S.Bottom>
    </PageFrame>
  );
};

export default GatheringAddExhibitionStep1Screen;
