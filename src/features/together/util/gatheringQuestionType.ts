export type GatheringQuestionCReqType = {
  gatheringId: number;
  exhId: number;
  questionText: string;
};

export type GatheringQuestionUReqType = {
  gatheringId: number;
  exhId: number;
  questionId: number;
  questionText: string;
};

export type GatheringQuestionType = {
  gatheringQuestionId: number;
  question: string;
};
