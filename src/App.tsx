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
import {RecoilRoot} from 'recoil';
import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  Linking,
  LogBox,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import {setNavigator} from './api/navigationService';
// import {checkForUpdate} from './components/common/CheckForUpdate';
import VersionCheck from 'react-native-version-check';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MyDiaryScreen from './pages/solo-note/MyDiaryScreen';
import BottomTabs from './BottomTabs';
import {RootStackParamList} from './navigationTypes';
import LoginScreen from './pages/login/LoginScreen';
import DoEvaluationScreen from './pages/solo-note/DoEvaluationScreen';
import WriteFirstSoloDiaryScreen from './pages/solo-note/WriteFirstSoloDiaryScreen';
import WriteSecondSoloDiaryScreen from './pages/solo-note/WriteSecondSoloDiaryScreen';
import WriteThirdSoloDiaryScreen from './pages/solo-note/WriteThirdSoloDiaryScreen';
import UpdateSoloDiaryScreen from './pages/solo-note/UpdateSoloDiaryScreen';
import EditEvaluationScreen from './pages/solo-note/EditEvaluationScreen';
import ExhDetailScreen from './pages/exhibition/ExhDetailScreen';
import ExhForMoreReviewScreen from './pages/exhibition/ExhForMoreReviewScreen';
import ExhSearchScreen from './pages/exhibition/ExhSearchScreen';
import MateExhListScreen from './pages/together/MateExhListScreen';
import MateDiaryListScreen from './pages/together/MateDiaryListScreen';
import GatheringDetailScreen from './pages/together/GatheringDetailScreen';
import AddGatheringVisitExhScreen from './pages/together/AddGatheringVisitExhScreen';
import GatheringDiaryScreen from './pages/together/GatheringDiaryScreen';
import EditProfileScreen from './pages/setting/EditProfileScreen';
import LikeListScreen from './pages/setting/LikeListScreen';
import EditLikeListScreen from './pages/setting/EditLikeListScreen';
import SettingNotiScreen from './pages/setting/SettingNotiScreen';
import CalendarScreen from './pages/calendar/CalendarScreen';

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
      console.log('첫진입 시작');
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
  // useEffect(() => {
  //   getPermission();

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // console.log('foreground:', remoteMessage);
  //     pushNoti.displayNoti(remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
      // linking={linking}
      // ref={(
      //   navigatorRef: NavigationContainerRef<RootStackParamList> | null,
      // ) => {
      //   setNavigator(navigatorRef);
      // }}
      >
        <RecoilRoot>
          <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{headerShown: false}}>
            {/* 로그인 회원가입 */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            {/* 기록 */}
            <Stack.Screen name="MyDiary" component={MyDiaryScreen} />
            <Stack.Screen name="DoEvaluation" component={DoEvaluationScreen} />
            <Stack.Screen
              name="WriteFirstSoloDiary"
              component={WriteFirstSoloDiaryScreen}
            />
            <Stack.Screen
              name="WriteSecondSoloDiary"
              component={WriteSecondSoloDiaryScreen}
            />
            <Stack.Screen
              name="WriteThirdSoloDiary"
              component={WriteThirdSoloDiaryScreen}
            />
            <Stack.Screen
              name="UpdateSoloDiary"
              component={UpdateSoloDiaryScreen}
            />
            <Stack.Screen
              name="EditEvaluation"
              component={EditEvaluationScreen}
            />
            {/* 전시회 */}
            <Stack.Screen name="ExhDetail" component={ExhDetailScreen} />
            <Stack.Screen
              name="ExhForMoreReview"
              component={ExhForMoreReviewScreen}
            />
            <Stack.Screen name="ExhSearch" component={ExhSearchScreen} />
            {/* 친구/모임 */}
            <Stack.Screen name="MateExhList" component={MateExhListScreen} />
            <Stack.Screen
              name="MateDiaryList"
              component={MateDiaryListScreen}
            />
            <Stack.Screen
              name="GatheringDetail"
              component={GatheringDetailScreen}
            />
            <Stack.Screen
              name="AddGatheringVisitExh"
              component={AddGatheringVisitExhScreen}
            />
            <Stack.Screen
              name="GatheringDiary"
              component={GatheringDiaryScreen}
            />
            {/* 설정 */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="LikeList" component={LikeListScreen} />
            <Stack.Screen name="EditLikeList" component={EditLikeListScreen} />
            <Stack.Screen name="SettingNoti" component={SettingNotiScreen} />
            {/* <Stack.Screen name='QnaList' component={QnaListScreen} /> */}
          </Stack.Navigator>
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
