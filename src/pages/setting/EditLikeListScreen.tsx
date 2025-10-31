import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useDeleteLikeExhList} from '~/api/exhibition/likeExh';
import PageFrame from '~/components/PageFrame';
import WithBackFrame from '~/components/WithBackFrame';
import CustomTouchable from '~/components/CustomTouchable';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import ExhInfoWithHeart from '~/features/setting/components/ExhInfoWithHeart';
import {DeleteLikeType} from '~/features/setting/util/likeType';
import {RootStackParamList} from '~/navigationTypes';
import {CheckIcon} from '~/components/icon';

type EditLikeListProp = RouteProp<RootStackParamList, 'EditLikeList'>;

interface Props {
  route: EditLikeListProp;
}

const EditLikeListScreen: React.FC<Props> = ({route}) => {
  const {likeList} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [unlikeList, setUnlikeList] = useState<DeleteLikeType[]>([]);
  const {
    mutate: deleteLikeExhList,
    isPending,
    isError,
    isSuccess,
  } = useDeleteLikeExhList();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess, isError]);

  const onPressComplete = () => {
    if (unlikeList.length === 0) {
      navigation.goBack();
      return;
    }
    deleteLikeExhList(unlikeList);
  };

  const handleToggle = (exhId: number) => {
    setUnlikeList(prev =>
      prev.some(item => item.exhId === exhId)
        ? prev.filter(item => item.exhId !== exhId)
        : [...prev, {exhId}],
    );
  };

  useEffect(() => {
    console.log(unlikeList);
  }, [unlikeList]);

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      <WithBackFrame title="좋아요 전시회" line={true}>
        <CustomTouchable onPress={onPressComplete}>
          <CheckIcon />
        </CustomTouchable>
      </WithBackFrame>

      {/* body */}
      <Content>
        <FlatList
          data={likeList}
          renderItem={({item, index}) => (
            <ExhInfoWithHeart exhInfo={{...item}} handleToggle={handleToggle} />
          )}
        />
      </Content>
    </PageFrame>
  );
};

export default EditLikeListScreen;

/** style */
const Content = styled.View`
  padding: ${responsive(10)}px;
  padding-top: ${responsive(17)}px;
`;
