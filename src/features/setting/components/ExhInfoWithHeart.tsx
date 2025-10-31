import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ExhItemView from '../../../components/ExhItemView';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import CustomTouchable from '~/components/CustomTouchable';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';

interface ExhInfoWithHeartProps {
  exhInfo: ExhInfo;
  handleToggle: (exhId: number) => void;
}

const ExhInfoWithHeart: React.FC<ExhInfoWithHeartProps> = ({
  exhInfo,
  handleToggle,
}) => {
  const [heart, setHeart] = useState<boolean | undefined>(exhInfo.isLikeExh);

  useEffect(() => {
    setHeart(exhInfo.isLikeExh);
  }, [exhInfo.isLikeExh]);

  const onPressHeart = () => {
    setHeart(prev => !prev);
    handleToggle(exhInfo.exhId);
  };

  return (
    <ExhItemView exhInfo={exhInfo} notTouchable={true}>
      <InfoButtonView>
        <CustomTouchable onPress={onPressHeart}>
          {heart ? <FullHeartIcon /> : <EmptyHeartIcon />}
        </CustomTouchable>
      </InfoButtonView>
    </ExhItemView>
  );
};

export default ExhInfoWithHeart;

/** style */
const InfoButtonView = styled.View`
  justify-content: flex-end;
  padding-top: ${responsive(10)}px;
  padding-right: ${responsive(15)}px;
  padding-bottom: ${responsive(10)}px;
  height: 100%;
  border: 1px;
  border-color: white;
  border-radius: ${responsive(15)}px;
`;
