import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {ExhibitionDetailType} from '../util/exhibitionType';
import ExhDetailInfoIntro from './ExhDetailInfoIntro';
import ExhDetailHeart from './ExhDetailHeart';
import {dateToString} from '~/components/util/date';
import {showToast} from '~/components/util/showToast';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

interface Props {
  exhDetailInfo: ExhibitionDetailType;
  state: '미리보기' | '전시정보';
  modalOpen?: boolean;
}

const ExhDetailFormat: React.FC<Props> = ({
  exhDetailInfo,
  state,
  modalOpen,
}) => {
  const checkExhState = (): string => {
    const currentDate = dateToString(new Date());

    if (currentDate > exhDetailInfo.endDate) {
      // 진행상황 확인
      return '종료';
    } else if (
      currentDate >= exhDetailInfo.startDate &&
      currentDate <= exhDetailInfo.endDate
    ) {
      return '진행중';
    } else if (currentDate < exhDetailInfo.startDate) {
      return '예정';
    }
    return '';
  };

  const exhToHomepage = async (url: string) => {
    // 주어진 URL을 열 수 있는지 확인합니다.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 주어진 URL을 엽니다.
      await Linking.openURL(url);
    } else {
      showToast(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Container>
      {exhDetailInfo && (
        <>
          <TopView>
            <BackgroundImage
              source={{uri: `${exhDetailInfo.poster}`}}
              blurRadius={8}
              resizeMode="cover"
              alt={'이미지 읽기 실패'}>
              <ForegroundImage
                source={{uri: `${exhDetailInfo.poster}`}}
                resizeMode="contain"
                alt={'이미지 읽기 실패'}
              />
            </BackgroundImage>
            {state == '전시정보' && exhDetailInfo.isLikeExh != null && (
              <ExhDetailHeart
                exhId={exhDetailInfo.exhId}
                heartState={exhDetailInfo.isLikeExh}
              />
            )}
          </TopView>
          <InfoListView>
            <Title>{exhDetailInfo.exhName}</Title>
            {state == '전시정보' && (
              <StateView>
                <StateText state={checkExhState()}>{checkExhState()}</StateText>
              </StateView>
            )}
            <InfoView>
              <InfoTitle>{'장소'}</InfoTitle>
              <Info>{exhDetailInfo.gallery}</Info>
            </InfoView>
            <InfoView>
              <InfoTitle>{'일정'}</InfoTitle>
              <Info>
                {exhDetailInfo.startDate + ' ~ ' + exhDetailInfo.endDate}
              </Info>
            </InfoView>
            {exhDetailInfo.painter && (
              <InfoView>
                <InfoTitle>{'작가'}</InfoTitle>
                <Info>{exhDetailInfo.painter}</Info>
              </InfoView>
            )}
            <InfoView>
              <InfoTitle>{'관람료'}</InfoTitle>
              <Info>
                {exhDetailInfo.fee}
                {'원'}
              </Info>
            </InfoView>
            {state == '미리보기' &&
              exhDetailInfo.homepageLink != '홈페이지 정보 없음.' && (
                <InfoView>
                  <InfoTitle>{'홈페이지'}</InfoTitle>
                  <TouchableOpacity
                    onPress={() => exhToHomepage(exhDetailInfo.homepageLink)}>
                    <InfoUrl multiline={true}>
                      {exhDetailInfo.homepageLink}
                    </InfoUrl>
                  </TouchableOpacity>
                </InfoView>
              )}
          </InfoListView>
          {/* 소개 */}
          {state === '전시정보' && (
            <ExhDetailInfoIntro
              intro={exhDetailInfo.intro}
              source={exhDetailInfo.source ?? ''}
              modalOpen={modalOpen}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ExhDetailFormat;

/** style */
const Container = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

const Title = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${responsive(26)}px;
`;

// poster section
const TopView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: ${responsive(235)}px;
`;

const ForegroundImage = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

// info section
const InfoListView = styled.View`
  flex-direction: column;
  padding: ${responsive(15)}px;
  gap: ${responsive(5)}px;
  border-style: dashed;
  border-bottom-width: ${responsive(1.3)}px;
  border-bottom-color: ${LIGHT_GREY};
`;

interface StateTextProps {
  state: string;
}

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${responsive(2)}px;
  padding-bottom: ${responsive(10)}px;
`;

const StateText = styled.Text<StateTextProps>`
  font-size: ${responsive(12)}px;
  text-align: center;
  font-family: ${FONT_NAME};
  padding-top: ${responsive(3)}px;
  padding-bottom: ${responsive(2)}px;
  padding-left: ${responsive(6)}px;
  padding-right: ${responsive(6)}px;
  color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
      ? `${MIDDLE_GREY}`
      : 'yellow'};
  border-color: ${(props: StateTextProps) =>
    props.state === '진행중'
      ? `${MAIN_COLOR}`
      : props.state === '종료'
      ? `${MIDDLE_GREY}`
      : 'yellow'};
  border-width: ${responsive(1.2)}px;
  border-radius: ${responsive(50)}px;
`;

const InfoView = styled.View`
  flex-direction: row;
  gap: ${responsive(15)}px;
`;

const InfoTitle = styled.Text`
  font-size: ${responsive(15)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const Info = styled.Text`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  font-size: ${responsive(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const InfoUrl = styled.Text`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  font-size: ${responsive(14.2)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-decoration: underline;
`;
