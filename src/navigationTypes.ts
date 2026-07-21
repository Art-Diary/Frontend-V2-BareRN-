import {MateInfoType} from './features/together/util/mateInfoType';
import {DiaryQuestion, SoloTicket} from './types/solo';

// types/navigationTypes.ts
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: {
    screen: 'Solo' | 'Search' | 'Gathering' | 'Mate';
    params?: {modalOpen?: boolean; fromPushAlarm?: boolean; visitDate?: string};
  };
  // 기록
  CreateSoloDiary: {visitId: number};
  Question: {
    visitId: number;
    index: number;
    questions: DiaryQuestion[];
  };
  SoloDiaryList: {
    ticket: SoloTicket;
  };
  // 전시회
  ExhibitionDetail: {exhId: number};
  // 모임
  GatheringDetail: {gatheringId: number};
  GatheringChat: {gatheringId: number; visitId: number}; // exhibition?
  GatheringAddExhibitionStep1: {gatheringId: number};
  GatheringAddExhibitionStep2: undefined;
  // 설정
  EditProfile: undefined;
  LikeList: undefined;
  // EditLikeList: {likeList: ExhInfo[]};
  SettingNoti: undefined;
};
