import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { jwtTokenLSKey } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState}) => {
    const token = (getState() as RootState).authReducer.user?.token || localStorage.getItem(jwtTokenLSKey);

    if (token && typeof token === 'string') {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

const AppApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
});

export { AppApi };