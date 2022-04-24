/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import useSWR, { mutate } from 'swr';
import api from '../services/api';

export function useFetch(url) {
  const {
    data, error, mutate, trigger,
  } = useSWR(url, async (url) => {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  }, { revalidateOnFocus: false });

  return {
    data, error, mutate,
  };
}
