'use client'

import { useState } from 'react'

export default function QuickCreateForm() {
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: call POST /api/links/ with JWT token
    console.log('create link for:', url)
    setUrl('')
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
          className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shrink-0"
        >
          Shorten
        </button>
      </form>
    </div>
  )
}
