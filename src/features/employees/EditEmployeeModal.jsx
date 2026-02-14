import { useState } from 'react'
import { useUpdateEmployeeMutation } from './employeeSlice'
import { useGetDepartmentsQuery } from '../departments/departmentSlice'
import toast from 'react-hot-toast'
import { HiOutlinePencilAlt } from 'react-icons/hi'

export default function EditEmployeeModal({ employee, onClose }) {
  const [form, setForm] = useState({
    fullName: employee.fullName,
    email: employee.email,
    department: employee.department?._id || '',
  })
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation()
  const { data: deptData } = useGetDepartmentsQuery()

  const departments = deptData?.departments || []

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateEmployee({ id: employee._id, ...form }).unwrap()
      toast.success('Employee updated successfully')
      onClose()
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update employee')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-5 py-6 shadow-2xl sm:px-8 sm:py-7">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f1535]">
            <HiOutlinePencilAlt className="text-2xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Edit Employee</h2>
          <p className="mt-1 text-sm text-gray-400">Update the employee details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Employee Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:border-[#0f1535] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:border-[#0f1535] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:border-[#0f1535] focus:outline-none"
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Employee'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-red-500 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
