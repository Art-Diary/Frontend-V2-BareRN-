import React, {useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';

export const checkForUpdate = async () => {
  console.log('첫진입 시작');
  //기기에 설치되 있는 버전
  let CurrentVersion = VersionCheck.getCurrentVersion();
  //앱의 최신버전
  let LatestVersion = await VersionCheck.getLatestVersion();

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

// const CheckForUpdate = () => {
//   const [remoteConfig, setRemoteConfig] = useState(null);
//   const remoteConfigInstance = useRemoteConfig();

//   useEffect(() => {
//     // Remote Config 초기화
//     remoteConfigInstance
//       .fetchAndActivate()
//       .then(() => {
//         const config = remoteConfigInstance.getAll();
//         setRemoteConfig(config);
//       })
//       .catch((error: any) => {
//         console.error('Error fetching remote config:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (remoteConfig) {
//       // 최신 버전 정보 받아오기 (서버에서 받은 버전 정보)
//       const latestVersion = remoteConfig['latest_version']; // 예시 키, 서버에서 제공한 버전 키
//       checkForUpdate(latestVersion);
//     }
//   }, [remoteConfig]);

//   const checkForUpdate = (latestVersion: string) => {
//     // 현재 버전과 서버에서 제공한 최신 버전 비교
//     const currentVersion = VersionCheck.getCurrentVersion();

//     if (currentVersion !== latestVersion) {
//       showUpdateDialog();
//     }
//   };

//   const showUpdateDialog = () => {
//     // 업데이트 알림 다이얼로그 표시
//     Alert.alert('앱 업데이트 필요', '최신 버전으로 업데이트가 필요합니다.', [
//       {
//         text: '지금 업데이트',
//         onPress: () => openAppInStore(),
//       },
//       {
//         text: '나중에',
//         style: 'cancel',
//       },
//     ]);
//   };

//   const openAppInStore = () => {
//     const storeUrl =
//       Platform.OS === 'android'
//         ? 'https://play.google.com/store/apps/details?id=com.yourapp' // 구글 플레이스토어 링크
//         : 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID'; // iOS 앱스토어 링크 (iOS의 경우)

//     Linking.openURL(storeUrl).catch(error =>
//       console.error('Error opening store:', error),
//     );
//   };

//   return null; // 이 컴포넌트는 백그라운드에서만 동작합니다.
// };
