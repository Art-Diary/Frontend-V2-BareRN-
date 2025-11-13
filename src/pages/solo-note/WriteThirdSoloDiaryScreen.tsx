import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import {
  useWriteDiaryActions,
  useWriteEvaluationInfo,
  useWriteFirstDiaryInfo,
  useWriteInitEval,
  useWriteSecondDiaryInfo,
  useWriteThirdDiaryInfo,
} from '~/zustand/soloDiary';
import {useCreateSoloDiary} from '~/api/solo-note/soloDiary';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {showToast} from '~/components/util/showToast';
import {changeDateTimeFormat} from '~/components/util/date';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import BodyFrame from '~/components/BodyFrame';
import WriteSoloDiary from '~/features/solo-note/component/WriteSoloDiary';
import CustomTouchable from '~/components/CustomTouchable';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  FONT_NAME,
} from '~/components/util/style';
import {DARK_GREY} from '~/components/util/colors';
import {RootStackNavigationProp} from '~/App';
import {useQuestionInfo} from '~/zustand/questionInfo';
import {
  QuestionType,
  randomQuestion,
} from '~/features/solo-note/util/randomQuestion';

type WriteNewSoloDiaryProp = RouteProp<
  RootStackParamList,
  'WriteThirdSoloDiary'
>;

interface Props {
  route: WriteNewSoloDiaryProp;
}

const WriteThirdSoloDiaryScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const initEval = useWriteInitEval();
  const evaluationInfo = useWriteEvaluationInfo();
  const thirdDiaryInfo = useWriteThirdDiaryInfo(); // main
  const firstDiaryInfo = useWriteFirstDiaryInfo();
  const secondDiaryInfo = useWriteSecondDiaryInfo();
  const questionInfo = useQuestionInfo();
  const {updateThirdDiaryInfo} = useWriteDiaryActions();
  const [answerKeyword, setAnswerKeyword] = useState<string>(
    thirdDiaryInfo.answer,
  );
  const [isPublic, setIsPublic] = useState<boolean>(thirdDiaryInfo.isPublic);
  const [questionData, setQuestionData] = useState<QuestionType>({
    questionId: -1,
    questionText: '',
  });

  const {
    mutate: createSoloDiary,
    isError,
    isSuccess,
    isPending,
  } = useCreateSoloDiary(exhId);

  useApiErrorToast(isError);

  useEffect(() => {
    if (isSuccess) {
      navigation.pop(initEval ? 4 : 3);
    }
  }, [isSuccess]);

  const onPress = () => {
    if (checkBlankInKeyword(answerKeyword)) {
      showToast('글을 작성해주세요.');
      return;
    }
    // 백엔드 완료되면 수정하기
    createSoloDiary({
      initEval: initEval,
      exhId: exhId,
      evalChoiceInfoList: evaluationInfo,
      soloDiaryInfoList: [
        firstDiaryInfo,
        secondDiaryInfo,
        {
          questionId: questionData.questionId,
          question: questionData.questionText,
          answer: answerKeyword,
          writeDate: changeDateTimeFormat(new Date()),
          isPublic: isPublic,
        },
      ],
    });
  };

  useEffect(() => {
    if (thirdDiaryInfo.question === '') {
      const randomInfo = randomQuestion(
        [firstDiaryInfo.question, secondDiaryInfo.question],
        questionInfo,
      );
      setQuestionData(randomInfo);
    } else {
      setQuestionData({
        questionId: thirdDiaryInfo.questionId,
        questionText: thirdDiaryInfo.question,
      });
    }
  }, []);

  const handleStore = () => {
    updateThirdDiaryInfo({
      questionId: questionData.questionId,
      question: questionData.questionText,
      answer: answerKeyword,
      writeDate: changeDateTimeFormat(new Date()),
      isPublic: isPublic,
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      handleStore();
    });
    return unsub;
  }, [navigation, handleStore]);

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      {/* header */}
      <WithBackFrame title={'기록 작성'} line={true} />
      {/* body */}
      <BodyFrame>
        <WriteSoloDiary
          answerKeyword={answerKeyword}
          setAnswerKeyword={setAnswerKeyword}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          soloDiary={{...thirdDiaryInfo, soloDiaryId: 0, exhId}}
          questionData={questionData}
        />
        <ButtonView>
          <CustomTouchable onPress={onPress}>
            <NextButton>{'완료 ->'}</NextButton>
          </CustomTouchable>
        </ButtonView>
      </BodyFrame>
    </PageFrame>
  );
};

export default WriteThirdSoloDiaryScreen;

/** style */
const ButtonView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const NextButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  text-align: center;
  color: ${DARK_GREY};
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
