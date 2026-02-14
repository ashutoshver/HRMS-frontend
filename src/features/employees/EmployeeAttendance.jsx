import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetEmployeeByIdQuery } from './employeeSlice'
import { useGetAttendanceRecordsQuery } from '../attendance/attendanceSlice'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import { HiArrowLeft } from 'react-icons/hi'

export default function EmployeeAttendance() {
  const { id } = useParams()
  const [dateFilter, setDateFilter] = useState('')
  const { data: empData, isLoading: empLoading } = useGetEmployeeByIdQuery(id)
  const { data: attData, isLoading: attLoading } = useGetAttendanceRecordsQuery({
    employeeId: id,
    date: dateFilter || undefined,
  })

  if (empLoading || attLoading) return <Loader />

  const employee = empData
  const records = attData?.records || []
  const totalPresent = attData?.totalPresentDays ?? 0

  return (
    <div>
      <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0f1535] hover:underline">
        <HiArrowLeft /> Back to Dashboard
      </Link>

      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
          {employee?.fullName || 'Employee'} — Attendance
        </h1>
        <p className="text-sm text-gray-500">
          {employee?.employeeId} · {employee?.department?.name}
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-[#0f1535] focus:outline-none sm:w-auto"
        />
<span className="self-start rounded-lg bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 sm:ml-auto sm:self-auto">
          Total Present: {totalPresent}
        </span>
      </div>

      {records.length === 0 ? (
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
