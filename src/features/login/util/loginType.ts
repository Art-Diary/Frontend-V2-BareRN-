export type LoginUserType = {
  email: string;
  providerType: string;
  providerId: string;
  alarmToken?: string;
};

export type SocialLoginType = {
  email: string;
  providerType: string;
  providerId: string;
};
