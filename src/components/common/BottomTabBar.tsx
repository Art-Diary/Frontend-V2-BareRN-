import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import * as S from './BottomTabBar.style';
import {BookOpen, MessageSquare, Search, Settings} from 'lucide-react-native';

const BottomTabBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <S.Container>
      <S.TabButton
        active={state.index === 0}
        onPress={() => navigation.navigate('Solo')}>
        <BookOpen size={18} color={state.index === 0 ? '#7EB5DF' : '#A2B6C5'} />

        <S.Label active={state.index === 0}>티켓북</S.Label>
      </S.TabButton>

      <S.TabButton
        active={state.index === 1}
        onPress={() => navigation.navigate('Search')}>
        <Search size={18} color={state.index === 1 ? '#7EB5DF' : '#A2B6C5'} />

        <S.Label active={state.index === 1}>전시회</S.Label>
      </S.TabButton>

      <S.TabButton
        active={state.index === 2}
        onPress={() => navigation.navigate('Gathering')}>
        <MessageSquare
          size={18}
          color={state.index === 2 ? '#7EB5DF' : '#A2B6C5'}
        />

        <S.Label active={state.index === 2}>모임</S.Label>
      </S.TabButton>

      <S.TabButton
        active={state.index === 3}
        onPress={() => navigation.navigate('Setting')}>
        <Settings size={18} color={state.index === 3 ? '#7EB5DF' : '#A2B6C5'} />

        <S.Label active={state.index === 3}>설정</S.Label>
      </S.TabButton>
    </S.Container>
  );
};

export default BottomTabBar;
