import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {MoreContentsIcon, ReduceContentsIcon} from '~/components/icon';
import {DARK_GREY, LIGHT_GREY, MIDDLE_GREY} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {DASH_WIDTH, FONT_NAME} from '~/components/util/style';
import {P} from '@expo/html-elements';

interface Props {
  intro: string | undefined;
  source: string;
  modalOpen?: boolean;
}

const ExhDetailInfoIntro: React.FC<Props> = ({intro, source, modalOpen}) => {
  const [isMoreContent, setIsMoreContent] = useState<boolean>(false);
  const memoizedHtmlContent = useMemo(() => {
    return intro;
  }, [intro]);

  const showMore = () => {
    setIsMoreContent(true);
  };

  const backToIntro = () => {
    setIsMoreContent(false);
  };

  const renderHtmlContent = useMemo(
    () => (
      <P style={styles.render}>
        {!memoizedHtmlContent
          ? '전시회 소개글이 없습니다.'
          : memoizedHtmlContent.length > 300 && !isMoreContent
          ? memoizedHtmlContent.substring(0, 300) + '...'
          : memoizedHtmlContent}
      </P>
    ),
    [memoizedHtmlContent, isMoreContent],
  );

  return (
    <IntroduceView modalOpen={modalOpen}>
      <Title>소개</Title>
      {!memoizedHtmlContent ? (
        <NotIntroText>전시회 소개글이 없습니다.</NotIntroText>
      ) : (
        renderHtmlContent
      )}
      <Source>
        출처: {source[0] === '©' ? '' : '©'}
        {source}
      </Source>
      {/* 아이콘 */}
      {memoizedHtmlContent && memoizedHtmlContent.length > 300 && (
        <ColWrapper>
          <ArrowButton onPress={isMoreContent ? backToIntro : showMore}>
            {isMoreContent ? <ReduceContentsIcon /> : <MoreContentsIcon />}
          </ArrowButton>
        </ColWrapper>
      )}
    </IntroduceView>
  );
};

export default ExhDetailInfoIntro;

/** style */
// introduce section
interface IntroduceProps {
  modalOpen: boolean;
}

const IntroduceView = styled.View<IntroduceProps>`
  flex-direction: column;
  width: 100%;
  padding: ${responsive(15)}px;
  border-style: dashed;
  border-bottom-width: ${(props: IntroduceProps) =>
    !props.modalOpen ? `${DASH_WIDTH}px` : `0px`};
  border-bottom-color: ${LIGHT_GREY};
  gap: ${responsive(5)}px;
`;

const Title = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const NotIntroText = styled.Text`
  font-size: ${responsive(15)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${responsive(8)}px;
`;

const Source = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-right: ${responsive(2)}px;
  text-align: right;
  line-height: ${responsive(17)}px;
`;

const ColWrapper = styled.View`
  align-items: center;
`;

const ArrowButton = styled.TouchableOpacity`
  padding: ${responsive(2)}px;
`;

const styles = StyleSheet.create({
  render: {
    fontFamily: FONT_NAME,
    color: DARK_GREY,
    fontSize: responsive(15),
    paddingHorizontal: responsive(2),
  },
});
