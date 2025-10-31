import React, {memo, useState} from 'react';
import {FlatList, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {GatheringDiaryType} from '../util/gatheringDiaryType';
import DeleteDiaryModal from './modal/DeleteDiaryModal';
import {useFetchGatheringDiaryList} from '~/api/gathering/gatheringDiary';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import DiaryUpdateDeleteModal from '~/components/modal/DiaryUpdateDeleteModal';
import responsive from '~/components/util/responsiveSize';
import {
  DARK_GREY,
  LIGHT_GREY,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import {useUserInfo} from '~/zustand/userInfo';

interface DiaryProps {
  gatheringId: number;
  exhId: number;
  questionId: number;
  active: boolean;
  handleUpdateGatheringDiary: (gatheringDiary: GatheringDiaryType) => void;
}

const GatheringDiaryList: React.FC<DiaryProps> = ({
  gatheringId,
  exhId,
  questionId,
  active,
  handleUpdateGatheringDiary,
}) => {
  const userInfo = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [gatheringDiaryData, setGatheringDiaryData] =
    useState<GatheringDiaryType>({
      gatheringDiaryId: -1,
      content: '',
      writeDate: '',
      userId: -1,
      nickname: '',
      profile: '',
    });
  const {data: diaryList, isError} = useFetchGatheringDiaryList(
    gatheringId,
    exhId,
    questionId,
    active,
  );

  useApiErrorToast(isError);

  const changeModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleModal = (gatheringDiary: GatheringDiaryType) => {
    setGatheringDiaryData({...gatheringDiary});
    changeModal();
  };

  const onPressUpdate = () => {
    handleUpdateGatheringDiary(gatheringDiaryData);
    changeModal();
  };

  const onPressDelete = () => {
    changeModal();
    setIsDeleteModalOpen(prev => !prev);
  };

  const onPressRealDelete = () => {
    setIsDeleteModalOpen(prev => !prev);
  };

  return (
    <Wrapper>
      <FlatList<GatheringDiaryType>
        // ListEmptyComponent={<InfoMessageView message={'글을 남겨주세요.'} />}
        inverted
        data={diaryList ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Container key={index}>
            {item.userId !== userInfo.userId && (
              <QuestionWrapper>
                <ProfileWrapper>
                  <Profile
                    source={{
                      uri: `${item.profile ?? process.env.DEFAULT_IMAGE}`,
                    }}
                    resizeMode="cover"
                    alt={'이미지'}
                  />
                </ProfileWrapper>
                <UserWrapper>
                  <UserText>{item.nickname}</UserText>
                </UserWrapper>
              </QuestionWrapper>
            )}
            <Pressable
              disabled={item.userId !== userInfo.userId}
              onLongPress={() => handleModal(item)}
              delayLongPress={400} // 길게 누르는 최소 시간(ms) 기본 ~500, 원하는 값으로
            >
              <AnswerView isMine={item.userId === userInfo.userId}>
                <AnswerText>{item.content}</AnswerText>
              </AnswerView>
            </Pressable>
            <WriteDate isMine={item.userId === userInfo.userId}>
              {item.writeDate}
            </WriteDate>
          </Container>
        )}
      />
      {isModalOpen && (
        <DiaryUpdateDeleteModal
          handleCloseModal={changeModal}
          handleUpdate={onPressUpdate}
          handleDelete={onPressDelete}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteDiaryModal
          gatheringDiaryRequest={{
            gatheringDiaryId: gatheringDiaryData.gatheringDiaryId,
            exhId,
            questionId,
            gatheringId,
          }}
          handleCloseModal={onPressRealDelete}
        />
      )}
    </Wrapper>
  );
};

export default memo(GatheringDiaryList, (prev, next) => {
  return (
    prev.gatheringId === next.gatheringId &&
    prev.exhId === next.exhId &&
    prev.questionId === next.questionId &&
    prev.active === next.active
  );
});

const Wrapper = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${responsive(5)}px;
  padding-bottom: ${responsive(15)}px;
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
  width: ${responsive(35)}px;
  height: ${responsive(35)}px;
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

interface ContainerProp {
  isMine: boolean;
}

const AnswerView = styled.View<ContainerProp>`
  flex-direction: column;
  justify-content: center;
  padding: ${responsive(20)}px;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${responsive(20)}px;
  margin-left: ${(props: ContainerProp) =>
    props.isMine ? `${responsive(20)}px` : `0px`};
  margin-right: ${(props: ContainerProp) =>
    !props.isMine ? `${responsive(20)}px` : `0px`};
`;

const AnswerText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${responsive(18)}px;
`;

const WriteDate = styled.Text<ContainerProp>`
  font-size: ${responsive(13)}px;
  color: ${LIGHT_GREY};
  font-family: ${FONT_NAME};
  text-align: ${(props: ContainerProp) => (props.isMine ? `right` : `left`)};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(5)}px;
`;
