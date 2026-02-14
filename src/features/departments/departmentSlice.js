import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
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
