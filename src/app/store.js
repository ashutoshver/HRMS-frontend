import { configureStore } from '@reduxjs/toolkit'
import { employeeApi } from '../features/employees/employeeSlice'
import { attendanceApi } from '../features/attendance/attendanceSlice'
import { departmentApi } from '../features/departments/departmentSlice'

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeeApi.middleware)
      .concat(attendanceApi.middleware)
      .concat(departmentApi.middleware),
})
