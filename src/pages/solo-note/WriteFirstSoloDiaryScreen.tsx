import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {
  useWriteDiaryActions,
  useWriteFirstDiaryInfo,
  useWriteSecondDiaryInfo,
  useWriteThirdDiaryInfo,
} from '~/zustand/soloDiary';
import {changeDateTimeFormat} from '~/components/util/date';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {showToast} from '~/components/util/showToast';
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
import {RootStackParamList} from '~/navigationTypes';
import PageFrame from '~/components/PageFrame';
import {
  QuestionType,
  randomQuestion,
} from '~/features/solo-note/util/randomQuestion';
import {useQuestionInfo} from '~/zustand/questionInfo';

type WriteNewSoloDiaryProp = RouteProp<
  RootStackParamList,
  'WriteFirstSoloDiary'
>;

interface Props {
  route: WriteNewSoloDiaryProp;
}
/**
 * [TODO] 랜덤 질문 새로고침해서 다른 질문으로 바꿀 수 있어야함.
 */
const WriteFirstSoloDiaryScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const firstDiaryInfo = useWriteFirstDiaryInfo(); // main
  const secondDiaryInfo = useWriteSecondDiaryInfo();
  const thirdDiaryInfo = useWriteThirdDiaryInfo();
  const questionInfo = useQuestionInfo();
  const {updateFirstDiaryInfo} = useWriteDiaryActions();
  const [answerKeyword, setAnswerKeyword] = useState<string>(
    firstDiaryInfo.answer,
  );
  const [isPublic, setIsPublic] = useState<boolean>(firstDiaryInfo.isPublic);
  const [questionData, setQuestionData] = useState<QuestionType>({
    questionId: -1,
    questionText: '',
  });

  useEffect(() => {
    if (firstDiaryInfo.question === '') {
      const randomInfo = randomQuestion(
        [secondDiaryInfo.question, thirdDiaryInfo.question],
        questionInfo,
      );
      setQuestionData(randomInfo);
    } else {
      setQuestionData({
        questionId: firstDiaryInfo.questionId,
        questionText: firstDiaryInfo.question,
      });
    }
  }, []);

  const handleStore = () => {
    updateFirstDiaryInfo({
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

  const onPress = () => {
    if (checkBlankInKeyword(answerKeyword)) {
      showToast('글을 작성해주세요.');
      return;
    }
    handleStore();
    navigation.navigate('WriteSecondSoloDiary', {exhId});
  };

  return (
    <PageFrame>
      {/* header */}
      <WithBackFrame title={'기록 작성'} line={true} />
      {/* body */}
      <BodyFrame>
        <WriteSoloDiary
          answerKeyword={answerKeyword}
          setAnswerKeyword={setAnswerKeyword}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          soloDiary={{...firstDiaryInfo, soloDiaryId: 0, exhId}}
          questionData={questionData}
        />
        <ButtonView>
          <CustomTouchable onPress={onPress}>
            <NextButton>{'다음 ->'}</NextButton>
          </CustomTouchable>
        </ButtonView>
      </BodyFrame>
    </PageFrame>
  );
};

export default WriteFirstSoloDiaryScreen;

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
