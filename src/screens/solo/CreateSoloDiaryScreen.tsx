import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import PageFrame from '~/components/common/PageFrame';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '~/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Route = RouteProp<RootStackParamList, 'CreateSoloDiary'>;

type PersonalCreateDiaryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateSoloDiary'
>;

const CreateSoloDiaryScreen = () => {
  const navigation = useNavigation<PersonalCreateDiaryNavigationProp>();
  const route = useRoute<Route>();
  const {visitId} = route.params;

  const questions = [
    {
      questionId: 2,
      questionContent: '가장 기억에 남는 작품은 무엇인가요?',
    },
    {
      questionId: 3,
      questionContent: '전시를 보며 어떤 감정을 느꼈나요?',
    },
    {
      questionId: 4,
      questionContent: '다시 방문하고 싶은가요?',
    },
  ];

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    navigation.replace('Question', {
      visitId,
      index: 0,
      questions,
    });
  }, []);

  return (
    <PageFrame>
      <ActivityIndicator />
    </PageFrame>
  );
};

export default CreateSoloDiaryScreen;
