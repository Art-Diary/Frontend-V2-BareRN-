import React from 'react';
import {Share} from 'react-native';
import {ExhibitionDetailType} from '../util/exhibitionType';
import {createDynamicLink} from '../util/Link';
import CustomTouchable from '~/components/CustomTouchable';
import {ExhShareButtonIcon} from '~/components/icon';

interface ExhShareProps {
  exhDetailInfo: ExhibitionDetailType;
}

const ExhShare: React.FC<ExhShareProps> = ({exhDetailInfo}) => {
  const handleShare = async () => {
    try {
      // const dynamicLink = await createDynamicLink(
      //   exhDetailInfo.poster,
      //   exhDetailInfo.exhId,
      //   exhDetailInfo.exhName,
      // );
      // await Share.share({
      //   message: `${dynamicLink}`,
      // });
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };

  return (
    <CustomTouchable onPress={handleShare}>
      <ExhShareButtonIcon />
    </CustomTouchable>
  );
};

export default ExhShare;
