import {ExhInfo} from './features/calendar/util/visitedExhInfoType';
import {
  EvalInfoType,
  SoloDiaryInfoType,
} from './features/solo-note/util/soloDiaryType';
import {GatheringInfoType} from './features/together/util/gatheringInfoType';
import {MateInfoType} from './features/together/util/mateInfoType';

// types/navigationTypes.ts
export type RootStackParamList = {
  Login: undefined;
  Main: {
    screen: 'Calendar' | 'Setting' | 'Diary' | 'Exhibition' | 'Mate';
    params?: {modalOpen?: boolean; fromPushAlarm?: boolean; visitDate?: string};
  };
  // 기록
  MyDiary: {exhId: number};
  DoEvaluation: {exhId: number};
  WriteNewSoloDiary: {exhId: number};
  WriteFirstSoloDiary: {exhId: number};
  WriteSecondSoloDiary: {exhId: number};
  WriteThirdSoloDiary: {exhId: number};
  UpdateSoloDiary: {soloDiary: SoloDiaryInfoType};
  EditEvaluation: {exhId: number; evalChoiceList: EvalInfoType[]};
  // 전시회
  ExhDetail: {exhId: number};
  ExhForMoreReview: {
    exhId: number;
    reviewCount: number;
    isEvalFinished: boolean;
    isVisitedExh: boolean;
  };
  ExhSearch: undefined;
  // 캘린더
  Calendar: undefined;
  // 친구/모임
  MateExhList: {mateInfo: MateInfoType};
  MateDiaryList: {mateInfo: MateInfoType; exhId: number};
  GatheringDetail: {gatheringInfo: GatheringInfoType};
  AddGatheringVisitExh: {gatheringId: number};
  GatheringDiary: {gatheringId: number; exhId: number};
  // 설정
  EditProfile: undefined;
  LikeList: undefined;
  EditLikeList: {likeList: ExhInfo[]};
  SettingNoti: undefined;
  // QnaList: {isAdmin: boolean};
};
