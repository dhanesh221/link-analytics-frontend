import Link from 'next/link'

const mockUser = {
  name: 'Priya Nair',
  initials: 'PN',
}

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          snip
        </Link>

        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-medium">{mockUser.initials}</span>
          </div>
          <span className="text-sm text-gray-700">{mockUser.name}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </nav>
  )
}
