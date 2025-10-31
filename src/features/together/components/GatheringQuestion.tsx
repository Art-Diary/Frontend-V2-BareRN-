import React, {useState} from 'react';
import styled from 'styled-components/native';
import {GatheringQuestionType} from '../util/gatheringQuestionType';
import CreateGatheringQuestionModal from './modal/CreateGatheringQuestionModal';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import {PencilUpdateNoUnderbarIcon} from '~/components/icon';

interface GatheringQuestionProps {
  questionInfo: GatheringQuestionType;
  gatheringId: number;
  exhId: number;
}

const GatheringQuestion: React.FC<GatheringQuestionProps> = ({
  questionInfo,
  gatheringId,
  exhId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <Container>
      <ProfileWrapper>
        <Profile
          source={{uri: `${process.env.DEFAULT_IMAGE}`}}
          resizeMode="cover"
          alt={'이미지'}
        />
      </ProfileWrapper>
      <QuestionWrapper>
        <QuestionText>
          {questionInfo.question}
          <CustomTouchable
            style={{
              paddingLeft: responsive(7),
            }}
            onPress={handleModal}>
            <PencilUpdateNoUnderbarIcon />
          </CustomTouchable>
        </QuestionText>
      </QuestionWrapper>
      {isOpen && (
        <CreateGatheringQuestionModal
          questionInfo={questionInfo}
          gatheringId={gatheringId}
          exhId={exhId}
          isUpdate={true}
          handleCloseModal={handleModal}
        />
      )}
    </Container>
  );
};

export default GatheringQuestion;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${responsive(20)}px;
  align-items: center;
  margin-top: ${responsive(25)}px;
  padding-bottom: ${responsive(20)}px;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(73)}px;
  height: ${responsive(73)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const QuestionWrapper = styled.View`
  flex-direction: row;
`;

const QuestionText = styled.Text`
  font-size: ${responsive(22)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  text-align: center;
  line-height: ${responsive(25)}px;
  width: 100%;
`;
