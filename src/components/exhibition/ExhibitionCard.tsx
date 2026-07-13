import React from 'react';
import {Heart} from 'lucide-react-native';
import {Exhibition} from '~/types/exhibition';
import {
  Bottom,
  Container,
  Content,
  DetailBadge,
  DetailText,
  Info,
  LikeButton,
  Poster,
  PosterContainer,
  Subtitle,
  Title,
  Date,
} from './ExhibitionCard.styles';
import CustomTouchable from '../common/CustomTouchable';
import {
  useCreateLikeExhibition,
  useDeleteLikeExhibition,
} from '~/api/exhibition/likeExh';

interface Props {
  exhibition: Exhibition;
  onPress: () => void;
}

const ExhibitionCard = ({exhibition, onPress}: Props) => {
  const {mutate: createLike} = useCreateLikeExhibition();
  const {mutate: deleteLike} = useDeleteLikeExhibition();

  const handleLike = () => {
    if (exhibition.liked) {
      deleteLike(exhibition.exhId);
    } else {
      createLike(exhibition.exhId);
    }
  };

  return (
    <CustomTouchable onPress={onPress}>
      <Container>
        <PosterContainer>
          <Poster
            source={{
              uri: exhibition.poster,
            }}
          />

          <LikeButton
            hitSlop={8}
            onPress={handleLike}
            style={({pressed}: {pressed: Boolean}) => ({
              opacity: pressed ? 0.85 : 1,
            })}>
            <Heart
              size={14}
              color="#F87171"
              fill={exhibition.liked ? '#F87171' : 'none'}
            />
          </LikeButton>
        </PosterContainer>

        <Content>
          <Info>
            <Title numberOfLines={1}>{exhibition.exhName}</Title>

            <Subtitle numberOfLines={1}>
              {exhibition.painter} · {exhibition.gallery}
            </Subtitle>
          </Info>

          <Bottom>
            <Date>
              {exhibition.startDate} ~ {exhibition.endDate}
            </Date>

            <DetailBadge>
              <DetailText>상세 보기</DetailText>
            </DetailBadge>
          </Bottom>
        </Content>
      </Container>
    </CustomTouchable>
  );
};

export default ExhibitionCard;
