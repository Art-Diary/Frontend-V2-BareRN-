import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';
import {RootStackParamList} from './navigationTypes';

export const DEEPLINK_PREFIX_URL = ['artdiary://'];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEPLINK_PREFIX_URL,
  config: {
    screens: {
      ExhDetail: 'exhibition/:exhId',
      GatheringDetail: 'gathering/:gatherId',
      Main: {
        screens: {
          Calendar: 'calendar',
        },
      },
    },
  },
  async getInitialURL() {
    // 딥링크를 이용해서 앱이 오픈되었을 때
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};
