import {useQuestionInfo} from '~/zustand/questionInfo';

export type QuestionType = {
  questionId: number;
  questionText: string;
};

export const randomQuestion = (
  choosed: string[],
  questionInfo: QuestionType[],
): QuestionType => {
  // 세 질문이 서로 겹치면 안된다.
  const filtered = questionInfo.filter(
    element => !choosed.includes(element.questionText, 0),
  );
  const len = filtered.length;
  const rand = Math.floor(Math.random() * len);
  console.log('choosed:', choosed);
  console.log('questionInfo:', questionInfo);
  console.log('filtered:', filtered);
  console.log('len:', len);

  return filtered[rand];
};
