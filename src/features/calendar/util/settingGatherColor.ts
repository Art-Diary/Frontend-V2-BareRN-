import {GatheringColorInfo} from '~/components/util/calendarUtil';
import {calendarColor} from '../components/calendarColor';
import {GatheringInfoType} from '~/features/together/util/gatheringInfoType';

export const settingGatherColor = (gatheringList: GatheringInfoType[]) => {
  var list: GatheringColorInfo[] = [];

  for (let i = 0; i < gatheringList.length; i++) {
    list.push({
      gatheringId: gatheringList[i].gatheringId,
      color: calendarColor[i + 1],
    });
  }
  return list;
};
