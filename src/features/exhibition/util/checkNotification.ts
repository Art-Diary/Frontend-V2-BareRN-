// import {PermissionsAndroid, Platform} from 'react-native';
// import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// export const checkNotification = async () => {
//   // 알림 허용되어있는지 체크 후 알림 허용 페이지로 이동 또는 알림 설정 페이지로 이동
//   const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

//   const hasPermission = await PermissionsAndroid.check(permission);

//   if (!hasPermission) {
//     if (Platform.OS === 'android' && Platform.Version >= 33) {
//       const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

//       if (result === RESULTS.GRANTED) {
//         console.log('POST_NOTIFICATIONS permission granted');
//         return true;
//       } else {
//         console.log('POST_NOTIFICATIONS permission denied');
//         return false;
//       }
//     }
//   }
//   return true;
// };
