import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'App';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {EvalInfoType} from '../util/soloDiaryType';
import {FlatList} from 'react-native';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';
import {CheckIcon, PencilUpdateNoUnderbarIcon} from '~/components/icon';

interface EvalInfoProps {
  exhId: number;
  evalInfoList: EvalInfoType[];
  isForMate?: boolean;
}

type InfoType = {
  factorId: number;
  factorName: string;
  optionName: string[];
};

const EvalInfo: React.FC<EvalInfoProps> = ({
  exhId,
  evalInfoList,
  isForMate,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [info, setInfo] = useState<InfoType[]>([]);

  // 보여주기는 다르게
  useEffect(() => {
    if (evalInfoList) {
      const data: InfoType[] = [];

      for (let i = 0; i < evalInfoList.length; i++) {
        const item = evalInfoList[i];

        // data 안에서 같은 factorId 가진 객체 찾기
        const found = data.find(d => d.factorId === item.factorId);

        if (found) {
          // 이미 있으면 optionName 배열에 push
          found.optionName.push(item.optionName);
        } else {
          // 없으면 새로 만들어서 추가
          data.push({
            factorId: item.factorId,
            factorName: item.factorName,
            optionName: [item.optionName],
          });
        }
      }
      setInfo(data);
    }
  }, [evalInfoList]);

  const onPress = () => {
    // 수정 페이지로
    navigation.navigate('EditEvaluation', {
      exhId,
      evalChoiceList: evalInfoList,
    });
  };

  return (
    <Contents>
      <SectionNameView>
        <SectionNameText>{'이런 점이 좋았어!'}</SectionNameText>
        {!isForMate && (
          <CustomTouchable onPress={onPress}>
            <PencilUpdateNoUnderbarIcon />
          </CustomTouchable>
        )}
      </SectionNameView>
      <FlatList<InfoType>
        data={info ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <InfoView>
            <QuestionWrapper>
              <CheckIcon />
              <InfoText>{item.factorName}</InfoText>
            </QuestionWrapper>
            <FlatList
              data={item.optionName}
              renderItem={({item: item1, index}) => (
                <ChoiceView>
                  <ChoiceText>{item1}</ChoiceText>
                </ChoiceView>
              )}
            />
          </InfoView>
        )}
        style={{gap: responsive(5)}}
      />
    </Contents>
  );
};

export default EvalInfo;

/** style */
const Contents = styled.View`
  flex-direction: column;
  padding-top: ${responsive(18)}px;
  padding-bottom: ${responsive(30)}px;
  gap: ${responsive(15)}px;
`;

const SectionNameView = styled.View`
  flex-direction: row;
  gap: ${responsive(5)}px;
  align-items: center;
`;

const SectionNameText = styled.Text`
  font-size: ${responsive(19)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const QuestionWrapper = styled.View`
  flex-direction: row;
  gap: ${responsive(7)}px;
`;

const InfoView = styled.View`
  flex-direction: row;
  gap: ${responsive(10)}px;
  justify-content: space-between;
  margin-bottom: ${responsive(1)}px;
`;

const InfoText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ChoiceView = styled.View`
  justify-content: space-between;
  align-items: center;
  border-radius: ${responsive(20)}px;
  border-color: ${MAIN_COLOR};
  border-width: ${responsive(1.3)}px;
  padding-top: ${responsive(3)}px;
  padding-bottom: ${responsive(3)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(15)}px;
  margin-bottom: ${responsive(1)}px;
`;

const ChoiceText = styled.Text`
  font-size: ${responsive(13)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  text-align: center;
`;
