import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useFetchCalendar} from '~/api/calendar/calendar';
import {useFetchGatheringList} from '~/api/gathering/gathering';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import {
  GatheringColorInfo,
  MarkedType,
  buildColorList,
} from '~/components/util/calendarUtil';
import {BORDER_COLOR} from '~/components/util/colors';
import {dateToString, makeFullDateWithStr} from '~/components/util/date';
import {DASH_WIDTH} from '~/components/util/style';
import CalendarGatheringSelector from '~/features/calendar/components/CalendarGatheringSelector';
import ExhListOfDayInCalendar from '~/features/calendar/components/ExhListOfDayInCalendar';
import {settingGatherColor} from '~/features/calendar/util/settingGatherColor';
import PageFrame from '~/components/PageFrame';
import {RootStackParamList} from '~/navigationTypes';
import {RouteProp} from '@react-navigation/native';

type CalendarProp = RouteProp<RootStackParamList, 'Calendar'>;

interface Props {
  route: CalendarProp;
}

const CalendarScreen: React.FC<Props> = ({route}) => {
  const {date} = route.params;
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(
    date ?? dateToString(new Date()),
  );
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(
    date ?? dateToString(new Date()),
  );
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<MarkedType[]>([]);
  const [gatheringId, setGatheringId] = useState<number>(-1);
  const {
    data: exhInfoOfDays,
    isLoading,
    isError,
    isSuccess,
  } = useFetchCalendar(
    gatheringId === -1 ? 'alone' : gatheringId === -2 ? 'all' : 'gather',
    gatheringId > -1 ? gatheringId : null,
    Number(changeMonth.split('.')[0]),
    Number(changeMonth.split('.')[1]),
  );

  // API Hooks
  const {data: gatheringList} = useFetchGatheringList();
  const [gatherColorList, setGatherColorList] = useState<GatheringColorInfo[]>(
    [],
  );

  useApiErrorToast(isError);

  useEffect(() => {
    setGatheringId(-2);
  }, [date]);

  useEffect(() => {
    if (gatheringList) {
      setGatherColorList(settingGatherColor(gatheringList));
    }
  }, [gatheringList]);

  useEffect(() => {
    if (isSuccess && exhInfoOfDays.length !== 0) {
      var list: MarkedType[] = [];

      for (let i = 0; i < exhInfoOfDays.length; i++) {
        const dayInfo = exhInfoOfDays[i];

        if (!dayInfo.scheduleInfoList) continue;

        const colorList: string[] = buildColorList(
          dayInfo,
          gatheringId,
          gatherColorList,
        );
        list.push({
          date: makeFullDateWithStr(changeMonth, dayInfo.day),
          color: colorList,
        });
      }
      setMarkedDates(list);
    }
  }, [exhInfoOfDays, gatherColorList]);

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <CalendarGatheringSelector
        initDate={date ?? dateToString(new Date())}
        markedDates={markedDates}
        handleChangeSelectedDate={setSelectedDate}
        handleChangeMonth={setChangeMonth}
        gatherColorList={gatherColorList}
        handleGatheringId={setGatheringId}
        gatheringList={gatheringList}
        gatheringId={gatheringId}
      />
      <DashLine />
      <ExhListOfDayInCalendar
        isAlone={gatheringId === -1}
        selectedDate={selectedDate}
        gatherColorList={gatherColorList}
        exhInfoListOfDays={exhInfoOfDays}
      />
    </PageFrame>
  );
};

export default CalendarScreen;

/** style */
const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
`;
