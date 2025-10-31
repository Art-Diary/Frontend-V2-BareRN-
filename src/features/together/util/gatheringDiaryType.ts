export type GatheringDiaryType = {
  gatheringDiaryId: number;
  content: string;
  writeDate: string;
  userId: number;
  nickname: string;
  profile: string;
};

export type GatheringDiaryCReqType = {
  gatheringId: number;
  exhId: number;
  questionId: number;
  content: string;
  writeDate: string;
};

export type GatheringDiaryUReqType = {
  gatheringId: number;
  exhId: number;
  questionId: number;
  gatheringDiaryId: number;
  content: string;
  writeDate: string;
};

export type GatheringDiaryDReqType = {
  gatheringId: number;
  exhId: number;
  questionId: number;
  gatheringDiaryId: number;
};
