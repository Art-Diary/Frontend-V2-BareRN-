import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import {
  gatheringKeys,
  useFetchGatheringDetailInfo,
} from '~/api/gathering/gathering';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import GatheringMemberList from '~/features/together/components/GatheringMemberList';
import GatheringVisitExhList from '~/features/together/components/GatheringVisitExhList';
import {DASH_WIDTH} from '~/components/util/style';
import responsive from '~/components/util/responsiveSize';
import {LIGHT_GREY} from '~/components/util/colors';
import PageFrame from '~/components/PageFrame';
import {useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GatheringDetailProp = RouteProp<RootStackParamList, 'GatheringDetail'>;

interface Props {
  route: GatheringDetailProp;
}

const GatheringDetailScreen: React.FC<Props> = ({route}) => {
  const {gatheringId} = route.params;
  const queryClient = useQueryClient();
  const havePushNoti = AsyncStorage.getItem('invitedGatheringPushNoti');

  // API Hooks
  const {
    data: gatheringDetailInfo,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringDetailInfo(gatheringId);

  useApiErrorToast(isError);

  useEffect(() => {
    const checkPushNoti = async () => {
      if ((await havePushNoti) === 'yes') {
        queryClient.invalidateQueries({
          queryKey: gatheringKeys.fetchGatheringList(),
        });
        await AsyncStorage.setItem('invitedGatheringPushNoti', 'no');
      }
    };
    checkPushNoti();
  }, [havePushNoti]);

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      {/* header */}
      {gatheringDetailInfo && (
        <>
          <WithBackFrame
            title={gatheringDetailInfo.gatheringName ?? ''}
            line={true}
          />
          {/* body */}
          {isSuccess && (
            <>
              {/* 모임 멤버 목록 */}
              <GatheringMemberList
                gatheringId={gatheringDetailInfo.gatheringId}
                memberList={gatheringDetailInfo.mates}
              />
              <DotLine />
              {/* 전시회 목록 */}
              <GatheringVisitExhList
                gatheringId={gatheringDetailInfo.gatheringId}
                visitExhList={gatheringDetailInfo.exhibitions}
              />
            </>
          )}
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
