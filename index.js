/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import pushNoti from '~/pushNoti';
import {Linking} from 'react-native';
import App from './src/App';
import {useUserInfo} from '~/zustand/userInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** for background & quit state */

const handleDismissedNotification = async detail => {
  // noti 삭제
  if (detail.notification?.id) {
    notifee.cancelNotification(detail.notification.id);
    notifee.cancelDisplayedNotification(detail.notification.id);
  }
};

const handlePressNotification = async detail => {
  const data = detail.notification?.data;

  if (data) {
    const info = data.info;
    const type = info.type;
    const id = info.id;

    if (type === 'exhibition') {
      await Linking.openURL(`artdiary://exhibition/${Number(id)}`);
    } else if (type === 'gathering') {
      await AsyncStorage.setItem('invitedGatheringPushNoti', 'yes');
      await Linking.openURL(`artdiary://gathering/${Number(id)}`);
    } else if (type === 'calendar') {
      await Linking.openURL(`artdiary://calendar/${id}`);
    }
  }
};

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await handlePressNotification(detail);
  } else if (type === EventType.DISMISSED) {
    await handleDismissedNotification(detail);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  // console.log('background event');

  if (type === EventType.PRESS) {
    await handlePressNotification(detail);
  } else if (type === EventType.DISMISSED) {
    await handleDismissedNotification(detail);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('background:', remoteMessage);
  await pushNoti.displayNoti(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

/**
 * notifee + react-native-firebase/messaging
 *
 * [foreground]
 * - 이때는 notifee 사용된다.
 * - notifee를 사용해야 팝업이 뜬다.
 *    - notifee.onForegroundEvent를 사용해서 팝업을 클릭해 deeplink로 설정한 경로로 이동할 수 있다.
 * - notifee를 사용해서 메시지를 가공할 수 있다.
 *
 * [background + quit]
 * - 이때는 react-native-firebase/messaging 사용된다.
 * - 메시지를 가공하는 부분이 어디??
 *    -> messaging().setBackgroundMessageHandler로 메시지를 받아 pushNoti.displayNoti 호출하여
 *       사용자가 알림을 클릭했을 때, 특정 화면으로 이동하도록 만들었다.
 *       (백엔드 코드에서 notification말고, data만 보내면 이중으로 알림이 뜨는 것을 방지할 수 있다.)
 *
 * - 포그라운드에서 뜬 팝업은 백그라운드에서 누르면 [Error: Could not open URL 'artdiary://exhibition/82': No Activity found to handle Intent { act=android.intent.action.VIEW dat=artdiary://exhibition/82 flg=0x10000000 }]라고 뜬다.
 *    -> androidmainfest.xml 코드 수정으로 해결
 */
