import React, {useEffect, useState} from 'react';
import {NotiInfoType} from '../util/notiType';
import {useUserActions} from '~/zustand/userInfo';
import {useUpdateNotiSetting} from '~/api/auth/userInfo';
import {showToast} from '~/components/util/showToast';
import LoadingModal from '~/components/modal/LoadingModal';
import CustomTouchable from '~/components/CustomTouchable';
import {PrivateToggleIcon, PublicToggleIcon} from '~/components/icon';

interface Props {
  notiList: NotiInfoType[];
  noti: NotiInfoType;
}

const UpdateNoti: React.FC<Props> = ({notiList, noti}) => {
  const [alarm, setAlarm] = useState(noti.notiState);
  const {updateNotiList} = useUserActions();
  // update api hook
  const {
    mutate: updateNotiSetting,
    isPending,
    isError,
    isSuccess,
  } = useUpdateNotiSetting();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      updateNotiList(
        notiList.map(value =>
          value.notiId === noti.notiId ? {...value, notiState: !alarm} : value,
        ),
      );
      setAlarm(prev => !prev);
    }
  }, [isError, isSuccess]);

  const onPressAlarm = () => {
    updateNotiSetting({notiId: noti.notiId, setNoti: !alarm});
  };

  return (
    <>
      <LoadingModal isLoading={isPending} />
      <CustomTouchable onPress={onPressAlarm}>
        {alarm ? <PublicToggleIcon /> : <PrivateToggleIcon />}
      </CustomTouchable>
    </>
  );
};

export default UpdateNoti;
