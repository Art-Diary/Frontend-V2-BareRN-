import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import PageFrame from '~/components/common/PageFrame';
import WithBackFrame from '~/components/common/WithBackFrame';
import SoloQuestionCard from '~/components/solo/SoloQuestionCard';
import SoloDetailFooter from '~/components/solo/SoloDetailFooter';

import * as S from './QuestionScreen.style';

import {RootStackParamList} from '~/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDiaryQuestionStore} from '~/zustand/diaryQuestionStore';
import {useCreateSoloDiary} from '~/api/solo/diary';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';

type Route = RouteProp<RootStackParamList, 'Question'>;

type QuestionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Question'
>;

const QuestionScreen = () => {
  const navigation = useNavigation<QuestionNavigationProp>();

  const route = useRoute<Route>();

  const {visitId, index, questions} = route.params;

  const {answers, setAnswer, getAnswer, resetAnswers} = useDiaryQuestionStore();

  const {
    mutateAsync: createSoloDiary,
    isPending,
    isError,
  } = useCreateSoloDiary();

  useApiErrorToast(isError);

  const question = questions[index];
  const answer = getAnswer(question.questionId);

  const handleNext = async () => {
    if (index === questions.length - 1) {
      try {
        await createSoloDiary({
          visitId,
          answers,
        });

        resetAnswers();

        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Main',
              params: {
                screen: 'Solo',
              },
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }

      return;
    } else {
      navigation.push('Question', {
        visitId,
        index: index + 1,
        questions,
      });
    }
  };

  const handleSkip = () => {
    // setAnswer(question.questionId, '');
    handleNext();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LoadingModal isLoading={isPending} />
      <PageFrame>
        <WithBackFrame
          title={`일기 적기 (${index + 1}/${questions.length})`}
          line={false}
        />

        <S.Content>
          <SoloQuestionCard
            question={question.questionContent}
            answer={answer}
            onChangeAnswer={value => setAnswer(question.questionId, value)}
          />

          <SoloDetailFooter
            isLastStep={index === questions.length - 1}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        </S.Content>
      </PageFrame>
    </KeyboardAvoidingView>
  );
};

export default QuestionScreen;
