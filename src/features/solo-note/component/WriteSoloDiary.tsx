import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import {SoloDiaryInfoType} from '../util/soloDiaryType';
import CenterQuestion from '~/components/CenterQuestion';
import CustomTouchable from '~/components/CustomTouchable';
import {PrivateToggleIcon, PublicToggleIcon} from '~/components/icon';
import {
  DARK_GREY,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';
import {removeControlCharacter} from '~/components/util/checkKeyword';

interface WriteSoloDiaryProps {
  answerKeyword: string;
  setAnswerKeyword: (text: string) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  soloDiary: SoloDiaryInfoType;
}

const WriteSoloDiary: React.FC<WriteSoloDiaryProps> = ({
  answerKeyword,
  setAnswerKeyword,
  isPublic,
  setIsPublic,
  soloDiary,
}) => {
  const onChangeKeyword = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    setAnswerKeyword(cleaned);
  }, []);

  //========================================================================
  // 초기 패널 높이
  const DEFAULT_PANEL_HEIGHT = Math.round(
    Dimensions.get('window').height * 0.8,
  );
  const MIN_PANEL_HEIGHT = 140;

  const animatedHeight = useRef(
    new Animated.Value(DEFAULT_PANEL_HEIGHT),
  ).current;

  // 기준 높이: 최초 1회만 세팅
  const baseHeightRef = useRef<number>(0);
  // 패널이 현재 접힌 상태인지
  const isCollapsedRef = useRef<boolean>(false);
  // 키보드 보임 상태 디듀프용
  const keyboardVisibleRef = useRef<boolean>(false);

  const animateTo = (toValue: number) => {
    Animated.timing(animatedHeight, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  // 최초 onLayout에서만 원래 높이 고정
  const onWrapperLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && baseHeightRef.current === 0) {
      baseHeightRef.current = h; // 원래 높이 확정 (1회)
      animatedHeight.setValue(h); // 스냅
    }
  };

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = () => {
      // 중복 show 방지
      if (keyboardVisibleRef.current) return;
      keyboardVisibleRef.current = true;

      if (!isCollapsedRef.current && baseHeightRef.current > 0) {
        const half = Math.max(MIN_PANEL_HEIGHT, baseHeightRef.current / 2);
        animateTo(half);
        isCollapsedRef.current = true;
      }
    };

    const onHide = () => {
      // 중복 hide 방지
      if (!keyboardVisibleRef.current) return;
      keyboardVisibleRef.current = false;

      if (isCollapsedRef.current && baseHeightRef.current > 0) {
        animateTo(baseHeightRef.current);
        isCollapsedRef.current = false;
      }
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    // iOS에서 will/did가 둘 다 오는 케이스 대비 (선택)
    let extraShowSub: any, extraHideSub: any;
    if (Platform.OS === 'ios') {
      extraShowSub = Keyboard.addListener('keyboardDidShow', onShow);
      extraHideSub = Keyboard.addListener('keyboardDidHide', onHide);
    }

    return () => {
      showSub.remove();
      hideSub.remove();
      extraShowSub?.remove?.();
      extraHideSub?.remove?.();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0} // 상단 네비/탭 높이만큼 조절
    >
      {/* 질문 */}
      <CenterQuestion question={soloDiary.question}>
        <CustomTouchable onPress={() => setIsPublic(!isPublic)}>
          {isPublic ? <PublicToggleIcon /> : <PrivateToggleIcon />}
        </CustomTouchable>
      </CenterQuestion>
      {/* 답변 */}
      <Animated.View
        onLayout={onWrapperLayout}
        style={{
          height: animatedHeight,
          minHeight: MIN_PANEL_HEIGHT,
        }}>
        <Wrapper>
          <AnswerView>
            <AnswerInputView
              multiline={true}
              placeholderTextColor={MIDDLE_GREY}
              placeholder={!soloDiary.answer ? '너의 생각은?' : ''}
              textAlignVertical={'top'}
              onChangeText={onChangeKeyword}
              value={answerKeyword}
              scrollEnabled
            />
          </AnswerView>
        </Wrapper>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default WriteSoloDiary;

/** style */
const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-top: ${responsive(20)}px;
  height: 73%;
`;

const AnswerView = styled.View`
  flex-direction: column;
  padding: ${responsive(20)}px;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${responsive(20)}px;
  height: 100%;
`;

const AnswerInputView = styled.TextInput`
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  height: 100%;
  font-size: ${responsive(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  line-height: ${responsive(18)}px;
`;
