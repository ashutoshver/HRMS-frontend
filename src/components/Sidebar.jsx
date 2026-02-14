import { NavLink } from 'react-router-dom'
import {
  HiOutlineViewGrid,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineUserCircle,
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

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col bg-[#0f1535] text-white">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-5 pt-4 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm font-black text-[#0f1535]">
          H
        </div>
        <span className="text-lg font-bold tracking-wide font-display">HRMS Lite</span>
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
  )
}
