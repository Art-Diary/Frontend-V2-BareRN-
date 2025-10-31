import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {getDateDay} from './util/date';
import {FONT_NAME} from './util/style';
import {DARK_GREY, MIDDLE_GREY} from './util/colors';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import responsive from './util/responsiveSize';

interface ExhItemViewProps {
  exhInfo: ExhInfo;
  children?: ReactNode;
  notTouchable?: boolean;
  onTouch?: (something: any) => void;
  gatheringName?: string;
  gatherColor?: string;
}

const ExhItemView: React.FC<ExhItemViewProps> = ({
  exhInfo,
  children,
  notTouchable,
  onTouch,
  gatheringName,
  gatherColor,
}) => {
  const changeExhDateFormat = (
    exhPeriodStart: string,
    exhPeriodEnd: string,
  ): string => {
    const start = exhPeriodStart;
    const end = exhPeriodEnd;
    const startDay = getDateDay(exhPeriodStart);
    const endDay = getDateDay(exhPeriodEnd);
    return start + ' (' + startDay + ')' + ' ~ ' + end + ' (' + endDay + ')';
  };

  return (
    <Container>
      <TouchView disabled={notTouchable} activeOpacity={0.6} onPress={onTouch}>
        <PosterWapper>
          <Poster
            source={{uri: `${exhInfo?.poster}`}}
            alt={'이미지 읽기 실패'}
            // resizeMode='contain'
          />
        </PosterWapper>
        <ExhInfoView haveChildren={children}>
          <ExhName numberOfLines={1} ellipsizeMode="tail">
            {exhInfo.exhName}
          </ExhName>
          <ExhWrapper>
            <ExhGallery>{exhInfo.gallery}</ExhGallery>
            <ExhDate>
              {changeExhDateFormat(exhInfo.startDate, exhInfo.endDate)}
            </ExhDate>
            {gatheringName && (
              <GatheringName color={gatherColor}>
                #{gatheringName}
              </GatheringName>
            )}
          </ExhWrapper>
        </ExhInfoView>
      </TouchView>
      {children}
    </Container>
  );
};
export default ExhItemView;

/** style */
const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  border-radius: ${responsive(15)}px;
  background-color: white;
  height: ${responsive(108)}px;
  margin-bottom: ${responsive(8)}px;
`;

const TouchView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  gap: ${responsive(12)}px;
`;

const PosterWapper = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: ${responsive(15)}px;
  overflow: hidden;
`;

const Poster = styled.Image`
  width: ${responsive(77)}px;
  height: 100%;
`;

const ExhInfoView = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${responsive(3)}px;
  padding-bottom: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
  justify-content: space-between;
`;

const ExhName = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${responsive(35)}px;
`;

const ExhWrapper = styled.View`
  gap: ${responsive(5)}px;
`;

const ExhGallery = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ExhDate = styled.Text`
  font-size: ${responsive(13.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

interface GatheringNameProps {
  color: string;
}

const GatheringName = styled.Text<GatheringNameProps>`
  font-size: ${responsive(15)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  color: ${(props: GatheringNameProps) =>
    props.color ? `${props.color}` : `${DARK_GREY}`};
`;
