import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { HiOutlineSearch, HiMenuAlt2 } from 'react-icons/hi'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#e8eef7]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <HiMenuAlt2 className="text-xl" />
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">
              <HiOutlineSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-yellow-400 text-center text-sm font-bold leading-8 text-[#0f1535]">
            A
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
