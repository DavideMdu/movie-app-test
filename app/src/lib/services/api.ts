import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types/Users';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTheUsers: builder.query<User, {}>({
      query: () => `users`,
    }),
  }),
});

export const { useGetTheUsersQuery } = api;
