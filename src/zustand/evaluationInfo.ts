import {create} from 'zustand';

type OptionInfo = {
  optionId: number;
  optionName: string;
  optionCode: string;
  optionIcon: string;
};

type EvaluationInfo = {
  factorId: number;
  factorName: string;
  factorCode: string;
  optionInfoList: OptionInfo[];
};

interface EvaluationInfoState {
  evaluationInfo: EvaluationInfo[];
  actions: {
    updateEvaluationInfo: (evaluationInfo: EvaluationInfo[]) => void;
  };
}

const useEvaluation = create<EvaluationInfoState>(set => ({
  evaluationInfo: [],
  actions: {
    updateEvaluationInfo: (evaluationInfo: EvaluationInfo[]) =>
      set(state => ({evaluationInfo: evaluationInfo})),
  },
}));

export const useEvaluationInfo = () => useEvaluation(state => state.evaluationInfo);

export const useEvaluationActions = () => useEvaluation(state => state.actions);
