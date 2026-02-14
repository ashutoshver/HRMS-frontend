import { useState } from 'react'
import { useGetEmployeesQuery } from '../employees/employeeSlice'
import { useGetAttendanceRecordsQuery } from './attendanceSlice'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

export default function AttendanceRecords() {
  const { data: empData, isLoading: empLoading } = useGetEmployeesQuery()
  const [selectedEmp, setSelectedEmp] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const employees = empData?.employees || []

  const hasFilter = selectedEmp || dateFilter

  const { data: attData, isLoading: attLoading } = useGetAttendanceRecordsQuery(
    {
      employeeId: selectedEmp || undefined,
      date: dateFilter || undefined,
    },
    { skip: !hasFilter }
  )

  const records = attData?.records || []

  if (empLoading) return <Loader />

  const statusBadge = (status) => {
    const styles =
      status === 'Present'
        ? 'bg-green-100 text-green-700'
        : status === 'Absent'
          ? 'bg-red-100 text-red-700'
          : 'bg-gray-100 text-gray-500'
    return (
      <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${styles}`}>
        {status}
      </span>
    )
  }

  // Determine which columns to show based on active filters
  const showEmployeeCol = !selectedEmp // date-only or both absent → show employee info
  const showDateCol = !dateFilter // employee-only or both absent → show date

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold text-gray-800">Attendance Records</h1>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
        <div className="w-full sm:w-auto">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Employee</label>
          <select
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#0f1535] focus:outline-none sm:w-auto"
          >
            <option value="">-- All Employees --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId} — {emp.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="relative w-full sm:w-auto">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-[#0f1535] focus:outline-none sm:w-auto ${dateFilter ? 'text-gray-800' : 'date-empty'}`}
          />
          {!dateFilter && (
            <span className="pointer-events-none absolute bottom-0 left-3 flex h-[42px] items-center text-sm text-gray-400">
              Select Date
            </span>
          )}
        </div>
      </div>

      {!hasFilter ? (
        <EmptyState message="Select an employee or a date to view records" />
      ) : attLoading ? (
        <Loader />
      ) : records.length === 0 ? (
        <EmptyState message="No attendance records found" />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <tr>
                {showEmployeeCol && <th className="px-5 py-3">Employee</th>}
                {showDateCol && <th className="px-5 py-3">Date</th>}
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((rec, idx) => (
                <tr key={rec._id || idx} className="transition hover:bg-blue-50/40">
                  {showEmployeeCol && (
                    <td className="px-5 py-3.5 text-gray-700">
                      {rec.employeeId?.fullName || rec.fullName || '—'}
                    </td>
                  )}
                  {showDateCol && (
                    <td className="px-5 py-3.5 text-gray-700">
                      {rec.date ? new Date(rec.date).toLocaleDateString() : '—'}
                    </td>
                  )}
                  <td className="px-5 py-3.5">
                    {statusBadge(rec.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
