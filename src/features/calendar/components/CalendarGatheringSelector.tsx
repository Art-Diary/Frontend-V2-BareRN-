import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {findGatherColor} from './calendarColor';
import {GatheringColorInfo, MarkedType} from '~/components/util/calendarUtil';
import {GatheringInfoType} from '~/features/together/util/gatheringInfoType';
import CalendarFrame from '~/components/CalendarFrame';
import {BACK_COLOR, LIGHT_GREY, MAIN_COLOR} from '~/components/util/colors';
import responsive from '~/components/util/responsiveSize';
import {FONT_NAME} from '~/components/util/style';

interface SelectorProps {
  initDate: string;
  markedDates: MarkedType[];
  handleChangeSelectedDate: (date: string) => void;
  handleChangeMonth: (date: string) => void;
  handleGatheringId: (id: number) => void;
  gatherColorList: GatheringColorInfo[];
  gatheringList: GatheringInfoType[];
  gatheringId: number;
}

const CalendarGatheringSelector: React.FC<SelectorProps> = ({
  initDate,
  markedDates,
  handleChangeSelectedDate,
  handleChangeMonth,
  handleGatheringId,
  gatherColorList,
  gatheringList,
  gatheringId,
}) => {
  // State Management
  const [initialDate, setInitialDate] = useState(initDate);
  const [selectedId, setSelectedId] = useState(gatheringId); // 아이템 선택

  // Effects
  useEffect(() => {
    setInitialDate(initDate);
  }, [initDate]);

  useEffect(() => {
    setSelectedId(gatheringId);
  }, [gatheringId]);

  // Hooks
  // const navigation = useNavigation<RootStackNavigationProp>();
  // const params: any = useRoute().params;
  // useEffect(() => {
  //   if (params.fromPushAlarm) {
  //     setInitialDate(params.visitDate);
  //     handleGatheringId(-2);
  //     setSelectedId(-2);
  //     navigation.setParams({fromPushAlarm: false, visitDate: undefined}); // 상태 초기화
  //   }
  // }, [params.fromPushAlarm]);

  const onPressGathering = (gatheringId: number) => {
    handleGatheringId(gatheringId);
    setSelectedId(gatheringId);
  };

  return (
    <CalendarFrame
      initDate={initialDate}
      markedDates={markedDates}
      handleChangeSelectedDate={handleChangeSelectedDate}
      handleChangeMonth={handleChangeMonth}
      mainColor={
        selectedId === -2
          ? LIGHT_GREY
          : selectedId === -1
          ? MAIN_COLOR
          : findGatherColor(gatherColorList, selectedId)
      }>
      <GatheringWrapper>
        <ScrollView
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}>
          <GatheringTouch
            activeOpacity={0.6}
            onPress={() => onPressGathering(-2)}
            isPressed={selectedId === -2}
            color={LIGHT_GREY}>
            <GatheringNameText color={selectedId === -2 ? 'white' : LIGHT_GREY}>
              모두
            </GatheringNameText>
          </GatheringTouch>
          <GatheringTouch
            activeOpacity={0.6}
            onPress={() => onPressGathering(-1)}
            isPressed={selectedId === -1}
            color={MAIN_COLOR}>
            <GatheringNameText color={selectedId === -1 ? 'white' : MAIN_COLOR}>
              혼자
            </GatheringNameText>
          </GatheringTouch>
          {gatheringList &&
            gatherColorList &&
            gatheringList.map((item: GatheringInfoType, index: number) => {
              return (
                <GatheringTouch
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => onPressGathering(item.gatheringId)}
                  isPressed={selectedId === item.gatheringId}
                  color={
                    gatherColorList[index]
                      ? gatherColorList[index].color
                      : undefined
                  }>
                  <GatheringNameText
                    color={
                      selectedId === item.gatheringId
                        ? 'white'
                        : gatherColorList[index]
                        ? gatherColorList[index].color
                        : undefined
                    }>
                    {item.gatheringName}
                  </GatheringNameText>
                </GatheringTouch>
              );
            })}
        </ScrollView>
      </GatheringWrapper>
    </CalendarFrame>
  );
};

export default CalendarGatheringSelector;

/** style */
const GatheringWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${responsive(10)}px;
  padding-bottom: ${responsive(15)}px;
`;

interface TouchProps {
  color: string | undefined;
  isPressed: boolean;
}

const GatheringTouch = styled.TouchableOpacity<TouchProps>`
  flex-direction: row;
  padding: ${responsive(7)}px;
  padding-top: ${responsive(5)}px;
  padding-bottom: ${responsive(5)}px;
  border-color: ${(props: TouchProps) =>
    props.color ? `${props.color}` : `${MAIN_COLOR}`};
  border-width: ${responsive(1.1)}px;
  border-radius: ${responsive(15)}px;
  margin-right: ${responsive(3)}px;
  background-color: ${(props: TouchProps) =>
    props.color && props.isPressed ? `${props.color}` : `${BACK_COLOR}`};
`;

const GatheringNameText = styled.Text<TouchProps>`
  font-size: ${responsive(15)}px;
  color: ${(props: TouchProps) =>
    props.color ? `${props.color}` : `${MAIN_COLOR}`};
  font-family: ${FONT_NAME};
`;
