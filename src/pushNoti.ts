import notifee, {AndroidImportance} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const displayNotification = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelAnoucement = await notifee.createChannel({
    id: 'default',
    name: '카테고리 이름',
    importance: AndroidImportance.HIGH,
  });

  if (!message.data) {
    return;
  }
  const info = message.data;
  const titleData = info.title?.toString();
  const title = titleData?.split('/')[0];
  const typeData = titleData?.split('/')[1];
  const type = typeData?.split('-')[0];
  const typeId = typeData?.split('-')[1];
  const body = info.body.toString();
  var value = undefined;

  if (type === 'calendar') {
    value = body?.split('에')[0]; // TODO 수정
  } else {
    value = Number(typeId);
  }

  await notifee.displayNotification({
    title: title,
    body: body,
    data: {
      info: {
        type: type,
        id: value,
      },
    },
    android: {
      channelId: channelAnoucement,
      showTimestamp: true,
      smallIcon: 'ic_launcher',
    },
  });
};

export default {
  displayNoti: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) =>
    displayNotification(remoteMessage),
};
