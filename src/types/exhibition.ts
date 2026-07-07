export interface Exhibition {
  exhId: number;
  exhName: string;
  painter: string;
  gallery: string;
  startDate: string;
  endDate: string;
  poster: string;
  liked: boolean;
}

export interface ExhibitionDetail {
  exhId: number;
  exhName: string;
  painter: string;
  gallery: string;
  startDate: string;
  endDate: string;
  poster: string;
  liked: boolean;
  visited: boolean;
  intro: string;
  fee: string;
  source: string;
  homepageLink: string;
}

export interface Review {
  soloDiaryId: number;
  questionContent: string;
  answerContent: string;
  writeDate: string;
  userId: number;
  nickname: string;
  profile: string;
}

export interface ExhibitionPage {
  content: Exhibition[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
