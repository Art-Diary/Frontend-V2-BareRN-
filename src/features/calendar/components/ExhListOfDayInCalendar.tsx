import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {findGatherColor} from './calendarColor';
import AddVisitDateFromCalModal from './modal/AddVisitDateFromCalModal';
import {ExhInfo, ExhInfoListOfDayType} from '../util/visitedExhInfoType';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {GatheringColorInfo} from '~/components/util/calendarUtil';
import CustomTouchable from '~/components/CustomTouchable';
import responsive from '~/components/util/responsiveSize';
import {AddMyExhButtonIcon} from '~/components/icon';
import ExhItemView from '~/components/ExhItemView';
import {DARK_GREY, MIDDLE_GREY} from '~/components/util/colors';
import {FONT_NAME} from '~/components/util/style';

interface CalendarProps {
  selectedDate: string;
  gatherColorList: GatheringColorInfo[];
  exhInfoListOfDays: ExhInfoListOfDayType[];
  isAlone: boolean;
}

const ExhListOfDayInCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  gatherColorList,
  exhInfoListOfDays,
  isAlone,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [openModal, setOpenModal] = useState(false);
  // const params: any = useRoute().params;

  // useEffect(() => {
  //   // route.params의 modalOpen 값으로 모달 상태 복원
  //   if (params.modalOpen) {
  //     setOpenModal(true);
  //     navigation.setParams({modalOpen: false}); // 상태 초기화
  //   }
  // }, [params]);

  const onPressExhItem = (exhItem: ExhInfo) => {
    navigation.navigate('MyDiary', {exhId: exhItem.exhId});
  };

  const onPressAddMyExh = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      {/* 선택 날짜 */}
      <SelectedDateView>
        <SelectedDateText>
          {selectedDate.split('.')[1]}월 {selectedDate.split('.')[2]}일
        </SelectedDateText>
        {isAlone && (
          <CustomTouchable
            onPress={onPressAddMyExh}
            style={{
              paddingHorizontal: responsive(3),
              paddingVertical: responsive(1),
            }}>
            <AddMyExhButtonIcon />
          </CustomTouchable>
        )}
      </SelectedDateView>
      {openModal && (
        <AddVisitDateFromCalModal
          selectedDate={selectedDate}
          handleCloseModal={closeModal}
        />
      )}
      {/* 전시회 리스트 */}
      <FlatList<ExhInfo>
        data={
          exhInfoListOfDays?.[Number(selectedDate.split('.')[2]) - 1]
            ?.scheduleInfoList ?? []
        }
        renderItem={({item, index}) => (
          <CustomTouchable onPress={() => onPressExhItem(item)}>
            <ExhItemView
              exhInfo={{...item}}
              notTouchable={true}
              gatheringName={item.gatheringName ?? '혼자'}
              gatherColor={findGatherColor(gatherColorList, item.gatheringId)}
            />
          </CustomTouchable>
        )}
        ListEmptyComponent={
          <SelectMsgView>
            <SelectMsgText>일정이 없습니다.</SelectMsgText>
          </SelectMsgView>
        }
      />
    </Container>
  );
};

export default ExhListOfDayInCalendar;

/** style */
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
