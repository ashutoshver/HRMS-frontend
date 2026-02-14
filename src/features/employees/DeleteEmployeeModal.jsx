import { useDeleteEmployeeMutation } from './employeeSlice'
import toast from 'react-hot-toast'
import { HiOutlineExclamation } from 'react-icons/hi'

export default function DeleteEmployeeModal({ employee, onClose }) {
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation()

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee._id).unwrap()
      toast.success('Employee deleted successfully')
      onClose()
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete employee')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white px-5 py-6 shadow-2xl sm:px-8 sm:py-7">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
            <HiOutlineExclamation className="text-3xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Delete Employee</h2>
          <p className="mt-2 text-sm text-gray-400">
            Are you sure you want to delete <span className="font-semibold text-gray-700">{employee.fullName}</span>? This will also remove all their attendance records.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
