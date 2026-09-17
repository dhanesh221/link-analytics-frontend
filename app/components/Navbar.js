'use client'

import Link from 'next/link'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar({ user }) {
  const router = useRouter()
  const supabase = createClient()

  const name = user?.user_metadata?.full_name || user?.email || 'User'
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-base font-semibold tracking-tight text-gray-900"
        >
          snip
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-medium">{initials}</span>
            </div>
            <span className="text-sm text-gray-700">{name}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
