import React from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchGatheringDetailInfo} from '~/api/gathering/gathering';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import GatheringMemberList from '~/features/together/components/GatheringMemberList';
import GatheringVisitExhList from '~/features/together/components/GatheringVisitExhList';
import {DASH_WIDTH} from '~/components/util/style';
import responsive from '~/components/util/responsiveSize';
import {LIGHT_GREY} from '~/components/util/colors';
import PageFrame from '~/components/PageFrame';

type GatheringDetailProp = RouteProp<RootStackParamList, 'GatheringDetail'>;

interface Props {
  route: GatheringDetailProp;
}

const GatheringDetailScreen: React.FC<Props> = ({route}) => {
  const {gatheringInfo} = route.params;

  // API Hooks
  const {
    data: gatheringDetailInfo,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringDetailInfo(gatheringInfo.gatheringId);

  useApiErrorToast(isError);

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      {/* header */}
      <WithBackFrame title={gatheringInfo.gatheringName ?? ''} line={true} />
      {/* body */}
      {isSuccess && (
        <>
          {/* 모임 멤버 목록 */}
          <GatheringMemberList
            gatheringId={gatheringInfo.gatheringId}
            memberList={gatheringDetailInfo.mates}
          />
          <DotLine />
          {/* 전시회 목록 */}
          <GatheringVisitExhList
            gatheringId={gatheringInfo.gatheringId}
            visitExhList={gatheringDetailInfo.exhibitions}
          />
        </>
      )}
    </PageFrame>
  );
};

export default GatheringDetailScreen;

/** style */
const DotLine = styled.View`
  width: 100%;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  border-style: dashed;
  padding-top: ${responsive(15)}px;
  margin-bottom: ${responsive(15)}px;
`;
