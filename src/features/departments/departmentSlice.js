import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Department'],
    }),
  }),
})

export const {
  useGetDepartmentsQuery,
} = departmentApi
