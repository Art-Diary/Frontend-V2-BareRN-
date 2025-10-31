import React, {useCallback, useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from 'App';
import {BackHandler, Linking} from 'react-native';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchExhibitionDetailInfo} from '~/api/exhibition/exhibitionInfo';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {showToast} from '~/components/util/showToast';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import {
  BackButtonIcon,
  CalendarShareIcon,
  HomepageIcon,
} from '~/components/icon';
import responsive from '~/components/util/responsiveSize';
import ExhShare from '~/features/exhibition/components/ExhShare';
import ExhDetailFormat from '~/features/exhibition/components/ExhDetailFormat';
import ExhReviewList from '~/features/exhibition/components/ExhReviewList';

type ExhDetailProp = RouteProp<RootStackParamList, 'ExhDetail'>;

interface Props {
  route: ExhDetailProp;
}
// [TODO] 하트가 목록과 다를 때 새로 불러오기 하기
const ExhDetailScreen: React.FC<Props> = ({route}) => {
  //   const {modalOpen} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const {exhId} = route.params;
  // API Hooks
  const {
    data: exhDetailInfo,
    isLoading,
    isError,
  } = useFetchExhibitionDetailInfo(exhId);
  useApiErrorToast(isError);

  const handlePressBack = useCallback(() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return true;
    }
    return false;
  }, [navigation]);

  useEffect(() => {
    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      handlePressBack,
    );
    return () => sub.remove();
  }, [handlePressBack]);

  const exhToHomepage = async (homepageLink: string) => {
    // 주어진 URL을 열 수 있는지 확인합니다.
    const supported = await Linking.canOpenURL(homepageLink);

    if (supported) {
      // 주어진 URL을 엽니다.
      await Linking.openURL(homepageLink);
    } else {
      showToast(`Don't know how to open this URL: ${homepageLink}`);
    }
  };

  const onPressCalendarButton = () => {
    navigation.navigate('Calendar');
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <ContainerScroll scrollEventThrottle={200}>
        {exhDetailInfo && (
          <>
            {/*전시회 세부정보 */}
            <TopLayer>
              <CustomTouchable onPress={handlePressBack}>
                <BackButtonIcon />
              </CustomTouchable>
              <IconView>
                <ExhShare exhDetailInfo={exhDetailInfo} />
                {exhDetailInfo.homepageLink && (
                  <CustomTouchable
                    onPress={() => exhToHomepage(exhDetailInfo.homepageLink)}>
                    <HomepageIcon />
                  </CustomTouchable>
                )}
                <CustomTouchable onPress={onPressCalendarButton}>
                  <CalendarShareIcon />
                </CustomTouchable>
                {/* {userInfo.authInfo.role === 'ADMIN' && (
                  <CustomTouchable onPress={handleEditExhInfo}>
                    <EditRegExhIcon />
                  </CustomTouchable>
                )} */}
              </IconView>
            </TopLayer>
            {/**전시 상세정보 */}
            <ExhDetailFormat exhDetailInfo={exhDetailInfo} state={'전시정보'} />
            {/*전시 리뷰 */}
            <ExhReviewList
              exhId={exhId}
              reviewCount={exhDetailInfo.soloDiaryCount}
              isEvalFinished={exhDetailInfo.isEvalFinished}
              isVisitedExh={exhDetailInfo.isVisitedExh}
              reviewList={exhDetailInfo.soloDiaries}
              evalInfos={exhDetailInfo.evalInfos}
            />
          </>
        )}
      </ContainerScroll>
    </PageFrame>
  );
};

export default ExhDetailScreen;

/** style */
const ContainerScroll = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

const TopLayer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${responsive(3)}px;
  padding-bottom: ${responsive(10)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
  width: 100%;
`;

const IconView = styled.View`
  flex-direction: row;
  gap: ${responsive(5)}px;
  justify-content: center;
  align-items: center;
`;
