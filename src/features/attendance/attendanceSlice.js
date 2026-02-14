import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
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
    getAttendanceRecords: builder.query({
      query: ({ employeeId, date } = {}) => {
        const params = new URLSearchParams()
        if (date) params.append('date', date)
        if (employeeId) params.append('employeeId', employeeId)
        const qs = params.toString()
        return `/attendance/records${qs ? `?${qs}` : ''}`
      },
      providesTags: ['Attendance'],
    }),
  }),
})

export const {
  useGetDashboardQuery,
  useMarkAttendanceMutation,
  useGetAttendanceRecordsQuery,
} = attendanceApi
