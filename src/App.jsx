import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './features/dashboard/Dashboard'
import EmployeeAttendance from './features/employees/EmployeeAttendance'
import MarkAttendance from './features/attendance/MarkAttendance'
import AttendanceRecords from './features/attendance/AttendanceRecords'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance/employee/:id" element={<EmployeeAttendance />} />
          <Route path="/attendance/mark" element={<MarkAttendance />} />
          <Route path="/attendance/records" element={<AttendanceRecords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
