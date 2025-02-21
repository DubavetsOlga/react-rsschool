import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: 'https://swapi.dev/api/',
    })(args, api, extraOptions);
  },
  endpoints: () => ({}),
});
