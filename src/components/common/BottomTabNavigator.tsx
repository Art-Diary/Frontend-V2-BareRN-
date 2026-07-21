import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SoloVisitedExhListScreen from '~/screens/solo/SoloVisitedExhListScreen';
import SearchScreen from '~/screens/exhibition/SearchScreen';
import SettingScreen from '~/screens/setting/SettingScreen';
import BottomTabBar from './BottomTabBar';
import GatheringListScreen from '~/screens/gathering/GatheringListScreen';

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

      <Tab.Screen name="Gathering" component={GatheringListScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
