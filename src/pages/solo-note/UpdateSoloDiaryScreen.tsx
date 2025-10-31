import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import {useUpdateSoloDiary} from '~/api/solo-note/soloDiary';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {checkBlankInKeyword} from '~/components/util/checkKeyword';
import {showToast} from '~/components/util/showToast';
import {changeDateTimeFormat} from '~/components/util/date';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import BodyFrame from '~/components/BodyFrame';
import WriteSoloDiary from '~/features/solo-note/component/WriteSoloDiary';
import CustomTouchable from '~/components/CustomTouchable';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  FONT_NAME,
} from '~/components/util/style';
import {DARK_GREY} from '~/components/util/colors';
import {RootStackParamList} from '~/navigationTypes';

type UpdateSoloDiaryProp = RouteProp<RootStackParamList, 'UpdateSoloDiary'>;

interface Props {
  route: UpdateSoloDiaryProp;
}
const UpdateSoloDiaryScreen: React.FC<Props> = ({route}) => {
  const {soloDiary} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [answerKeyword, setAnswerKeyword] = useState<string>(soloDiary.answer);
  const [isPublic, setIsPublic] = useState<boolean>(soloDiary.isPublic);

  const {
    mutate: updateSoloDiary,
    isError,
    isSuccess,
    isPending,
  } = useUpdateSoloDiary(soloDiary.exhId);

  useApiErrorToast(isError);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  const onPress = () => {
    if (checkBlankInKeyword(answerKeyword)) {
      showToast('글을 작성해주세요.');
      return;
    }
    updateSoloDiary({
      exhId: soloDiary.exhId,
      soloDiaryId: soloDiary.soloDiaryId,
      questionId: soloDiary.questionId,
      answer: answerKeyword,
      writeDate: changeDateTimeFormat(new Date()),
      isPublic: isPublic,
    });
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      {/* header */}
      <WithBackFrame title={'기록 작성'} line={true} />
      {/* body */}
      <BodyFrame>
        <WriteSoloDiary
          answerKeyword={answerKeyword}
          setAnswerKeyword={setAnswerKeyword}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          soloDiary={soloDiary}
        />
        <ButtonView>
          <CustomTouchable onPress={onPress}>
            <NextButton moveNext={true}>{'완료 ->'}</NextButton>
          </CustomTouchable>
        </ButtonView>
      </BodyFrame>
    </PageFrame>
  );
};

export default UpdateSoloDiaryScreen;

/** style */
const ButtonView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const NextButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  text-align: center;
  color: ${DARK_GREY};
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;
