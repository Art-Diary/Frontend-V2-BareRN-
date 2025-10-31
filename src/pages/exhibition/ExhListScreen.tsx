import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PageFrame from '~/components/PageFrame';
import Header from '~/components/Header';
import CustomTouchable from '~/components/CustomTouchable';
import {SearchButtonIcon} from '~/components/icon';
import ExhListWithHeart from '~/features/exhibition/components/ExhListWithHeart';
import {RootStackNavigationProp} from '~/App';

export default function ExhListScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressSearchButton = () => {
    navigation.navigate('ExhSearch');
  };

  return (
    <PageFrame>
      {/* header */}
      <Header title={'전시회'}>
        <CustomTouchable onPress={onPressSearchButton}>
          <SearchButtonIcon />
        </CustomTouchable>
      </Header>

      {/* body */}
      <ExhListWithHeart />
    </PageFrame>
  );
}
