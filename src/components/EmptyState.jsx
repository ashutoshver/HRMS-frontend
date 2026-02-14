import { HiOutlineInbox } from 'react-icons/hi'

export default function EmptyState({ message = 'No data found' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 text-gray-300 shadow-sm">
      <HiOutlineInbox className="mb-2 text-4xl" />
      <p className="text-sm font-medium text-gray-400">{message}</p>
    </div>
  )
}
