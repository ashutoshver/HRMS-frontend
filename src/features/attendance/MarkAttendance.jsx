import { useState } from 'react'
import { useGetEmployeesQuery } from '../employees/employeeSlice'
import { useMarkAttendanceMutation } from './attendanceSlice'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { HiOutlineClipboardCheck } from 'react-icons/hi'

export default function MarkAttendance() {
  const { data, isLoading } = useGetEmployeesQuery()
  const [markAttendance, { isLoading: marking }] = useMarkAttendanceMutation()
  const [form, setForm] = useState({
    employeeId: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'Present',
  })

  const employees = data?.employees || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.employeeId) return toast.error('Please select an employee')
    try {
      await markAttendance(form).unwrap()
      toast.success('Attendance marked successfully')
      setForm((prev) => ({ ...prev, employeeId: '' }))
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to mark attendance')
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="flex items-start justify-center pt-6">
      <div className="w-full max-w-md rounded-2xl bg-white px-8 py-7 shadow-2xl">
        {/* Icon + Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f1535]">
            <HiOutlineClipboardCheck className="text-2xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Mark Attendance</h2>
          <p className="mt-1 text-sm text-gray-400">Select employee, date and mark status</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Employee</label>
            <select
              value={form.employeeId}
              onChange={(e) => setForm((prev) => ({ ...prev, employeeId: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0f1535] focus:outline-none"
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId} — {emp.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0f1535] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Status</label>
            <div className="flex gap-6">
              {['Present', 'Absent'].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="accent-[#0f1535]"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={marking}
              className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {marking ? 'Marking...' : 'Mark Attendance'}
            </button>
            <button
              type="button"
              onClick={() => setForm({ employeeId: '', date: new Date().toISOString().slice(0, 10), status: 'Present' })}
              className="flex-1 rounded-lg border-2 border-red-500 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
