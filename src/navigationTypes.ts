import {MateInfoType} from './features/together/util/mateInfoType';
import {DiaryQuestion} from './types/personal';

// types/navigationTypes.ts
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: {
    screen: 'Setting' | 'Diary' | 'Exhibition' | 'Mate';
    params?: {modalOpen?: boolean; fromPushAlarm?: boolean; visitDate?: string};
  };
  // 기록
  PersonalDetail: undefined;
  CreateSoloDiary: {visitId: number};
  Question: {
    visitId: number;
    index: number;
    questions: DiaryQuestion[];
  };
  // 전시회
  ExhibitionDetail: {exhId: number};
  // 친구/모임
  MateExhList: {mateInfo: MateInfoType};
  MateDiaryList: {mateInfo: MateInfoType; exhId: number};
  GatheringDetail: {gatheringId: number};
  AddGatheringVisitExh: {gatheringId: number};
  GatheringDiary: {gatheringId: number; exhId: number};
  // 설정
  EditProfile: undefined;
  LikeList: undefined;
  EditLikeList: {likeList: ExhInfo[]};
  SettingNoti: undefined;
};
