import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useUpdateEvalChoice} from '~/api/solo-note/evaluation';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {
  EvalInfoType,
  SelectedEvalChoiceType,
} from '~/features/solo-note/util/soloDiaryType';
import {showToast} from '~/components/util/showToast';
import PageFrame from '~/components/PageFrame';
import LoadingModal from '~/components/modal/LoadingModal';
import WithBackFrame from '~/components/WithBackFrame';
import BodyFrame from '~/components/BodyFrame';
import EvalFrame from '~/features/solo-note/component/EvalFrame';
import CustomTouchable from '~/components/CustomTouchable';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  FONT_NAME,
} from '~/components/util/style';
import {DARK_GREY} from '~/components/util/colors';
import {RootStackParamList} from '~/navigationTypes';

type DoEvaluationProp = RouteProp<RootStackParamList, 'EditEvaluation'>;

interface Props {
  route: DoEvaluationProp;
}

const EditEvaluationScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const {evalChoiceList} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  // 수정 api
  const {
    mutate: updateEvalChoice,
    isPending,
    isSuccess,
    isError,
  } = useUpdateEvalChoice(exhId);

  useApiErrorToast(isError);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  const [selectedByFactor, setSelectedByFactor] = useState<
    Record<number, number | Set<number>>
  >({
    1: new Set<number>(),
  });

  const isMulti = (factorId: number) => factorId === 1;
  const hydrateFromChoices = (choices: EvalInfoType[]) => {
    const next: Record<number, number | Set<number>> = {1: new Set<number>()};

    for (const c of choices) {
      const {factorId, optionId} = c;
      if (isMulti(factorId)) {
        const s = (
          next[factorId] instanceof Set ? next[factorId] : new Set<number>()
        ) as Set<number>;
        s.add(optionId);
        next[factorId] = s;
      } else {
        next[factorId] = optionId; // 단일: 마지막 값이 최종 선택
      }
    }
    setSelectedByFactor(next);
  };

  // 최초 진입/파라미터 변경 시 초기화
  useEffect(() => {
    if (Array.isArray(evalChoiceList) && evalChoiceList.length > 0) {
      hydrateFromChoices(evalChoiceList as EvalInfoType[]);
    }
  }, [evalChoiceList]);

  const onPress = () => {
    const requiredKeys = [1, 2, 3];
    const isAllSelected = requiredKeys.every(k => {
      const value = selectedByFactor[k];
      if (k === 1) {
        return value instanceof Set && value.size > 0; // 다중 선택
      }
      return value !== undefined; // 단일 선택
    });

    if (!isAllSelected) {
      showToast('모든 항목을 선택해 주세요.');
      console.log('❌ 아직 선택되지 않은 항목 있음');
      return;
    }

    const choices: SelectedEvalChoiceType[] = [];
    Object.entries(selectedByFactor).forEach(([fidStr, v]) => {
      const factorId = Number(fidStr);
      if (v instanceof Set) {
        // 1번 factor: 다중 -> 여러 row로 push
        v.forEach(optionId => choices.push({factorId, optionId}));
      } else if (typeof v === 'number') {
        // 2,3번 factor: 단일
        choices.push({factorId, optionId: v});
      }
    });

    console.log('✅ 제출 리스트:', choices);
    updateEvalChoice({exhId, evalInfoList: choices});
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isPending} />
      {/* header */}
      <WithBackFrame title={'평가 수정'} line={true} />
      {/* body */}
      <BodyFrame>
        {/* 질문 */}
        <EvalFrame
          selectedByFactor={selectedByFactor}
          setSelectedByFactor={setSelectedByFactor}
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

export default EditEvaluationScreen;

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
