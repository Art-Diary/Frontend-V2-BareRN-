import {create} from 'zustand';

type NotiInfo = {
  notiId: number;
  notiCode: string;
  notiName: string;
  notiSubText: string;
  notiState: boolean;
};

type UserInfo = {
  userId: number;
  nickname?: string;
  email?: string;
  profile?: string;
  artField?: string;
  providerType: string;
  roleType: string;
  notiList: NotiInfo[];
};

interface UserState {
  userInfo: UserInfo;
  actions: {
    updateUserInfo: (userInfo: UserInfo) => void;
    updateNotiList: (notiList: NotiInfo[]) => void;
  };
}

const useUser = create<UserState>(set => ({
  userInfo: {
    userId: -1,
    nickname: undefined,
    email: undefined,
    profile: undefined,
    artField: undefined,
    providerType: '',
    roleType: 'USER',
    notiList: [],
  },
  actions: {
    updateUserInfo: userInfo => set(state => ({userInfo: {...userInfo}})),
    updateNotiList: notiList =>
      set(state => ({userInfo: {...state.userInfo, notiList: [...notiList]}})),
  },
}));

export const useUserInfo = () => useUser(state => state.userInfo);
export const useUserActions = () => useUser(state => state.actions);
