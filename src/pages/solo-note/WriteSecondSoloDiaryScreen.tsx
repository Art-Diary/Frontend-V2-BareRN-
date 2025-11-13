import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  useWriteDiaryActions,
  useWriteFirstDiaryInfo,
  useWriteSecondDiaryInfo,
  useWriteThirdDiaryInfo,
} from '~/zustand/soloDiary';
import {changeDateTimeFormat} from '~/components/util/date';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {showToast} from '~/components/util/showToast';
import PageFrame from '~/components/PageFrame';
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
import {RootStackNavigationProp} from '~/App';
import {
  QuestionType,
  randomQuestion,
} from '~/features/solo-note/util/randomQuestion';
import {useQuestionInfo} from '~/zustand/questionInfo';

type WriteNewSoloDiaryProp = RouteProp<
  RootStackParamList,
  'WriteSecondSoloDiary'
>;

interface Props {
  route: WriteNewSoloDiaryProp;
}

const WriteSecondSoloDiaryScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const secondDiaryInfo = useWriteSecondDiaryInfo(); // main
  const firstDiaryInfo = useWriteFirstDiaryInfo();
  const thirdDiaryInfo = useWriteThirdDiaryInfo();
  const questionInfo = useQuestionInfo();
  const {updateSecondDiaryInfo} = useWriteDiaryActions();
  const [answerKeyword, setAnswerKeyword] = useState<string>(
    secondDiaryInfo.answer,
  );
  const [isPublic, setIsPublic] = useState<boolean>(secondDiaryInfo.isPublic);
  const [questionData, setQuestionData] = useState<QuestionType>({
    questionId: -1,
    questionText: '',
  });

  useEffect(() => {
    if (secondDiaryInfo.question === '') {
      const randomInfo = randomQuestion(
        [firstDiaryInfo.question, thirdDiaryInfo.question],
        questionInfo,
      );
      setQuestionData(randomInfo);
    } else {
      setQuestionData({
        questionId: secondDiaryInfo.questionId,
        questionText: secondDiaryInfo.question,
      });
    }
  }, []);

  const handleStore = () => {
    updateSecondDiaryInfo({
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
    navigation.navigate('WriteThirdSoloDiary', {exhId});
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
          soloDiary={{...secondDiaryInfo, soloDiaryId: 0, exhId}}
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

export default WriteSecondSoloDiaryScreen;

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
