import {create} from 'zustand';

type QuestionInfo = {
  questionId: number;
  questionText: string;
};

interface QuestionInfoState {
  questionInfo: QuestionInfo[];
  actions: {
    updateQuestionInfo: (questionInfo: QuestionInfo[]) => void;
  };
}

const useQuestion = create<QuestionInfoState>(set => ({
  questionInfo: [],
  actions: {
    updateQuestionInfo: (questionInfo: QuestionInfo[]) =>
      set(state => ({questionInfo: questionInfo})),
  },
}));

export const useQuestionInfo = () => useQuestion(state => state.questionInfo);

export const useQuestionActions = () => useQuestion(state => state.actions);
