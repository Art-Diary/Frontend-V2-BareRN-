import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SoloVisitedExhListScreen from '~/pages/solo/SoloVisitedExhListScreen';
import SearchScreen from '~/pages/exhibition/SearchScreen';
import MateMainScreen from '~/pages/together/MateMainScreen';
import SettingScreen from '~/pages/setting/SettingScreen';
import BottomTabBar from './BottomTabBar';

export type MainTabParamList = {
  Solo: undefined;
  Search: undefined;
  Gathering: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Solo" component={SoloVisitedExhListScreen} />

      <Tab.Screen name="Search" component={SearchScreen} />

      <Tab.Screen name="Gathering" component={MateMainScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
