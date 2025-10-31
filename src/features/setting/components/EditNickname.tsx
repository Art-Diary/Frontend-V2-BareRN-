import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useFetchVerifyNickname} from '~/api/auth/userInfo';
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
  TEXTINPUTFORM_COLOR,
} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {showToast} from '~/components/util/showToast';
import {FONT_NAME} from '~/components/util/style';
import {useUserInfo} from '~/zustand/userInfo';

interface EditNicknameProps {
  getNickname: string;
  setNickname: (nickname: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  isVerified: boolean;
}
// [TODO] 수정
// [WORD_LIMIT]
const EditNickname: React.FC<EditNicknameProps> = ({
  getNickname,
  setNickname,
  setIsVerified,
  isVerified,
}) => {
  const originalName = getNickname;
  const maxInputLength = 10;
  const userInfo = useUserInfo();
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>('');
  const [state, setState] = useState(false);
  const {isError, isSuccess, isLoading, error} = useFetchVerifyNickname(
    getNickname,
    state,
  );

  const onChangeNickname = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setNickname(cleaned);
    if (cleaned === originalName) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    setMessage(null);
  }, []);

  useEffect(() => {
    if (isError) {
      const errorMsg = error.message;

      if (errorMsg.includes('409')) {
        // 상태 코드를 체크 (예: 409 Conflict)
        if (userInfo.nickname === getNickname) {
          setMessage(' 사용 가능한 닉네임입니다.');
          setMessageColor('green');
          setIsVerified(true);
        } else {
          setMessage(' 이미 사용 중인 닉네임입니다.');
          setMessageColor('red');
        }
      } else {
        showToast('다시 시도해주세요.');
      }
      setState(false);
    }
    if (isSuccess) {
      setMessage(' 사용 가능한 닉네임입니다.');
      setMessageColor('green');
      setIsVerified(true);
      setState(false);
    }
  }, [isError, isSuccess]);

  const onPressVerify = () => {
    // check nickname
    const nickname = getNickname.replace(/(\s*)/g, '');

    if (checkBlankInKeyword(getNickname)) {
      setMessage(' 닉네임을 작성해주세요.');
      setMessageColor('red');
    } else if (
      nickname.includes('전시메이트') ||
      nickname.includes('kakao_') ||
      nickname.includes('google_') ||
      nickname.includes('naver_')
    ) {
      setMessage(' 이미 사용 중인 닉네임입니다.');
      setMessageColor('red');
    } else {
      setState(true);
    }
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <CountWrapper>
        <SectionWapper>
          <SectionStar>*</SectionStar>
          <SectionName main={true} color={DARK_GREY}>
            닉네임
          </SectionName>
        </SectionWapper>
        <CountText>
          ( {getNickname ? getNickname.length : 0} / {maxInputLength} )
        </CountText>
        {message !== null && (
          <SectionName color={messageColor}>{message}</SectionName>
        )}
      </CountWrapper>
      {/* section 내용 */}
      <ContentRow>
        <BodyWrapper>
          <TextInputView
            maxLength={maxInputLength}
            placeholderTextColor={LIGHT_GREY}
            placeholder={
              getNickname === '' ? '닉네임을 입력해주세요.' : getNickname
            }
            value={getNickname}
            onChangeText={onChangeNickname}
          />
        </BodyWrapper>
        <CheckButton
          activeOpacity={0.6}
          isVerified={isVerified}
          disabled={isVerified}
          onPress={onPressVerify}>
          <CheckText>중복확인</CheckText>
        </CheckButton>
      </ContentRow>
    </Container>
  );
};

export default EditNickname;

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  gap: ${responsive(8)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

interface SectionNameProps {
  main: boolean;
  color: string;
}

const SectionName = styled.Text<SectionNameProps>`
  font-size: ${(props: SectionNameProps) =>
    props.main ? `${responsive(18)}px` : `${responsive(13)}px`};
  color: ${(props: SectionNameProps) => props.color};
  font-family: ${FONT_NAME};
`;

const CountText = styled.Text`
  font-size: ${responsive(15)}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;

interface CheckButtonProps {
  isVerified: boolean;
}

const CheckButton = styled.TouchableOpacity<CheckButtonProps>`
  padding: ${responsive(8)}px;
  border-radius: ${responsive(20)}px;
  background-color: ${(props: CheckButtonProps) =>
    props.isVerified ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
`;

const CheckText = styled.Text`
  text-align: center;
  color: white;
  font-size: ${responsive(14)}px;
  font-family: ${FONT_NAME};
`;

const CountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${responsive(3)}px;
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${responsive(5)}px;
`;

const SectionStar = styled.Text`
  font-size: ${responsive(20)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;

const BodyWrapper = styled.View`
  flex-direction: column;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${responsive(15)}px;
  width: 81%;
  padding: ${responsive(5)}px;
  padding-left: ${responsive(13)}px;
  padding-right: ${responsive(13)}px;
`;

const TextInputView = styled.TextInput`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-right: 0%;
`;
