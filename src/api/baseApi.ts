import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from '../utils/handleError.ts';

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://swapi.dev/api/',
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
});
