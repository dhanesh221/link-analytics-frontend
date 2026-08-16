'use client'

import { useState } from 'react'

export default function QuickCreateForm({ onSubmit }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    let parsed
    try {
      parsed = new URL(url)
    } catch {
      setError('Enter a valid URL.')
      return
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      setError('Only http:// and https:// links are allowed.')
      return
    }

    setLoading(true)
    try {
      await onSubmit(url)
      setUrl('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5">
      <p className="text-[13px] font-medium text-gray-500 mb-3">Shorten a link</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          required
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shrink-0 disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Shorten'}
        </button>
      </form>
      {success && <p className="mt-2 text-sm text-green-600">Link created!</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
