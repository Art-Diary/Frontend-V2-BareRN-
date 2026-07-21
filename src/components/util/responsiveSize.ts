import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const baseDesignScreenSize = 360;

export default function responsive(baseDesignElementSize: number): number {
  const screenRatio = width / baseDesignScreenSize;

  return baseDesignElementSize * screenRatio;
}
