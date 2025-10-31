import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {useCreateGathering} from '~/api/gathering/gathering';
import CustomTouchable from '~/components/CustomTouchable';
import InfoModal from '~/components/modal/InfoModal';
import LoadingModal from '~/components/modal/LoadingModal';
import {
  checkBlankInKeyword,
  removeControlCharacter,
} from '~/components/util/checkKeyword';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';

interface Props {
  handleCloseModal: () => void;
}

const CreateGatheringModal: React.FC<Props> = ({handleCloseModal}) => {
  const maxInputLength = 12;
  const [gahteringKeyword, setGahteringKeyword] = useState<string>('');
  const {
    mutate: createGathering,
    isPending,
    isError,
    isSuccess,
  } = useCreateGathering();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해 주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
      // [TODO] 모임 안으로 들어가기
    }
  }, [isError, isSuccess]);

  const onChangeGathering = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setGahteringKeyword(cleaned);
  }, []);

  const onPressCreate = () => {
    if (checkBlankInKeyword(gahteringKeyword)) {
      showToast('다시 작성해주세요.');
    } else {
      createGathering(gahteringKeyword);
    }
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isPending} />
      <Message>모임 만들기</Message>
      {/* body */}
      <ContentWrapper>
        <WriteView>
          <GatheringInput
            maxLength={maxInputLength}
            multiline={false}
            placeholderTextColor={LIGHT_GREY}
            placeholder={'새로운 모임 이름을 작성해주세요.'}
            onChangeText={onChangeGathering}
            value={gahteringKeyword}
          />
          <CountText>
            {gahteringKeyword.length} / {maxInputLength}
          </CountText>
        </WriteView>
      </ContentWrapper>
      {/* 모임 만들기 버튼 */}
      <CustomTouchable onPress={onPressCreate}>
        <CreateButton>모임 만들기</CreateButton>
      </CustomTouchable>
    </InfoModal>
  );
};

export default CreateGatheringModal;

/** style */
const Message = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const CreateButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const WriteView = styled.View`
  flex-direction: row;
  border-width: ${responsive(1.5)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${responsive(5)}px;
  padding-right: ${responsive(5)}px;
  padding-top: ${responsive(5)}px;
  padding-bottom: ${responsive(5)}px;
`;

const GatheringInput = styled.TextInput`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  width: 85%;
  padding-bottom: ${responsive(7)}px;
`;

const CountText = styled.Text`
  font-size: ${responsive(16)}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;
