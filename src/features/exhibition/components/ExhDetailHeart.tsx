import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useCreateLikeExh, useDeleteLikeExh} from '~/api/exhibition/likeExh';
import CustomTouchable from '~/components/CustomTouchable';
import {EmptyHeartIcon, FullHeartIcon} from '~/components/icon';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';

interface Props {
  exhId: number;
  heartState: boolean;
}

const ExhDetailHeart: React.FC<Props> = ({exhId, heartState}) => {
  const [heart, setHeart] = useState<boolean>(heartState);
  const {
    mutate: createLikeExh,
    isSuccess,
    isError,
    isPending,
    error,
  } = useCreateLikeExh();
  const {
    mutate: deleteLikeExh,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeleteLikeExh();

  useEffect(() => {
    setHeart(heartState);
  }, [heartState]);

  useEffect(() => {
    if (isError) {
      const errorMsg = error.message;

      if (errorMsg.includes('409')) {
        showToast('이미 좋아요 설정 완료했습니다.');
      } else {
        showToast('다시 시도해 주세요.');
      }
    }
    // if (isSuccess) {
    //   setHeart(prev => !prev);
    // }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      const errorMsg = deleteError.message;

      if (errorMsg.includes('409')) {
        showToast('이미 좋아요 해제 완료했습니다.');
      } else {
        showToast('다시 시도해 주세요.');
      }
    }
    // if (isDeleteSuccess) {
    //   setHeart(prev => !prev);
    // }
  }, [isDeleteError, isDeleteSuccess]);

  const onPressHeart = (exhId: number) => {
    if (!heart) {
      createLikeExh(exhId);
    } else {
      deleteLikeExh(exhId);
    }
  };

  return (
    <TopLayer>
      <LoadingModal isLoading={isPending || isDeletePending} />
      <EmptyHeartContent>
        <CustomTouchable onPress={() => onPressHeart(exhId)}>
          {heart ? <FullHeartIcon /> : <EmptyHeartIcon />}
        </CustomTouchable>
      </EmptyHeartContent>
    </TopLayer>
  );
};

export default ExhDetailHeart;

/** style */
const TopLayer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${responsive(15)}px;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: flex-end;
`;

const EmptyHeartContent = styled.View`
  flex-direction: column;
  justify-content: flex-end;
`;
