import React from 'react';
import styled from 'styled-components/native';
import {SoloDiaryInfoType} from '~/features/solo-note/util/soloDiaryType';
import responsive from './util/responsiveSize';
import {DARK_GREY, MIDDLE_GREY, TEXTINPUTFORM_COLOR} from './util/colors';
import {FONT_NAME} from './util/style';

interface SoloNoteProps {
  soloDiary: SoloDiaryInfoType;
}

const SoloNote: React.FC<SoloNoteProps> = ({soloDiary}) => {
  const image = 'https://art-diary.s3.ap-northeast-2.amazonaws.com/default1';
  return (
    <Container>
      <QuestionWrapper>
        <ProfileWrapper>
          <Profile
            source={{uri: `${soloDiary.profile ?? image}`}}
            resizeMode="cover"
            alt={'이미지'}
          />
        </ProfileWrapper>
        <UserWrapper>
          {soloDiary.nickname && <UserText>{soloDiary.nickname}</UserText>}
          <QuestionText>{soloDiary.question}</QuestionText>
        </UserWrapper>
      </QuestionWrapper>
      <AnswerView>
        <AnswerText>{soloDiary.answer}</AnswerText>
      </AnswerView>
      <WriteDate>{soloDiary.writeDate}</WriteDate>
    </Container>
  );
};

export default SoloNote;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${responsive(10)}px;
  padding-bottom: ${responsive(5)}px;
`;

const QuestionWrapper = styled.View`
  flex-direction: row;
  gap: ${responsive(10)}px;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  border-radius: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  width: ${responsive(41)}px;
  height: ${responsive(41)}px;
  overflow: hidden;
`;

const Profile = styled.Image`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const UserWrapper = styled.View`
  flex-direction: column;
`;

const UserText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const QuestionText = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const AnswerView = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-top: ${responsive(2)}px;
  padding: ${responsive(20)}px;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${responsive(20)}px;
`;

const AnswerText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${responsive(18)}px;
`;

const WriteDate = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  text-align: right;
  padding-right: ${responsive(3)}px;
`;
