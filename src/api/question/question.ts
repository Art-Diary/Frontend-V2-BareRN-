import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchQuestionList = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const res = await axios.get(`${process.env.API_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const useFetchQuestionList = (state: boolean) =>
  useQuery({
    queryKey: ['questions', state],
    queryFn: () => fetchQuestionList(),
    staleTime: 500000,
    enabled: state,
  });
