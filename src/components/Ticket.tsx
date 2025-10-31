import React from 'react';
import styled from 'styled-components/native';
import responsive from './util/responsiveSize';
import {DARK_GREY, LIGHT_GREY, MIDDLE_GREY} from './util/colors';
import {FONT_NAME} from './util/style';
import {BarcodeIcon} from './icon';

interface TicketProps {
  poster: string;
  exhName: string;
  gallery: string;
  visitDate: string;
  exhId: number;
  handleClick: (exhId: number) => void;
}

const Ticket: React.FC<TicketProps> = ({
  poster,
  exhName,
  gallery,
  visitDate,
  exhId,
  handleClick,
}) => {
  return (
    <Container activeOpacity={0.6} onPress={() => handleClick(exhId)}>
      <Content>
        <PosterWrapper>
          <Poster
            source={{
              uri: `${poster}`,
            }}
            alt={'이미지 읽기 실패'}
            resizeMode="contain"
          />
        </PosterWrapper>
        <InfoWrapper>
          <Info>
            <ExhTitle numberOfLines={2} ellipsizeMode="tail">
              {exhName}
            </ExhTitle>
            <Gallery>{gallery}</Gallery>
          </Info>
          <VisitDate>{visitDate}</VisitDate>
        </InfoWrapper>
      </Content>
      <BarcodeView>
        <BarcodeIcon />
      </BarcodeView>
    </Container>
  );
};

export default Ticket;

/** style */
const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: ${responsive(102)}px;
  background-color: white;
  justify-content: space-between;
  margin-bottom: ${responsive(7)}px;
`;

const Content = styled.View`
  gap: ${responsive(5)}px;
  flex-direction: row;
  width: 90%;
`;

const PosterWrapper = styled.View`
  border-style: dashed;
  border-color: ${LIGHT_GREY};
  border-right-width: ${responsive(1)}px;
  align-items: center;
  justify-content: center;
`;

const Poster = styled.Image`
  width: ${responsive(73)}px;
  height: 100%;
`;

const InfoWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding: ${responsive(10)}px;
  width: 75%;
`;

const Info = styled.View`
  flex-direction: column;
  gap: ${responsive(5)}px;
`;

const ExhTitle = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Gallery = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const VisitDate = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-align: right;
`;

const BarcodeView = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-right: ${responsive(5)}px;
`;
