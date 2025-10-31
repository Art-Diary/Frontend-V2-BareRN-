export type ExhibitionReqType = {
  keyword: string | null;
  field: string[] | null;
  price: string | null;
  state: string[] | null;
  date: string | null;
};

export type SoloDiaryListForExh = {
  soloDiaryId: number;
  questionId: number;
  question: string;
  answer: string;
  writeDate: string;
  userId: number;
  nickname: string;
  profile: string;
};

export type EvalInfoForExh = {
  factorId: number;
  factorCode: string;
  factorName: string;
  optionId: number;
  optionCode: string;
  optionName: string;
  optionIcon: string;
};

export type ExhibitionDetailType = {
  exhId: number;
  exhName: string;
  gallery: string;
  startDate: string;
  endDate: string;
  poster: string;
  painter: string;
  fee: number;
  intro: string;
  homepageLink: string;
  source: string;
  isLikeExh: boolean;
  soloDiaryCount: number;
  isEvalFinished: boolean;
  isVisitedExh: boolean;
  soloDiaries: SoloDiaryListForExh[];
  evalInfos: EvalInfoForExh[];
};
