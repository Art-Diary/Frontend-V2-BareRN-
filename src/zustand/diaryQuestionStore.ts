import {create} from 'zustand';

interface Answer {
  questionId: number;
  answerContent: string;
}

interface DiaryQuestionStore {
  answers: Answer[];

  setAnswer: (questionId: number, answerContent: string) => void;

  getAnswer: (questionId: number) => string;

  resetAnswers: () => void;
}

export const useDiaryQuestionStore = create<DiaryQuestionStore>((set, get) => ({
  answers: [],

  setAnswer: (questionId, answerContent) =>
    set(state => {
      const exists = state.answers.find(item => item.questionId === questionId);

      if (exists) {
        return {
          answers: state.answers.map(item =>
            item.questionId === questionId
              ? {
                  ...item,
                  answerContent: answerContent,
                }
              : item,
          ),
        };
      }

      return {
        answers: [
          ...state.answers,
          {
            questionId,
            answerContent: answerContent,
          },
        ],
      };
    }),

  getAnswer: questionId => {
    const answer = get().answers.find(item => item.questionId === questionId);

    return answer?.answerContent ?? '';
  },

  resetAnswers: () =>
    set({
      answers: [],
    }),
}));
