import React, {useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteDiaryActions} from '~/zustand/soloDiary';
import {showToast} from '~/components/util/showToast';
import {SelectedEvalChoiceType} from '~/features/solo-note/util/soloDiaryType';
import PageFrame from '~/components/PageFrame';
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

type DoEvaluationProp = RouteProp<RootStackParamList, 'DoEvaluation'>;

interface Props {
  route: DoEvaluationProp;
}

const DoEvaluationScreen: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateEvaluationInfo} = useWriteDiaryActions();

  const [selectedByFactor, setSelectedByFactor] = useState<
    Record<number, number | Set<number>>
  >({
    1: new Set<number>(),
  });

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
    // 다음으로 넘어감
    // zustand에 저장
    updateEvaluationInfo(choices);
    navigation.navigate('WriteFirstSoloDiary', {exhId});
  };

  return (
    <PageFrame>
      {/* header */}
      <WithBackFrame title={'기록 작성'} line={true} />
      {/* body */}
      <BodyFrame>
        {/* 질문 */}
        <EvalFrame
          selectedByFactor={selectedByFactor}
          setSelectedByFactor={setSelectedByFactor}
        />

        <ButtonView>
          <CustomTouchable onPress={onPress}>
            <NextButton>{'다음 ->'}</NextButton>
          </CustomTouchable>
        </ButtonView>
      </BodyFrame>
    </PageFrame>
  );
};

export default DoEvaluationScreen;

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
