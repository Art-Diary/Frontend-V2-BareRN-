export interface SoloTicket {
  visitId: number;
  visitDate: string;
  exhId: number;
  exhName: string;
  gallery: string;
  poster: string;
  completed: string;
}

export interface DiaryQuestion {
  questionId: number;
  questionContent: string;
}

export interface DiaryAnswer {
  questionId: number;
  answerContent: string;
}

export interface Diary {
  soloDiaryId: number;
  questionId: number;
  questionContent: string;
  answerContent: string;
  writeDate: string;
  isPublic: boolean;
}
