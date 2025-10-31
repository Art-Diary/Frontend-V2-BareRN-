import {
  calendarColor,
  findGatherColor,
} from '~/features/calendar/components/calendarColor';

export interface Matrix {
  day: number | null;
  isInCurrentMonth: boolean;
}

export interface MarkedType {
  date: string;
  color: string[]; // 모두 일때 한 날짜에 여러 모임이 갔을 경우 표시
}

export type GatheringColorInfo = {
  gatheringId: number;
  color: string;
};

export const generateMatrix = (currentDate: Date) => {
  // matrix 생성 (달력을 배열로)
  var matrix: Matrix[][] = [];

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var firstDay = new Date(year, month, 1).getDay();
  var maxDays = new Date(year, month + 1, 0).getDate();

  var counter = -firstDay + 1;

  for (var col = 0; col < 7; col++) {
    matrix[col] = [];
    for (var row = 0; row < 7; row++) {
      let cellValue = counter > 0 && counter <= maxDays ? counter : null;
      matrix[col][row] = {
        day: cellValue,
        isInCurrentMonth: counter > 0 && counter <= maxDays,
      };
      counter++;
    }
    if (counter > 0 && counter > maxDays) {
      break;
    }
  }
  return matrix;
};

export const makeFullDateWithDay = (currentDate: Date, day: number) => {
  const month = currentDate.getMonth() + 1;
  return (
    currentDate.getFullYear() +
    '.' +
    ('0' + month).slice(-2) +
    '.' +
    ('0' + day).slice(-2)
  );
};

const GATHER_ALL = -2;
const GATHER_ALONE = -1;

export const buildColorList = (
  dayInfo: any,
  gatheringId: number,
  gatherColorList: any,
): string[] => {
  if (gatheringId === GATHER_ALONE) {
    // 혼자
    return [calendarColor[0]];
  }

  if (gatheringId >= 0) {
    // 특정 모임
    return [findGatherColor(gatherColorList, gatheringId)];
  }

  // all: 해당 날짜의 모든 모임 색상 (중복 제거)
  const array = new Array<string>();
  for (const s of dayInfo.scheduleInfoList) {
    array.push(findGatherColor(gatherColorList, s.gatheringId));
  }
  return [...array];
};
