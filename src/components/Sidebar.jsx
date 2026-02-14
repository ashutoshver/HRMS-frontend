import { NavLink } from 'react-router-dom'
import {
  HiOutlineViewGrid,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineUserCircle,
  HiX,
} from 'react-icons/hi'

const sections = [
  {
    heading: 'Features',
    links: [
      { to: '/', label: 'Dashboard', icon: HiOutlineViewGrid },
    ],
  },
  {
    heading: 'Attendance',
    links: [
      { to: '/attendance/mark', label: 'Mark Attendance', icon: HiOutlineClipboardCheck },
      { to: '/attendance/records', label: 'Attendance Records', icon: HiOutlineDocumentText },
    ],
  },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-60 flex-col bg-[#0f1535] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm font-black text-[#0f1535]">
              H
            </div>
            <span className="text-lg font-bold tracking-wide font-display">HRMS Lite</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <HiX className="text-xl" />
          </button>
        </div>

        {/* User Profile */}
        <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl bg-[#1a204a] px-4 py-3">
          <HiOutlineUserCircle className="text-3xl text-gray-300" />
          <div>
            <p className="text-sm font-semibold leading-tight font-display">Admin</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>

        {/* Nav Sections */}
        <nav className="mt-5 flex-1 space-y-5 px-3">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500 font-display">
                {section.heading}
              </p>
              <div className="space-y-0.5">
                {section.links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                        isActive
                          ? 'bg-yellow-400 text-[#0f1535]'
                          : 'text-gray-300 hover:bg-[#1a204a] hover:text-white'
                      }`
                    }
                  >
                    <Icon className="text-lg" />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
