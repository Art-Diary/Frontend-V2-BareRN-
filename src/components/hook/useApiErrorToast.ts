import {useEffect} from 'react';
import {showToast} from '../util/toastConfig';

export function useApiErrorToast(
  isError: boolean,
  message = '다시 시도해 주세요.',
) {
  useEffect(() => {
    if (isError) {
      showToast(message);
    }
  }, [isError, message]);
}
