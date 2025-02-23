import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // prepareHeaders: (headers, { getState}) => {
  //   const token = getState().auth
  // }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

const AppApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
});

export { AppApi };