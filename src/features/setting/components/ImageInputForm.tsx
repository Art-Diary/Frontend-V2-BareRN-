import React from 'react';
import {Alert, Linking} from 'react-native';
import styled from 'styled-components/native';
import {requestCameraPermission} from '../util/photo';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {showToast} from '~/components/util/showToast';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {PencilUpdateNoUnderbarIcon} from '~/components/icon';

interface ImageInputFormProps {
  image: string | undefined;
  handleImage: (image: string | undefined) => void;
}

const ImageInputForm: React.FC<ImageInputFormProps> = ({
  image,
  handleImage,
}) => {
  const showPhoto = async () => {
    const result = await requestCameraPermission();
    console.log('result:', result);

    if (!result) {
      Linking.openSettings().catch(() => {
        showToast('설정으로 이동할 수 없습니다.');
      });
      return;
    }

    const option: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    const response = await launchImageLibrary(option);

    if (response.errorMessage) {
      Alert.alert('Error : ' + response.errorMessage);
    } else {
      const uris: Asset[] = [];

      response.assets?.forEach(value => uris.push(value));

      const imageUri = uris[0].uri;

      handleImage(imageUri);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ProfileWrapper>
          <Profile
            source={{uri: `${image ?? process.env.DEFAULT_IMAGE}`}}
            resizeMode="cover"
            alt={'이미지'}
          />
        </ProfileWrapper>
        <CustomTouchable
          onPress={showPhoto}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
            marginLeft: responsive(-8),
          }}>
          <PencilUpdateNoUnderbarIcon />
        </CustomTouchable>
      </Wrapper>
    </Container>
  );
};

export default ImageInputForm;

/** style */
const Container = styled.View`
  flex-direction: row;
  height: 11%;
  margin-top: ${responsive(15)}px;
  margin-bottom: ${responsive(25)}px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(73)}px;
  height: ${responsive(73)}px;
  overflow: hidden;
  /* border: 1px; */
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;
