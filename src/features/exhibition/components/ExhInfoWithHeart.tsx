import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ExhItemView from '../../../components/ExhItemView';
import {RootStackNavigationProp} from 'App';
import {useNavigation} from '@react-navigation/native';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import {useCreateLikeExh, useDeleteLikeExh} from '~/api/exhibition/likeExh';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';

interface ExhInfoWithHeartProps {
  exhInfo: ExhInfo;
}

const ExhInfoWithHeart: React.FC<ExhInfoWithHeartProps> = ({exhInfo}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [heart, setHeart] = useState<boolean | undefined>(exhInfo.isLikeExh);
  const {
    mutate: createLikeExh,
    isSuccess,
    isError,
    isPending,
  } = useCreateLikeExh();
  const {
    mutate: deleteLikeExh,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    isPending: isDeletePending,
  } = useDeleteLikeExh();

  useApiErrorToast(isError);
  useApiErrorToast(isDeleteError);

  useEffect(() => {
    setHeart(exhInfo.isLikeExh);
  }, [exhInfo.isLikeExh]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setHeart(prev => !prev);
  //   }
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (isDeleteSuccess) {
  //     setHeart(prev => !prev);
  //   }
  // }, [isDeleteSuccess]);

  const onPressExh = () => {
    navigation.navigate('ExhDetail', {exhId: exhInfo.exhId});
  };

  const onPressHeart = () => {
    if (!heart) {
      createLikeExh(exhInfo.exhId);
    } else {
      deleteLikeExh(exhInfo.exhId);
    }
  };

  return (
    <ExhItemView exhInfo={exhInfo} onTouch={onPressExh}>
      <LoadingModal isLoading={isPending || isDeletePending} />
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
