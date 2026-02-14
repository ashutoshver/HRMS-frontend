import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetDashboardQuery } from '../attendance/attendanceSlice'
import { useGetEmployeesQuery } from '../employees/employeeSlice'
import { useGetDepartmentsQuery } from '../departments/departmentSlice'
import AddEmployeeModal from '../employees/AddEmployeeModal'
import EditEmployeeModal from '../employees/EditEmployeeModal'
import DeleteEmployeeModal from '../employees/DeleteEmployeeModal'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import {
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiPlus,
  HiTrash,
  HiEye,
  HiPencil,
  HiOutlineSearch,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi'

const statCards = [
  { key: 'totalEmployees', label: 'Total Employees', icon: HiOutlineUsers, bg: 'bg-blue-500' },
  { key: 'presentToday', label: 'Present Today', icon: HiOutlineCheckCircle, bg: 'bg-green-500' },
  { key: 'absentToday', label: 'Absent Today', icon: HiOutlineXCircle, bg: 'bg-red-500' },
]

export default function Dashboard() {
  const { data: dashData, isLoading: dashLoading } = useGetDashboardQuery()
  const { data: deptData } = useGetDepartmentsQuery()

  const [filters, setFilters] = useState({ search: '', department: '' })
  const [page, setPage] = useState(1)

  const { data: empData, isLoading: empLoading } = useGetEmployeesQuery({ ...filters, page, limit: 10 })

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [deletingEmployee, setDeletingEmployee] = useState(null)

  const stats = dashData || {}
  const employees = empData?.employees || []
  const departments = deptData?.departments || []
  const totalPages = empData?.totalPages || 1

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({ search: '', department: '' })
    setPage(1)
  }

  const hasFilters = filters.search || filters.department

  if (dashLoading) return <Loader />

  return (
    <div>
      {/* Page Title */}
      <h1 className="mb-5 text-xl font-bold text-gray-800 font-display">Dashboard</h1>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statCards.map(({ key, label, icon: Icon, bg }) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${bg}`}>
              <Icon className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase">{label}</p>
              <p className="text-2xl font-bold text-gray-800 font-display">{stats[key] ?? 0}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Management Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 font-display">Employee Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#0f1535] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1a204a]"
        >
          <HiPlus className="text-sm" /> Add Employee
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-400">Search</label>
          <input
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Name or Emp ID"
            className="w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm placeholder-gray-300 focus:border-[#0f1535] focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-400">Department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="w-44 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-[#0f1535] focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg border-2 border-red-500 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
          >
            <HiX className="text-sm" /> Clear
          </button>
        )}
      </div>

      {/* Employee Table */}
      {empLoading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <EmptyState message={hasFilters ? 'No employees match your filters' : 'No employees found'} />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Emp ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp, index) => (
                  <tr key={emp._id} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-3.5 text-gray-500">{(page - 1) * 10 + (index + 1)}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{emp.employeeId}</td>
                    <td className="px-5 py-3.5 text-gray-700">{emp.fullName}</td>
                    <td className="px-5 py-3.5 text-gray-500">{emp.email}</td>
                    <td className="px-5 py-3.5 text-gray-700">{emp.department?.name || '—'}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingEmployee(emp)}
                          className="rounded-lg p-1.5 text-amber-500 hover:bg-amber-50"
                          title="Edit"
                        >
                          <HiPencil className="text-[15px]" />
                        </button>
                        <Link
                          to={`/attendance/employee/${emp._id}`}
                          className="rounded-lg p-1.5 text-blue-500 hover:bg-blue-50"
                          title="View Attendance"
                        >
                          <HiEye className="text-[15px]" />
                        </Link>
                        <button
                          onClick={() => setDeletingEmployee(emp)}
                          className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                          title="Delete"
                        >
                          <HiTrash className="text-[15px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-between px-2">
            <p className="text-xs text-gray-500">
              Showing page <b>{page}</b> of <b>{totalPages}</b> ({empData?.totalEmployees || 0} total)
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <HiChevronLeft className="text-lg" />
              </button>
              
              <div className="flex items-center gap-1 mx-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      page === i + 1
                        ? 'bg-[#0f1535] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <HiChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </>
      )}

      {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} />}
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )}
      {deletingEmployee && (
        <DeleteEmployeeModal
          employee={deletingEmployee}
          onClose={() => setDeletingEmployee(null)}
        />
      )}
    </div>
  )
}
