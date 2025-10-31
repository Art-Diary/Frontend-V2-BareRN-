import {create} from 'zustand';

type EvaluationInfo = {
  factorId: number;
  optionId: number;
};

type DiaryInfo = {
  questionId: number;
  question: string;
  answer: string;
  writeDate: string;
  isPublic: boolean;
};

interface WriteDiaryState {
  initEval: boolean;
  evaluationInfo: EvaluationInfo[];
  firstDiaryInfo: DiaryInfo;
  secondDiaryInfo: DiaryInfo;
  thirdDiaryInfo: DiaryInfo;
  actions: {
    updateInitEval: (initEval: boolean) => void;
    updateEvaluationInfo: (evaluationInfo: EvaluationInfo[]) => void;
    updateFirstDiaryInfo: (firstDiaryInfo: DiaryInfo) => void;
    updateSecondDiaryInfo: (secondDiaryInfo: DiaryInfo) => void;
    updateThirdDiaryInfo: (thirdDiaryInfo: DiaryInfo) => void;
    resetWriteDiaryInfo: () => void;
  };
}

const EMPTY_DIARY: DiaryInfo = {
  questionId: 0,
  question: '',
  answer: '',
  writeDate: '',
  isPublic: true,
};

const initialData = (): Omit<WriteDiaryState, 'actions'> => ({
  initEval: false,
  evaluationInfo: [],
  firstDiaryInfo: {...EMPTY_DIARY},
  secondDiaryInfo: {...EMPTY_DIARY},
  thirdDiaryInfo: {...EMPTY_DIARY},
});

const useWriteDiary = create<WriteDiaryState>(set => ({
  ...initialData(),
  actions: {
    updateInitEval: (initEval: boolean) => set(state => ({initEval: initEval})),
    updateEvaluationInfo: (evaluationInfo: EvaluationInfo[]) =>
      set(() => ({evaluationInfo: evaluationInfo})),
    updateFirstDiaryInfo: (firstDiaryInfo: DiaryInfo) =>
      set(() => ({firstDiaryInfo: firstDiaryInfo})),
    updateSecondDiaryInfo: (secondDiaryInfo: DiaryInfo) =>
      set(() => ({secondDiaryInfo: secondDiaryInfo})),
    updateThirdDiaryInfo: (thirdDiaryInfo: DiaryInfo) =>
      set(() => ({thirdDiaryInfo: thirdDiaryInfo})),
    resetWriteDiaryInfo: () => set(() => initialData()),
  },
}));

export const useWriteInitEval = () => useWriteDiary(state => state.initEval);
export const useWriteEvaluationInfo = () => useWriteDiary(state => state.evaluationInfo);
export const useWriteFirstDiaryInfo = () => useWriteDiary(state => state.firstDiaryInfo);
export const useWriteSecondDiaryInfo = () => useWriteDiary(state => state.secondDiaryInfo);
export const useWriteThirdDiaryInfo = () => useWriteDiary(state => state.thirdDiaryInfo);

export const useWriteDiaryActions = () => useWriteDiary(state => state.actions);
