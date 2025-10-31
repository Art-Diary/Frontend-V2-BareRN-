import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useFetchGatheringVisitDateList} from '~/api/gathering/gathering';
import CalendarFrame from '~/components/CalendarFrame';
import ExhItemView from '~/components/ExhItemView';
import PageFrame from '~/components/PageFrame';
import CustomTouchable from '~/components/CustomTouchable';
import {AddMyExhButtonIcon} from '~/components/icon';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import LoadingModal from '~/components/modal/LoadingModal';
import {MarkedType} from '~/components/util/calendarUtil';
import {
  BORDER_COLOR,
  DARK_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/util/colors';
import {dateToString, makeFullDateWithStr} from '~/components/util/date';
import responsive from '~/components/util/responsiveSize';
import {DASH_WIDTH, FONT_NAME} from '~/components/util/style';
import {calendarColor} from '~/features/calendar/components/calendarColor';
import {ExhInfo} from '~/features/calendar/util/visitedExhInfoType';
import CreateGatheringVisitExhModal from '~/features/together/components/modal/CreateGatheringVisitExhModal';
import {RootStackParamList} from '~/navigationTypes';

type AddGatheringVisitExhProp = RouteProp<
  RootStackParamList,
  'AddGatheringVisitExh'
>;

interface Props {
  route: AddGatheringVisitExhProp;
}

const AddGatheringVisitExhScreen: React.FC<Props> = ({route}) => {
  const {gatheringId} = route.params;
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(dateToString(new Date()));
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<MarkedType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  // API Hooks
  const {
    data: exhInfoOfDays,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringVisitDateList(
    gatheringId,
    Number(changeMonth.split('.')[0]),
    Number(changeMonth.split('.')[1]),
  );

  useApiErrorToast(isError);

  useEffect(() => {
    if (isSuccess && exhInfoOfDays.length !== 0) {
      var list: MarkedType[] = [];

      for (let i = 0; i < exhInfoOfDays.length; i++) {
        const dayInfo = exhInfoOfDays[i];

        if (!dayInfo.exhibitions) continue;

        list.push({
          date: makeFullDateWithStr(changeMonth, dayInfo.day),
          color: [calendarColor[0]],
        });
      }
      setMarkedDates(list);
    }
  }, [isSuccess, exhInfoOfDays]);

  const onPressModal = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <CalendarFrame
        initDate={dateToString(new Date())}
        markedDates={markedDates}
        handleChangeSelectedDate={setSelectedDate}
        handleChangeMonth={setChangeMonth}
        mainColor={MAIN_COLOR}
      />
      <DashLine />
      <Container>
        {/* 선택 날짜 */}
        <SelectedDateView>
          <SelectedDateText>
            {selectedDate.split('.')[1]}월 {selectedDate.split('.')[2]}일
          </SelectedDateText>
          <CustomTouchable
            onPress={onPressModal}
            style={{
              paddingHorizontal: responsive(3),
              paddingVertical: responsive(1),
            }}>
            <AddMyExhButtonIcon />
          </CustomTouchable>
        </SelectedDateView>
        {openModal && (
          <CreateGatheringVisitExhModal
            gatheringId={gatheringId}
            selectedDate={selectedDate}
            handleCloseModal={onPressModal}
          />
        )}
        {/* 전시회 리스트 */}
        <FlatList<ExhInfo>
          data={
            exhInfoOfDays?.[Number(selectedDate.split('.')[2]) - 1]
              ?.exhibitions ?? []
          }
          renderItem={({item, index}) => (
            <ExhItemView exhInfo={{...item}} notTouchable={true} />
          )}
          ListEmptyComponent={
            <SelectMsgView>
              <SelectMsgText>일정이 없습니다.</SelectMsgText>
            </SelectMsgView>
          }
        />
      </Container>
    </PageFrame>
  );
};

export default AddGatheringVisitExhScreen;

/** style */
const DashLine = styled.View`
  width: 100%;
  border-style: dashed;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
`;

const Container = styled.View`
  flex: 1;
  padding: ${responsive(15)}px;
  gap: ${responsive(10)}px;
`;

const SelectedDateView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedDateText = styled.Text`
  font-size: ${responsive(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${responsive(20)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${responsive(17)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;
