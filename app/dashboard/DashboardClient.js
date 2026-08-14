'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { getDjangoToken, fetchLinks, createLink, relativeTime } from '../lib/api'
import StatCard from '../components/StatCard'
import QuickCreateForm from '../components/QuickCreateForm'
import LinkRow from '../components/LinkRow'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function DashboardClient() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [djangoToken, setDjangoToken] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const token = await getDjangoToken(supabase)
        setDjangoToken(token)
        if (token) {
          const data = await fetchLinks(token)
          setLinks(data)
        }
      } catch (e) {
        console.error('Dashboard load error', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleCreate(url) {
    const newLink = await createLink(djangoToken, url)
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
      <QuickCreateForm onSubmit={handleCreate} />

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
