import { fetchBaseQuery, createApi, retry } from '@reduxjs/toolkit/query';
import { BASE_URL } from '../constants';
import type { RootState } from '../app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token || localStorage.getItem('token');

    if (token) {
      headers.set('authotization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
