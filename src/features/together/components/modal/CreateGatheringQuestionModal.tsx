import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {GatheringQuestionType} from '../../util/gatheringQuestionType';
import {
  useCreateGatheringQuestion,
  useUpdateGatheringQuestion,
} from '~/api/gathering/gatheringQuestion';
import {showToast} from '~/components/util/showToast';
import {
  checkBlankInKeyword,
  removeControlCharacter,
} from '~/components/util/checkKeyword';
import InfoModal from '~/components/modal/InfoModal';
import LoadingModal from '~/components/modal/LoadingModal';
import {DARK_GREY, LIGHT_GREY, MAIN_COLOR} from '~/components/util/colors';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/util/style';

interface Props {
  questionInfo: GatheringQuestionType | undefined;
  gatheringId: number;
  exhId: number;
  isUpdate: boolean;
  handleCloseModal: () => void;
}

const CreateGatheringQuestionModal: React.FC<Props> = ({
  questionInfo,
  gatheringId,
  exhId,
  isUpdate,
  handleCloseModal,
}) => {
  const maxInputLength = 12;
  const [questionKeyword, setQuestionKeyword] = useState<string | undefined>(
    questionInfo?.question,
  );
  const {
    mutate: createQuestion,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
  } = useCreateGatheringQuestion();
  const {
    mutate: updateQuestion,
    isError,
    isSuccess,
    isPending,
  } = useUpdateGatheringQuestion();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해 주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isCreateError) {
      showToast('다시 시도해 주세요.');
    }
    if (isCreateSuccess) {
      handleCloseModal();
    }
  }, [isCreateError, isCreateSuccess]);

  const onPressComplete = () => {
    if (!questionKeyword) {
      showToast('질문을 작성해 주세요.');
      return;
    }
    if (checkBlankInKeyword(questionKeyword)) {
      showToast('질문을 작성해 주세요.');
      return;
    }
    let info = {
      gatheringId: gatheringId,
      exhId: exhId,
      questionText: questionKeyword,
    };
    if (isUpdate && questionInfo) {
      updateQuestion({
        ...info,
        questionId: questionInfo?.gatheringQuestionId,
      });
    } else {
      createQuestion(info);
    }
  };

  const onChangeText = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setQuestionKeyword(cleaned);
  }, []);

  return (
    <InfoModal handleCloseModal={handleCloseModal}>
      <LoadingModal isLoading={isPending || isCreatePending} />
      <Message>질문 작성</Message>
      <Wrapper>
        <SearchWord
          haveText={questionKeyword}
          onChangeText={onChangeText}
          placeholderTextColor={LIGHT_GREY}
          placeholder={questionKeyword ?? '질문을 작성해주세요.'}
          value={questionKeyword}
        />
      </Wrapper>
      <CustomTouchable onPress={onPressComplete}>
        <NextButton>완료</NextButton>
      </CustomTouchable>
    </InfoModal>
  );
};

export default CreateGatheringQuestionModal;

/** style */
const Message = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const Wrapper = styled.View`
  flex: 1;
`;

const SearchWord = styled.TextInput`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-bottom: ${responsive(7)}px;
  border-bottom-width: 1px;
  border-color: ${MAIN_COLOR};
`;

const NextButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
