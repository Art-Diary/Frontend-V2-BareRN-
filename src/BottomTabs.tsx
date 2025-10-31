import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useNavigation} from '@react-navigation/native';
import {BACK_COLOR, BORDER_COLOR} from './components/util/colors';
import {RootStackNavigationProp} from './App';
import {
  CenterDiaryIcon,
  OffCalendarIcon,
  OffExhibitionIcon,
  OffMateIcon,
  OffSettingIcon,
  OnCalendarIcon,
  OnExhibitionIcon,
  OnMateIcon,
  OnSettingIcon,
} from './components/icon';
import responsive from './components/util/responsiveSize';
import MyVisitExhListScreen from './pages/solo-note/MyVisitExhListScreen';
import CalendarScreen from './pages/calendar/CalendarScreen';
import ExhListScreen from './pages/exhibition/ExhListScreen';
import MateMainScreen from './pages/together/MateMainScreen';
import SettingScreen from './pages/setting/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  //   useEffect(() => {
  //     // 앱이 백그라운드에서 포그라운드로 전환될 때 링크를 처리
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //     // 앱이 처음 시작할 때 링크를 처리
  //     dynamicLinks()
  //       .getInitialLink()
  //       .then(link => {
  //         if (link) {
  //           handleDynamicLink(link);
  //         }
  //       });

  //     return () => unsubscribe();
  //   }, []);

  //   const handleDynamicLink = (link: any) => {
  //     // 링크의 URL에서 필요한 매개변수 추출
  //     if (link.url) {
  //       const url = link.url;
  //       const exhId = Number(url.split('?')[1].split('=')[1]);

  //       if (exhId) {
  //         // 네비게이션을 사용하여 해당 페이지로 이동
  //         // navigation.navigate('ExhDetailInfo', {exhId});
  //       }
  //     }
  //   };

  useEffect(() => {
    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp();
      } else {
        setBackPressedOnce(true);
        // showToast('뒤로 버튼을 한번 더 누르시면 종료됩니다.');
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressedOnce]);

  return (
    <Tab.Navigator
      initialRouteName="Diary"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Exhibition') {
            iconSource = focused ? <OnExhibitionIcon /> : <OffExhibitionIcon />;
          } else if (route.name === 'Calendar') {
            iconSource = focused ? <OnCalendarIcon /> : <OffCalendarIcon />;
          } else if (route.name === 'Diary') {
            iconSource = <CenterDiaryIcon />;
          } else if (route.name === 'Mate') {
            iconSource = focused ? <OnMateIcon /> : <OffMateIcon />;
          } else if (route.name === 'Setting') {
            iconSource = focused ? <OnSettingIcon /> : <OffSettingIcon />;
          }
          return iconSource;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {...footerStyles.view},
      })}
      backBehavior="none">
      <Tab.Screen name="Exhibition" component={ExhListScreen} />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        initialParams={{modalOpen: false}}
      />
      <Tab.Screen name="Diary" component={MyVisitExhListScreen} />
      <Tab.Screen name="Mate" component={MateMainScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

/** style */
const footerStyles = StyleSheet.create({
  view: {
    paddingTop: responsive(5),
    borderStyle: 'dashed',
    borderTopWidth: responsive(1.3),
    borderColor: BORDER_COLOR,
    backgroundColor: BACK_COLOR,
    elevation: 0, // 상단 테두리의 음영 효과를 없애기 위해 elevation 속성을 0으로 설정
    height: responsive(83),
  },
});
