import React from 'react';

import * as S from './ReviewList.styles';
import {useFetchExhibitionReviewListInfo} from '~/api/exhibition/exhibition';
import {Review} from '~/types/exhibition';
import LoadingModal from '../modal/LoadingModal';

interface Props {
  exhId: number;
}

export default function ReviewList({exhId}: Props) {
  const {
    data: reviewList,
    isLoading,
    isError,
  } = useFetchExhibitionReviewListInfo(exhId);

  if (isLoading) {
    return <LoadingModal isLoading />;
  }

  if (isError || !reviewList) {
    return <S.Container />;
  }

  return reviewList.map((review: Review) => (
    <S.Container>
      <S.ReviewText>{review.answerContent}</S.ReviewText>
    </S.Container>
  ));
}
