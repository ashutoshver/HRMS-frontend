import { useState } from 'react'
import { useGetEmployeesQuery } from '../employees/employeeSlice'
import { useGetAttendanceByEmployeeQuery } from './attendanceSlice'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

export default function AttendanceRecords() {
  const { data: empData, isLoading: empLoading } = useGetEmployeesQuery()
  const [selectedEmp, setSelectedEmp] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const employees = empData?.employees || []

  const { data: attData, isLoading: attLoading } = useGetAttendanceByEmployeeQuery(
    { employeeId: selectedEmp, date: dateFilter || undefined },
    { skip: !selectedEmp }
  )

  const records = attData?.records || []

  if (empLoading) return <Loader />

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
            <option value="">-- Select Employee --</option>
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
        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="self-start rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>

      {!selectedEmp ? (
        <EmptyState message="Select an employee to view records" />
      ) : attLoading ? (
        <Loader />
      ) : records.length === 0 ? (
        <EmptyState message="No attendance records" />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((rec) => (
                <tr key={rec._id} className="transition hover:bg-blue-50/40">
                  <td className="px-5 py-3.5 text-gray-700">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                        rec.status === 'Present'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rec.status}
                    </span>
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
