/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import useSWR, { mutate } from 'swr';

export function useFetch(url) {
  const {
    data, error, mutate,
  } = useSWR(url, async (url) => {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  }, { revalidateOnFocus: true });

  return {
    data, error, mutate,
  };
}
