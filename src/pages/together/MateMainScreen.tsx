import React from 'react';
import styled from 'styled-components/native';
import Header from '~/components/Header';
import {LIGHT_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {DASH_WIDTH} from '~/components/util/style';
import GatheringList from '~/features/together/components/GatheringList';
import MateList from '~/features/together/components/MateList';
import PageFrame from '~/components/PageFrame';

const MateMainScreen = () => {
  return (
    <PageFrame>
      {/* header */}
      <Header title={'전시메이트'} />
      {/* body */}
      {/* 모임 목록 */}
      <GatheringList />
      <DotLine />
      {/* 친구 목록 */}
      <MateList />
    </PageFrame>
  );
};

export default MateMainScreen;

/** style */
const DotLine = styled.View`
  width: 100%;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  border-style: dashed;
  padding-top: ${responsive(15)}px;
  margin-bottom: ${responsive(15)}px;
`;
