import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {RootStackParamList} from '~/navigationTypes';
import {useFetchGatheringQuestionList} from '~/api/gathering/gatheringQuestion';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {
  useCreateGatheringDiary,
  useUpdateGatheringDiary,
} from '~/api/gathering/gatheringDiary';
import {showToast} from '~/components/util/showToast';
import responsive from '~/components/util/responsiveSize';
import {
  checkBlankInKeyword,
  removeControlCharacter,
} from '~/components/util/checkKeyword';
import {
  GatheringDiaryCReqType,
  GatheringDiaryType,
  GatheringDiaryUReqType,
} from '~/features/together/util/gatheringDiaryType';
import {changeDateTimeFormat} from '~/components/util/date';
import WithBackFrame from '~/components/WithBackFrame';
import {AddMyExhButtonIcon} from '~/components/icon';
import CustomTouchable from '~/components/CustomTouchable';
import CreateGatheringQuestionModal from '~/features/together/components/modal/CreateGatheringQuestionModal';
import LoadingModal from '~/components/modal/LoadingModal';
import BodyFrame from '~/components/BodyFrame';
import {GatheringQuestionType} from '~/features/together/util/gatheringQuestionType';
import GatheringQuestion from '~/features/together/components/GatheringQuestion';
import GatheringDiaryList from '~/features/together/components/GatheringDiaryList';
import InfoMessageView from '~/components/InfoMessageView';
import {
  BACK_COLOR,
  DARK_GREY,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import PageFrame from '~/components/PageFrame';

type GatheringDiaryProp = RouteProp<RootStackParamList, 'GatheringDiary'>;

interface Props {
  route: GatheringDiaryProp;
}

const GatheringDiaryScreen: React.FC<Props> = ({route}) => {
  const {gatheringId, exhId} = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [content, setContentKeyword] = useState<string | undefined>(undefined);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [gatheringDiaryId, setGatheringDiaryId] = useState<number>(-1);
  const {
    data: questionList,
    isError,
    isSuccess,
    isLoading,
  } = useFetchGatheringQuestionList(gatheringId, exhId);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useApiErrorToast(isError);

  const {
    mutate: createGatheringDiary,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    isPending,
  } = useCreateGatheringDiary();
  const {
    mutate: updateGatheringDiary,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
  } = useUpdateGatheringDiary();

  // Effects
  useEffect(() => {
    if (isCreateError) {
      showToast('다시 시도해 주세요.');
    }
    if (isCreateSuccess) {
      setContentKeyword(undefined);
    }
  }, [isCreateError, isCreateSuccess]);

  useEffect(() => {
    if (isUpdateError) {
      showToast('다시 시도해 주세요.');
    }
    if (isUpdateSuccess) {
      setContentKeyword(undefined);
      setIsUpdate(false);
    }
  }, [isUpdateError, isUpdateSuccess]);

  const goTo = (i: number, animated = true) => {
    setQuestionIndex(i);
    const itemWidth = responsive(500);
    const scrollToX = i * itemWidth;
    scrollViewRef.current?.scrollTo({x: scrollToX, animated});
  };

  const goPrev = () => {
    return !isUpdate && questionIndex > 0 && goTo(questionIndex - 1);
  };
  const goNext = () => {
    return (
      !isUpdate &&
      questionIndex < questionList.length - 1 &&
      goTo(questionIndex + 1)
    );
  };

  const onChangeText = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setContentKeyword(cleaned);
  }, []);

  const onPressSendButton = () => {
    // gathering_id, exh_id, question_id
    // content, write_date
    // 글 작성 여부 확인
    if (!content) {
      showToast('글을 작성해주세요.');
      return;
    }
    if (checkBlankInKeyword(content)) {
      showToast('글을 작성해주세요.');
      return;
    }

    var request: GatheringDiaryCReqType | GatheringDiaryUReqType = {
      gatheringId,
      exhId,
      questionId: questionList[questionIndex].gatheringQuestionId,
      content,
      writeDate: changeDateTimeFormat(new Date()),
    };

    if (!isUpdate) {
      createGatheringDiary(request);
    } else {
      updateGatheringDiary({...request, gatheringDiaryId});
    }
    Keyboard.dismiss();
  };

  const handleUpdateGatheringDiary = (gatheringDiary: GatheringDiaryType) => {
    setIsUpdate(true);
    setGatheringDiaryId(gatheringDiary.gatheringDiaryId);
    setContentKeyword(gatheringDiary.content);
    // [TODO] 수정하다가 그냥 새로 작성하고 싶을 땐 어떻게 하지?!
  };

  const handleModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <PageFrame>
      {/* header */}
      <WithBackFrame line={true}>
        <CustomTouchable onPress={handleModal}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
      </WithBackFrame>
      {isOpen && (
        <CreateGatheringQuestionModal
          questionInfo={undefined}
          gatheringId={gatheringId}
          exhId={exhId}
          isUpdate={false}
          handleCloseModal={handleModal}
        />
      )}
      <LoadingModal isLoading={isLoading || isPending || isUpdatePending} />
      {/* body */}
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={{flex: 1}}>
          <BodyFrame>
            <Wrapper>
              {isSuccess && questionList.length > 0 ? (
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  contentContainerStyle={{
                    width: `${100 * questionList.length}%`,
                  }}
                  scrollEventThrottle={16}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}>
                  {questionList.map(
                    (item: GatheringQuestionType, index: number) => (
                      <Wrapper key={index}>
                        {/* question header  */}
                        <ArrowView>
                          <Pressable onPress={goPrev}>
                            <ArrowText move={index !== 0 && !isUpdate}>
                              {'<'}
                            </ArrowText>
                          </Pressable>

                          <GatheringQuestion
                            questionInfo={item}
                            gatheringId={gatheringId}
                            exhId={exhId}
                          />

                          <Pressable onPress={goNext}>
                            <ArrowText
                              move={
                                index !== questionList.length - 1 && !isUpdate
                              }>
                              {'>'}
                            </ArrowText>
                          </Pressable>
                        </ArrowView>
                        {/* answer list body */}
                        <GatheringDiaryList
                          gatheringId={gatheringId}
                          exhId={exhId}
                          questionId={item.gatheringQuestionId}
                          active={index === questionIndex}
                          handleUpdateGatheringDiary={
                            handleUpdateGatheringDiary
                          }
                        />
                      </Wrapper>
                    ),
                  )}
                </ScrollView>
              ) : (
                <InfoMessageView
                  message={'아직 전시회에 대한 기록이 없습니다.'}
                />
              )}
            </Wrapper>
            {/* write section */}
            {isSuccess && questionList.length > 0 && (
              <WriteSection>
                <ContentTextInput
                  onChangeText={onChangeText}
                  placeholderTextColor={MIDDLE_GREY}
                  placeholder={content ?? '너의 생각은?'}
                  value={content}
                  multiline
                  blurOnSubmit={false}
                />
                {/* 완료 버튼 만들기 */}
                <CustomTouchable onPress={onPressSendButton}>
                  <ProfileWrapper>
                    <Profile
                      source={{uri: `${process.env.DEFAULT_IMAGE}`}}
                      resizeMode="cover"
                      alt={'이미지'}
                    />
                  </ProfileWrapper>
                </CustomTouchable>
              </WriteSection>
            )}
          </BodyFrame>
        </KeyboardAvoidingView>
      </View>
    </PageFrame>
  );
};

export default GatheringDiaryScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const ArrowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface ArrowTextProps {
  move: boolean;
}

const ArrowText = styled.Text<ArrowTextProps>`
  font-size: ${responsive(22)}px;
  color: ${(props: ArrowTextProps) =>
    props.move ? `${MIDDLE_GREY}` : `${BACK_COLOR}`};
  font-family: ${FONT_NAME};
  text-align: center;
  padding: ${responsive(5)}px;
`;

const WriteSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${responsive(7)}px;
`;

const ContentTextInput = styled.TextInput`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-bottom: ${responsive(7)}px;
  background-color: ${TEXTINPUTFORM_COLOR};
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(10)}px;
  border-radius: ${responsive(20)}px;
  padding: ${responsive(17)}px;
  width: 92%;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(37)}px;
  height: ${responsive(37)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
