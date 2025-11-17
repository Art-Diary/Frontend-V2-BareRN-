import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {GOOGLE_ID} from '@env';
import {SocialLoginType} from './loginType';

export const handleGoogleLogin = async (): Promise<
  SocialLoginType | undefined
> => {
  GoogleSignin.configure({
    webClientId: GOOGLE_ID,
  });
  await GoogleSignin.hasPlayServices();
  try {
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    const user = userInfo.data?.user;
    if (idToken && user) {
      // Firebase Authentication에 Google ID 토큰을 제공하여 사용자를 인증하는 데 사용
      var googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      return {
        email: user.email,
        providerType: 'google',
        providerId: user.id,
      };
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};
