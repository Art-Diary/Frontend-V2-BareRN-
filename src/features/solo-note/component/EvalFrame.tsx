import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useEvaluationInfo} from '~/zustand/evaluationInfo';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import CenterQuestion from '~/components/CenterQuestion';

type SelectedByFactor = Record<number, number | Set<number>>;

interface Props {
  selectedByFactor: SelectedByFactor;
  setSelectedByFactor: React.Dispatch<React.SetStateAction<SelectedByFactor>>;
}

const EvalFrame: React.FC<Props> = ({
  selectedByFactor,
  setSelectedByFactor,
}) => {
  const evaluationInfo = useEvaluationInfo();

  const toggleSelect = (factorId: number, optionId: number) => {
    setSelectedByFactor(prev => {
      const next: SelectedByFactor = {...prev};

      if (factorId === 1) {
        // ✅ 1번 항목은 다중 선택
        const currentSet = (next[factorId] as Set<number>) ?? new Set();
        if (currentSet.has(optionId)) {
          currentSet.delete(optionId); // 이미 있으면 해제
        } else {
          currentSet.add(optionId); // 없으면 추가
        }
        next[factorId] = new Set(currentSet); // 새로운 Set으로 갱신 (불변성 유지)
      } else {
        // ✅ 나머지는 단일 선택
        if (next[factorId] === optionId) {
          delete next[factorId]; // 같은 걸 누르면 해제
        } else {
          next[factorId] = optionId;
        }
      }

      return next;
    });
  };

  return (
    <>
      {/* 질문 */}
      <CenterQuestion question={'전시회 어땠어?'} />
      <FlatList
        ListEmptyComponent={<></>}
        data={evaluationInfo ?? []}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingTop: responsive(10),
        }}
        renderItem={({item, index}) => {
          const isLast = index === (evaluationInfo?.length ?? 0) - 1;

          return (
            <SectionView>
              <QuestionView>
                <QuestionText>{item.factorName}</QuestionText>
              </QuestionView>
              <FlatList
                data={item.optionInfoList}
                showsVerticalScrollIndicator={false}
                style={{
                  flexDirection: isLast ? 'column' : 'row',
                  justifyContent: 'space-around',
                }}
                renderItem={({item: opt, index: optIdx}) => {
                  const isSelected =
                    item.factorId === 1
                      ? selectedByFactor[1] instanceof Set &&
                        (selectedByFactor[1] as Set<number>).has(opt.optionId)
                      : selectedByFactor[item.factorId] === opt.optionId;

                  return (
                    <OptionView
                      isLast={isLast}
                      isSelected={isSelected}
                      activeOpacity={0.8}
                      onPress={() =>
                        toggleSelect(
                          item.factorId ?? index,
                          opt.optionId ?? optIdx,
                        )
                      }>
                      <OptionText isSelected={isSelected}>
                        {opt.optionName}
                      </OptionText>
                    </OptionView>
                  );
                }}
              />
            </SectionView>
          );
        }}
      />
    </>
  );
};

export default EvalFrame;

/** style */
const SectionView = styled.View`
  flex-direction: column;
  gap: ${responsive(10)}px;
  padding-top: ${responsive(30)}px;
`;

const QuestionView = styled.View`
  flex-direction: column;
`;

const QuestionText = styled.Text`
  color: ${DARK_GREY};
  font-size: ${responsive(18)}px;
  font-family: ${FONT_NAME};
`;

interface Option {
  isLast: boolean;
  isSelected: boolean;
}

const OptionView = styled.TouchableOpacity<Option>`
  background-color: ${(props: Option) =>
    props.isSelected ? MAIN_COLOR : 'transparent'};
  border-color: ${(props: Option) =>
    props.isSelected ? MAIN_COLOR : MIDDLE_GREY};
  border-radius: ${responsive(20)}px;
  border-width: ${responsive(1.5)}px;
  padding-top: ${responsive(7.5)}px;
  padding-bottom: ${responsive(7.5)}px;
  padding-left: ${responsive(23)}px;
  padding-right: ${responsive(23)}px;
  margin-bottom: ${(props: Option) =>
    props.isLast ? `${responsive(8)}` : `0`}px;
`;

const OptionText = styled.Text<Option>`
  color: ${(props: Option) => (props.isSelected ? `#FFFF` : MIDDLE_GREY)};
  font-size: ${responsive(18)}px;
  font-family: ${FONT_NAME};
`;
