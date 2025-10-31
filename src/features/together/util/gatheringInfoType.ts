export type GatheringInfoType = {
  gatheringId: number;
  gatheringName: string;
};

export type MemberInfoType = {
  userId: number;
  nickname: string;
};

export type GatheringVisitExhInfoType = {
  exhId: number;
  exhName: string;
  gallery: string;
  poster: string;
  visitDate: string;
};

export type GatheringMemberCReqType = {
  gatheringId: number;
  userId: number;
};

export type GatheringVisitExhCReqType = {
  gatheringId: number;
  exhId: number;
  visitDate: string;
};
