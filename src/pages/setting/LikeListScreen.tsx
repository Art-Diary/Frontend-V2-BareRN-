import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useFetchLikeList} from '~/api/exhibition/likeExh';
import ExhItemView from '~/components/ExhItemView';
import InfoMessageView from '~/components/InfoMessageView';
import PageFrame from '~/components/PageFrame';
import WithBackFrame from '~/components/WithBackFrame';
import CustomTouchable from '~/components/CustomTouchable';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import {PencilUpdateNoUnderbarIcon} from '~/components/icon';

const LikeListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    data: likeList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchLikeList();

  useApiErrorToast(isError);

  const onPressEditButton = () => {
    navigation.navigate('EditLikeList', {likeList});
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <WithBackFrame title="좋아요 전시회" line={true}>
        <CustomTouchable onPress={onPressEditButton}>
          <PencilUpdateNoUnderbarIcon customHeight={15} />
        </CustomTouchable>
      </WithBackFrame>

      {/* body */}
      <Content>
        <FlatList
          ListEmptyComponent={
            <InfoMessageView message={'좋아요 누른 전시회가 없습니다.'} />
          }
          showsVerticalScrollIndicator={false}
          data={likeList}
          renderItem={({item, index}) => (
            <ExhItemView exhInfo={{...item}} notTouchable={true} />
          )}
        />
      </Content>
    </PageFrame>
  );
};

export default LikeListScreen;

/** style */
const Content = styled.View`
  padding: ${responsive(10)}px;
  padding-top: ${responsive(17)}px;
`;
