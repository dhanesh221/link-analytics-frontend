'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { getAccessToken, fetchLinks, createLink, relativeTime } from '../lib/api'
import StatCard from '../components/StatCard'
import QuickCreateForm from '../components/QuickCreateForm'
import LinkRow from '../components/LinkRow'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function DashboardClient() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const token = await getAccessToken(supabase)
        setAccessToken(token)
        const data = await fetchLinks(token)
        setLinks(data.results || data)
      } catch (e) {
        setError(e.message === 'SESSION_EXPIRED' ? 'Your session expired. Sign in again.' : 'The API is unavailable. A free host may need a moment to wake up.')
      } finally {
        setLoading(false)
      }
    }
    load()

    function refresh() {
      const supabase = createClient()
      getAccessToken(supabase).then((token) => fetchLinks(token)).then((data) => setLinks(data.results || data)).catch(() => {})
    }
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [])

  async function handleCreate(url) {
    const newLink = await createLink(accessToken, url)
    setLinks((prev) => [newLink, ...prev])
  }

  const totalClicks = links.reduce((sum, l) => sum + l.click_count, 0)

  const stats = [
    { label: 'Total links', value: String(links.length) },
    { label: 'Total clicks', value: String(totalClicks) },
    { label: 'Avg clicks / link', value: links.length ? String(Math.round(totalClicks / links.length)) : '—' },
  ]

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-400">Loading your links…</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {error && <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <QuickCreateForm onSubmit={handleCreate} disabled={!accessToken} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div>
        <p className="text-[13px] font-medium text-gray-500 mb-3">Your links</p>
        {links.length === 0 ? (
          <p className="text-sm text-gray-400">No links yet — create your first one above.</p>
        ) : (
          <div className="border border-gray-200 rounded-lg bg-white px-5">
            {links.map((link) => (
              <LinkRow
                key={link.id}
                shortUrl={`${BACKEND_URL}/r/${link.short_code}`}
                originalUrl={link.original_url}
                clicks={link.click_count}
                createdAt={relativeTime(link.created_at)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
