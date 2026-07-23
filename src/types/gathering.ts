export interface Gathering {
  id: number;
  name: string;
  exhibitionCount: number;
  memberList: GatheringMember[];
}

export interface GatheringMember {
  id: number;
  nickname: string;
  profile: string;
}

export interface GatheringDetail {
  id: number;
  name: string;
  code: string;
  memberList: GatheringMember[];
  visitedExhList: GatheringVisitedExhibition[];
}

export interface GatheringVisitedExhibition {
  visitId: number;
  visitDate: string;
  exhId: number;
  exhName: string;
  poster: string;
  gallery: string;
}
