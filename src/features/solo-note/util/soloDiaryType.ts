export type SoloDiaryCReqType = {
  initEval: boolean;
  exhId: number;
  evalChoiceInfoList: SelectedEvalChoiceType[];
  soloDiaryInfoList: SoloDiaryForCreateType[];
};

export type SoloDiaryForCreateType = {
  questionId: number;
  answer: string;
  writeDate: string;
  isPublic: boolean;
};

export type SoloDiaryUReqType = {
  exhId: number;
  soloDiaryId: number;
  questionId: number;
  answer: string;
  writeDate: string;
  isPublic: boolean;
};

export type SoloDiaryDReqType = {soloDiaryId: number; exhId: number};

export type EvalInfoType = {
  factorId: number;
  factorCode: string;
  factorName: string;
  optionId: number;
  optionCode: string;
  optionName: string;
  optionIcon: string;
};

export type SoloDiaryInfoType = {
  soloDiaryId: number;
  exhId: number;
  questionId: number;
  question: string;
  answer: string;
  writeDate: string;
  isPublic: boolean;
  userId?: number;
  nickname?: string;
  profile?: string;
};

export type SoloDiaryResType = {
  evalInfoList: EvalInfoType[];
  soloDiaryInfoList: SoloDiaryInfoType[];
};

export type EvalChoiceUReqType = {
  exhId: number;
  evalInfoList: SelectedEvalChoiceType[];
};

export type SelectedEvalChoiceType = {
  factorId: number;
  optionId: number;
};

export type VisitExhCReqType = {
  exhId: number;
  visitDate: string;
};
