/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  Linking,
  LogBox,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RootStackParamList} from './navigationTypes';
import LoginScreen from './screens/login/LoginScreen';
// import EditProfileScreen from './pages/setting/EditProfileScreen';
// import LikeListScreen from './pages/setting/LikeListScreen';
// import EditLikeListScreen from './pages/setting/EditLikeListScreen';
// import SettingNotiScreen from './pages/setting/SettingNotiScreen';
import SplashScreen from './screens/login/SplashScreen';
import pushNoti from './pushNoti';
import {linking} from './deeplinkConfig';
import ExhibitionDetailScreen from './screens/exhibition/ExhibitionDetailScreen';
import SoloDiaryListScreen from './screens/solo/SoloDiaryListScreen';
import CreateSoloDiaryScreen from './screens/solo/CreateSoloDiaryScreen';
import QuestionScreen from './screens/solo/QuestionScreen';
import BottomTabNavigator from './components/common/BottomTabNavigator';
import GatheringDetailScreen from './screens/gathering/GatheringDetailScreen';
import GatheringChatScreen from './screens/gathering/GatheringChatScreen';
import GatheringAddExhibitionStep1Screen from './screens/gathering/GatheringAddExhibitionStep1Screen';
import GatheringAddExhibitionStep2Screen from './screens/gathering/GatheringAddExhibitionStep2Screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_ID} from '@env';
import '~/api';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

export default function App() {
  const hasAndroidPermission = async () => {
    //외부 스토리지를 읽고 쓰는 권한 가져오기
    const permissionRead = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const permissionNoti = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

    const hasPermissionRead = await PermissionsAndroid.check(permissionRead);
    const hasPermissionNoti = await PermissionsAndroid.check(permissionNoti);

    const sdkVersion = Number(Platform.Version);

    GoogleSignin.configure({
      webClientId: GOOGLE_ID,
    });

    if (hasPermissionRead || hasPermissionNoti) {
      return true;
    }
    if (sdkVersion >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(result => {
        if (result === 'granted') {
          console.log('POST_NOTIFICATIONS is granted.');
        } else {
          console.log('POST_NOTIFICATIONS is denied.');
        }
      });
    }
    if (Platform.OS === 'android') {
      if (sdkVersion >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ).then(result => {
          if (result === 'granted') {
            console.log('READ_MEDIA_IMAGES is granted.');
          } else {
            console.log('READ_MEDIA_IMAGES is denied.');
          }
        });
      } else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(result => {
          if (result === 'granted') {
            console.log('READ_EXTERNAL_STORAGE is granted.');
          } else {
            console.log('READ_EXTERNAL_STORAGE is denied.');
          }
        });
      }
    }
    return true;
  };

  const getPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
  };

  useEffect(() => {
    const checkForUpdate = async () => {
      console.log('IN App');
      //기기에 설치되 있는 버전
      let CurrentVersion = VersionCheck.getCurrentVersion();
      //앱의 최신버전
      let LatestVersion = await VersionCheck.getLatestVersion({
        provider: 'playStore', // for Android
      });

      console.log('CurrentVersion:', CurrentVersion);
      console.log('LatestVersion:', LatestVersion);

      //기기에 설치되있는 버전과 앱에 올려져있는 최신버전을 비교
      VersionCheck.needUpdate({
        currentVersion: CurrentVersion,
        latestVersion: LatestVersion,
      }).then((res: any) => {
        if (res.isNeeded) {
          Alert.alert(
            '앱 업데이트',
            '새로운 버전이 출시되었습니다. 앱을 업데이트하세요.',
            [
              {
                text: '지금 업데이트',
                onPress: () => {
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.testappd',
                  ); // 구글 플레이스토어로 이동
                },
              },
            ],
          );
        }
      });
    };

    checkForUpdate();
  }, []);

  /** for foreground state */
  useEffect(() => {
    getPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('foreground:', remoteMessage);
      pushNoti.displayNoti(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          {/* 로그인 회원가입 */}
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* 기록 */}
          <Stack.Screen
            name="CreateSoloDiary"
            component={CreateSoloDiaryScreen}
          />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="SoloDiaryList" component={SoloDiaryListScreen} />
          {/* 전시회 */}
          <Stack.Screen
            name="ExhibitionDetail"
            component={ExhibitionDetailScreen}
          />
          {/* 모임 */}
          <Stack.Screen
            name="GatheringDetail"
            component={GatheringDetailScreen}
          />
          <Stack.Screen name="GatheringChat" component={GatheringChatScreen} />
          <Stack.Screen
            name="GatheringAddExhibitionStep1"
            component={GatheringAddExhibitionStep1Screen}
          />
          <Stack.Screen
            name="GatheringAddExhibitionStep2"
            component={GatheringAddExhibitionStep2Screen}
          />
          {/* 설정 */}
          {/* <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="LikeList" component={LikeListScreen} />
          <Stack.Screen name="EditLikeList" component={EditLikeListScreen} />
          <Stack.Screen name="SettingNoti" component={SettingNotiScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
