import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import SearchNewMateListInGathering from '../SearchNewMateListInGathering';
import {useCreateGatheringMember} from '~/api/gathering/gathering';
import {showToast} from '~/components/util/showToast';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import InfoModal from '~/components/modal/InfoModal';
import LoadingModal from '~/components/modal/LoadingModal';
import SearchFrame from '~/components/SearchFrame';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR} from '~/components/util/colors';

interface Props {
  gatheringId: number;
  handleCloseModal: () => void;
}

const CreateGatheringMemberModal: React.FC<Props> = ({
  gatheringId,
  handleCloseModal,
}) => {
  const [nicknameKeyword, setNicknameKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMate, setSelectedMate] = useState(-1);
  const {
    mutate: createGatheringMember,
    isPending,
    isError,
    isSuccess,
    error,
  } = useCreateGatheringMember(gatheringId);

  useEffect(() => {
    if (isError) {
      const errorMsg = error.message;

      if (errorMsg.includes('409')) {
        showToast('이미 추가된 전시 메이트입니다.');
      } else {
        showToast('다시 시도해 주세요.');
      }
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess]);

  const onPressCreate = () => {
    console.log(selectedMate);
    Keyboard.dismiss();
    if (selectedMate !== -1) {
      createGatheringMember({gatheringId: gatheringId, userId: selectedMate});
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
      <AreaView>
        <Message greyColor={false}>모임 메이트 선택</Message>
        <Message greyColor={true}>(내 전시 메이트만 가능)</Message>
      </AreaView>
      <Contents>
        <SearchFrame
          searchKeyword={nicknameKeyword}
          onPressSearch={onPressSearch}
          handleSearchKeyword={setNicknameKeyword}
          searchMessage={'닉네임을 검색하세요'}>
          {/* 모임 메이트 목록 */}
          <SearchNewMateListInGathering
            gatheringId={gatheringId}
            searchKeyword={keyword}
            selectedMate={selectedMate}
            handleSelectedMate={setSelectedMate}
          />
        </SearchFrame>
        {/* 모임 메이트 추가 버튼 */}
        <CustomTouchable onPress={onPressCreate} disabled={selectedMate === -1}>
          <CreateButton isSelected={selectedMate !== -1}>추가</CreateButton>
        </CustomTouchable>
      </Contents>
    </InfoModal>
  );
};

export default CreateGatheringMemberModal;

/** style */
const AreaView = styled.View`
  flex-direction: row;
  padding-top: ${responsive(1)}px;
  padding-left: ${responsive(5)}px;
  gap: ${responsive(1.5)}px;
  align-items: center;
`;

interface AreaTextProps {
  greyColor: boolean;
}

const Message = styled.Text`
  font-size: ${(props: AreaTextProps) =>
    props.greyColor ? `${responsive(14)}px` : `${BUTTON_FONT_SIZE}px`};
  color: ${(props: AreaTextProps) =>
    props.greyColor ? `${LIGHT_GREY}` : `${DARK_GREY}`};
  font-family: ${FONT_NAME};
`;

const Contents = styled.View`
  flex: 1;
`;

interface CreateButtonProps {
  isSelected: boolean;
}

const CreateButton = styled.Text<CreateButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: CreateButtonProps) =>
    props.isSelected ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
