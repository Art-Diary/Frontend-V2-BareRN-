import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {LogoIcon} from '~/components/icon';
import LoadingModal from '~/components/modal/LoadingModal';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {useBootstrap} from '~/features/login/hooks/useBootstrap';

const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {initialize} = useBootstrap();

  useEffect(() => {
    console.log('IN Splash');
    const bootstrap = async () => {
      const authenticated = await initialize();

      console.log('authenticated: ', authenticated);

      if (authenticated) {
        navigation.navigate('Main', {screen: 'Diary'});
      } else {
        console.log('go to Login');
        navigation.navigate('Login');
      }
    };

    bootstrap();
  }, []);

  return (
    <Container>
      <LoadingModal isLoading />
      <Contents>
        <ArtDiaryMainWrapper>
          <LogoIcon />
          <ArtDiary>Art Diary</ArtDiary>
        </ArtDiaryMainWrapper>
      </Contents>
    </Container>
  );
};

export default SplashScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #d4ebf8;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArtDiaryMainWrapper = styled.View`
  height: 50%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${responsive(10)}px;
`;

const ArtDiary = styled.Text`
  font-size: ${responsive(40)}px;
  color: #0a3981;
  font-family: ${FONT_NAME};
  text-align: center;
`;
