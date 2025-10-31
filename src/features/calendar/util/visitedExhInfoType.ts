export type ExhInfo = {
  exhId: number;
  exhName: string;
  gallery: string;
  startDate: string;
  endDate: string;
  poster: string;
  visitDate: string;
  visitExhId: number;
  gatheringId?: number;
  gatheringName?: string;
  isLikeExh?: boolean;
};

export type ExhInfoListOfDayType = {
  day: number;
  scheduleInfoList: ExhInfo[];
};
