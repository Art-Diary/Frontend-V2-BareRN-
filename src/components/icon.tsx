import {
  AddMyExhButton,
  BackButton,
  CalendarShare,
  CenterDiary,
  EmptyHeart,
  ExhShareButton,
  FullHeart,
  GoogleLogo,
  GreyTag,
  Homepage,
  KakaoLogo,
  MoreContents,
  NaverLogo,
  OffCalendar,
  OffExhibition,
  OffMate,
  OffSetting,
  OnCalendar,
  OnExhibition,
  OnMate,
  OnSetting,
  MateTag,
  PrivateToggle,
  PublicToggle,
  ReduceContents,
  SearchButton,
  WriteDiaryButton,
  InfoButton,
  PencilUpdate,
  TrashDelete,
  CloseButton,
  DeleteButton,
  Logo,
  Barcode,
  Check,
  PencilUpdateNoUnderbar,
  LoginTag,
  ProfileTag,
} from '~/assets/images';
import responsive from './util/responsiveSize';

export const BarcodeIcon = () => {
  const height = responsive(95);
  return <Barcode width={25 * (height / 90)} height={height} />;
};

export const PrivateToggleIcon = () => {
  const height = responsive(25);
  return <PrivateToggle width={34 * (height / 17)} height={height} />;
};

export const PublicToggleIcon = () => {
  const height = responsive(25);
  return <PublicToggle width={34 * (height / 17)} height={height} />;
};

export const CheckIcon = () => {
  const height = responsive(12);
  return <Check width={15 * (height / 11)} height={height} />;
};

/** button icon */
export const AddMyExhButtonIcon = () => {
  const height = responsive(20.5);
  return <AddMyExhButton width={100 * (height / 100)} height={height} />;
};

export const BackButtonIcon = () => {
  const height = responsive(25);
  return <BackButton width={100 * (height / 100)} height={height} />;
};

export const WriteDiaryButtonIcon = () => {
  const height = responsive(20.5);
  return <WriteDiaryButton width={100 * (height / 100)} height={height} />;
};

export const CloseButtonIcon = () => {
  const height = responsive(28);
  return <CloseButton width={100 * (height / 100)} height={height} />;
};

export const PencilUpdateIcon = () => {
  const height = responsive(30);
  return <PencilUpdate width={100 * (height / 100)} height={height} />;
};

export const TrashDeleteIcon = () => {
  const height = responsive(35);
  return <TrashDelete width={100 * (height / 100)} height={height} />;
};

export const SearchButtonIcon = () => {
  const height = responsive(16);
  return <SearchButton width={100 * (height / 100)} height={height} />;
};

export const PencilUpdateNoUnderbarIcon = ({customHeight = 13.5}) => {
  const height = responsive(customHeight);
  return <PencilUpdateNoUnderbar width={14 * (height / 14)} height={height} />;
};

export const InfoButtonIcon = () => {
  const height = responsive(25);
  return <InfoButton width={100 * (height / 100)} height={height} />;
};

export const FullHeartIcon = () => {
  const heartIconHeight = responsive(18);
  return (
    <FullHeart width={109 * (heartIconHeight / 101)} height={heartIconHeight} />
  );
};

export const EmptyHeartIcon = () => {
  const heartIconHeight = responsive(18);
  return (
    <EmptyHeart
      width={114 * (heartIconHeight / 100)}
      height={heartIconHeight}
    />
  );
};

export const MoreContentsIcon = () => {
  const height = responsive(11);
  return <MoreContents width={259 * (height / 126)} height={height} />;
};

export const ReduceContentsIcon = () => {
  const height = responsive(11);
  return <ReduceContents width={259 * (height / 126)} height={height} />;
};

export const ExhShareButtonIcon = () => {
  const height = responsive(18);
  return <ExhShareButton width={100 * (height / 100)} height={height} />;
};

export const HomepageIcon = () => {
  const height = responsive(22);
  return <Homepage width={100 * (height / 100)} height={height} />;
};

export const CalendarShareIcon = () => {
  const height = responsive(20.8);
  return <CalendarShare width={100 * (height / 100)} height={height} />;
};

export const DeleteButtonIcon = () => {
  const height = responsive(21);
  return <DeleteButton width={100 * (height / 100)} height={height} />;
};

/** bottom nav */
export const CenterDiaryIcon = () => {
  const height = responsive(36);
  return <CenterDiary width={108 * (height / 108)} height={height} />;
};

export const OffCalendarIcon = () => {
  const height = responsive(32);
  return <OffCalendar width={100 * (height / 153)} height={height} />;
};

export const OnCalendarIcon = () => {
  const height = responsive(32);
  return <OnCalendar width={100 * (height / 153)} height={height} />;
};

export const OffMateIcon = () => {
  const height = responsive(32);
  return <OffMate width={167 * (height / 153)} height={height} />;
};

export const OnMateIcon = () => {
  const height = responsive(32);
  return <OnMate width={167 * (height / 153)} height={height} />;
};

export const OffSettingIcon = () => {
  const height = responsive(32);
  return <OffSetting width={100 * (height / 153)} height={height} />;
};

export const OnSettingIcon = () => {
  const height = responsive(32);
  return <OnSetting width={103 * (height / 153)} height={height} />;
};

export const OffExhibitionIcon = () => {
  const height = responsive(32);
  return <OffExhibition width={105 * (height / 153)} height={height} />;
};

export const OnExhibitionIcon = () => {
  const height = responsive(32);
  return <OnExhibition width={110 * (height / 153)} height={height} />;
};

/** social login logo */
export const GoogleLogoIcon = ({customHeight = 25}) => {
  const height = responsive(customHeight);
  return <GoogleLogo width={100 * (height / 100)} height={height} />;
};

export const NaverLogoIcon = ({customHeight = 25}) => {
  const height = responsive(customHeight);
  return <NaverLogo width={100 * (height / 100)} height={height} />;
};

export const KakaoLogoIcon = ({customHeight = 25}) => {
  const height = responsive(customHeight);
  return <KakaoLogo width={100 * (height / 100)} height={height} />;
};

export const LogoIcon = () => {
  const height = responsive(130);
  return <Logo width={217 * (height / 148)} height={height} />;
};

/** name tags */
export const LoginTagIcon = () => {
  const height = responsive(50);
  return <LoginTag width={504 * (height / 86)} height={height} />;
};

export const GreyTagIcon = ({customHeight = 46}) => {
  const height = responsive(customHeight);
  return <GreyTag width={2800 * (height / 400)} height={height} />;
};

export const MateTagIcon = ({customHeight = 48.2}) => {
  const height = responsive(customHeight);
  return <MateTag width={2800 * (height / 400)} height={height} />;
};

export const ProfileTagIcon = () => {
  const height = responsive(59);
  return <ProfileTag width={2800 * (height / 500)} height={height} />;
};
