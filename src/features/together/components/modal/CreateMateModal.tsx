import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import SearchNewMateList from '../SearchNewMateList';
import {useCreateMate} from '~/api/mate/mate';
import {showToast} from '~/components/util/showToast';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import InfoModal from '~/components/modal/InfoModal';
import LoadingModal from '~/components/modal/LoadingModal';
import SearchFrame from '~/components/SearchFrame';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR} from '~/components/util/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';

interface Props {
  handleCloseModal: () => void;
}

const CreateMateModal: React.FC<Props> = ({handleCloseModal}) => {
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: createMate,
    isPending,
    isError,
    isSuccess,
    error,
  } = useCreateMate();

  useEffect(() => {
    if (isError) {
      const errorMsg = error.message;

      if (errorMsg.includes('409')) {
        // 상태 코드를 체크 (예: 409 Conflict)
        showToast('이미 추가한 전시 메이트입니다.');
      } else {
        showToast('다시 시도해 주세요.');
      }
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess]);

  const onPressCreate = () => {
    Keyboard.dismiss();
    if (selectedMate !== -1) {
      createMate(selectedMate);
    } else {
      showToast('추가할 전시 메이트를 선택해주세요.');
    }
  };

  const onPressSearch = () => {
    if (checkBlankInKeyword(nicknameKeyword)) {
      showToast('다시 검색해 주세요.');
    } else {
      setSelectedMate(-1);
      setKeyword(nicknameKeyword);
    }
    Keyboard.dismiss();
  };

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isPending} />
      <Message>전시 메이트 추가</Message>
      {/* 달력 */}
      <Wrapper>
        <SearchFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요.'}>
          {/* 전시회 메이트 목록 */}
          {keyword !== '' && (
            <SearchNewMateList
              searchKeyword={keyword}
              selectedMate={selectedMate}
              handleSelectedMate={setSelectedMate}
            />
          )}
        </SearchFrame>
      </Wrapper>
      <CustomTouchable
        onPress={onPressCreate}
        disabled={selectedMate === -1 ? true : false}>
        <NextButton isSelected={selectedMate === -1 ? false : true}>
          추가
        </NextButton>
      </CustomTouchable>
    </InfoModal>
  );
};

export default CreateMateModal;

/** style */
const Message = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Wrapper = styled.View`
  flex: 1;
`;

interface ButtonProps {
  isSelected: boolean;
}

const NextButton = styled.Text<ButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: ButtonProps) =>
    props.isSelected ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
