import React, {ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {BACK_COLOR, DARK_GREY, MAIN_COLOR, MIDDLE_GREY} from './util/colors';
import {FONT_NAME} from './util/style';
import {View} from 'react-native';
import {dateToString, days, months} from './util/date';
import {
  generateMatrix,
  makeFullDateWithDay,
  MarkedType,
  Matrix,
} from './util/calendarUtil';
import CustomTouchable from './CustomTouchable';
import responsive from './util/responsiveSize';

interface CalendarProps {
  initDate: string; // 초기 날짜
  markedDates: MarkedType[]; // 마크 표시된 날짜 리스트
  handleChangeSelectedDate: (selectedDate: string) => void; // 선택 날짜 set
  handleChangeMonth?: (changeMonth: string) => void; // 달 바꿈 set
  children?: ReactNode;
  mainColor?: string;
}

const CalendarFrame: React.FC<CalendarProps> = ({
  initDate,
  markedDates,
  handleChangeSelectedDate,
  handleChangeMonth,
  children,
  mainColor,
}) => {
  const splitDate = initDate.split('.');
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    ),
  ); // 현재 월
  const [selectedDate, setSelectedDate] = useState<string>(initDate); // 선택한 날짜

  useEffect(() => {
    const date: Date = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    );
    setCurrentDate(date);
    setSelectedDate(initDate);
  }, [initDate]);

  const goToNextMonth = () => {
    if (!handleChangeMonth) {
      return;
    }
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    const change = dateToString(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    handleChangeMonth(change);
    setSelectedDate(change);
    handleChangeSelectedDate(change);
  };

  const goToPreviousMonth = () => {
    if (!handleChangeMonth) {
      return;
    }
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    const change = dateToString(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    handleChangeMonth(change);
    setSelectedDate(change);
    handleChangeSelectedDate(change);
  };

  const handleDayPress = (item: Matrix) => {
    if (item.day !== null) {
      const selectedFullDate = makeFullDateWithDay(currentDate, item.day);

      handleChangeSelectedDate(selectedFullDate);
      setSelectedDate(selectedFullDate);
    }
  };

  const renderCalendar = () => {
    // matrix 생성 (달력을 배열로)
    const matrix = generateMatrix(currentDate);
    const todayStr = dateToString(new Date()); // 오늘 날짜를 a.a.a 형식으로 변경
    const activeColor = mainColor ?? MAIN_COLOR;
    // date(yy.MM.dd) -> color[] 매핑
    const markedMap = new Map(
      (markedDates ?? []).map(md => [md.date, md.color]),
    );

    // matrix를 화면으로 구성
    return matrix.map((col, colIndex) => (
      <ColumnView key={`col-${colIndex}`}>
        {col.map((item, rowIndex) => {
          // 빈 칸일 경우
          if (item.day == null) {
            return (
              <CustomTouchable
                key={`cell-${colIndex}-${rowIndex}`}
                style={{alignItems: 'center'}}
                disabled>
                <Circle isToday={false} isTouched={false} color={activeColor}>
                  <CellText isTouched={false} />
                </Circle>
              </CustomTouchable>
            );
          }
          // 날짜 있을 경우
          const itemDate = makeFullDateWithDay(currentDate, item.day); // yy.MM.dd
          const isToday = itemDate === todayStr;
          const isTouched = itemDate === selectedDate;
          const colors = markedMap.get(itemDate); // color[] | undefined

          return (
            <CustomTouchable
              key={`cell-${itemDate}`}
              onPress={() => handleDayPress(item)}
              style={{alignItems: 'center'}}>
              <Circle
                isToday={isToday}
                isTouched={isTouched}
                color={activeColor}>
                <CellText isTouched={isTouched}>{item.day}</CellText>

                {Array.isArray(colors) && colors.length > 0 && (
                  <MarkedDotWrapper>
                    {colors.map((c, idx) => (
                      <MarkedDot
                        key={`dot-${itemDate}-${idx}`}
                        color={isTouched ? 'white' : c}
                      />
                    ))}
                  </MarkedDotWrapper>
                )}
              </Circle>
            </CustomTouchable>
          );
        })}
      </ColumnView>
    ));
  };

  return (
    <Container>
      {/* month changer */}
      <HeaderMonth>
        {/* left arrow */}
        <CustomTouchable onPress={goToPreviousMonth}>
          <ArrowLabel>&lt;</ArrowLabel>
        </CustomTouchable>
        <MonthWrapper>
          {currentDate.getFullYear() !== new Date().getFullYear() && (
            <MonthLabel>{currentDate.getFullYear()}년 </MonthLabel>
          )}
          <MonthLabel>{months[currentDate.getMonth()]}월</MonthLabel>
        </MonthWrapper>
        {/* right arrow */}
        <CustomTouchable onPress={goToNextMonth}>
          <ArrowLabel>&gt;</ArrowLabel>
        </CustomTouchable>
      </HeaderMonth>
      {/* for gathering selector */}
      {children}
      {/* 요일 */}
      <WeekDayView>
        {days.map((day, index) => (
          <WeekDayCell key={index}>
            <CellText isDay>{day}</CellText>
          </WeekDayCell>
        ))}
      </WeekDayView>
      {/* 날짜 */}
      <View>{renderCalendar()}</View>
    </Container>
  );
};

export default CalendarFrame;

/** style */
const Container = styled.View`
  flex-direction: column;
  padding: ${responsive(15)}px;
  padding-top: ${responsive(30)}px;
`;

const HeaderMonth = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ArrowLabel = styled.Text`
  padding: ${responsive(3)}px;
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(10)}px;
  font-size: ${responsive(20)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MonthWrapper = styled.View`
  flex-direction: row;
`;

const MonthLabel = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const WeekDayView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WeekDayCell = styled.View`
  align-items: center;
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
`;

const ColumnView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MarkedDotWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface CircleProps {
  isToday: boolean;
  isTouched: boolean;
  color: string;
  isDay: boolean;
}

const CellText = styled.Text<CircleProps>`
  color: ${(props: CircleProps) =>
    props.isTouched
      ? 'white'
      : props.isDay
      ? `${MIDDLE_GREY}`
      : `${DARK_GREY}`};
  font-size: ${responsive(16)}px;
  font-family: ${FONT_NAME};
`;

const MarkedDot = styled.View<CircleProps>`
  background-color: ${(props: CircleProps) => props.color};
  width: ${responsive(5)}px;
  height: ${responsive(5)}px;
  border-radius: ${responsive(50)}px;
`;

const Circle = styled.View<CircleProps>`
  gap: ${responsive(0.3)}px;
  width: ${responsive(40)}px;
  height: ${responsive(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${responsive(50)}px;
  border-width: ${responsive(1.3)}px;
  border-color: ${(props: CircleProps) =>
    !props.isTouched && props.isToday ? `${props.color}` : `${BACK_COLOR}`};
  background-color: ${(props: CircleProps) =>
    props.isTouched ? `${props.color}` : `${BACK_COLOR}`};
`;
