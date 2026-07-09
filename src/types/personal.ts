export interface PersonalTicket {
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
