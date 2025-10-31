import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchMateDiaryList} from '~/api/mate/mate';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import PageFrame from '~/components/PageFrame';
import WithBackFrame from '~/components/WithBackFrame';
import BodyFrame from '~/components/BodyFrame';
import {SoloDiaryInfoType} from '~/features/solo-note/util/soloDiaryType';
import EvalInfo from '~/features/solo-note/component/EvalInfo';
import InfoMessageView from '~/components/InfoMessageView';
import SoloNote from '~/components/SoloNote';

type MateDiaryListProp = RouteProp<RootStackParamList, 'MateDiaryList'>;

interface Props {
  route: MateDiaryListProp;
}

const MateDiaryListScreen: React.FC<Props> = ({route}) => {
  const {mateInfo, exhId} = route.params;
  const {
    data: mateDiaryList,
    isLoading,
    isError,
  } = useFetchMateDiaryList(mateInfo.userId, exhId);

  useApiErrorToast(isError);

  return (
    <PageFrame>
      {/* header */}
      <WithBackFrame line={true} />

      {/* body */}
      <BodyFrame>
        <FlatList<SoloDiaryInfoType>
          ListHeaderComponent={() =>
            mateDiaryList?.evalInfoList.length > 0 ? (
              <EvalInfo
                exhId={exhId}
                evalInfoList={mateDiaryList?.evalInfoList}
                isForMate
              />
            ) : null
          }
          ListEmptyComponent={
            <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
          }
          data={mateDiaryList?.soloDiaryInfoList ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <SoloNote soloDiary={item} />}
        />
      </BodyFrame>
    </PageFrame>
  );
};

export default MateDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;
