export type LoginUserType = {
  providerType: string;
  providerUserId: string;
  alarmToken?: string;
};

export type SocialLoginType = {
  providerType: string;
  providerUserId: string;
};
