import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Attendance', 'Dashboard'],
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => '/attendance/dashboard',
      providesTags: ['Dashboard'],
    }),
    markAttendance: builder.mutation({
      query: (body) => ({
        url: '/attendance',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Attendance', 'Dashboard'],
    }),
    getAttendanceByEmployee: builder.query({
      query: ({ employeeId, date }) => {
        let url = `/attendance/employee/${employeeId}`
        if (date) url += `?date=${date}`
        return url
      },
      providesTags: (result, error, { employeeId }) => [
        { type: 'Attendance', id: employeeId },
      ],
    }),
  }),
})

export const {
  useGetDashboardQuery,
  useMarkAttendanceMutation,
  useGetAttendanceByEmployeeQuery,
} = attendanceApi
