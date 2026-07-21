export interface Gathering {
  id: number;
  name: string;
  exhibitionCount: number;
  memberList: Member[];
}

interface Member {
  id: number;
  name: string;
  profile: string;
}
