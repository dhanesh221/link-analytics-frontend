'use client'

import { useState } from 'react'

function CopyIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-600"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function LinkRow({ shortUrl, originalUrl, clicks, createdAt }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="py-3.5 border-b border-gray-100 last:border-0">
      {/* Mobile layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            title="Copy link"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        <p className="text-xs text-gray-400 truncate mt-0.5">{originalUrl}</p>
        <p className="text-xs text-gray-400 mt-1">
          {createdAt} · {clicks} clicks
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center gap-4">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-600 hover:underline shrink-0 w-36"
        >
          {shortUrl}
        </a>
        <span className="text-sm text-gray-500 truncate flex-1">{originalUrl}</span>
        <span className="text-sm text-gray-400 shrink-0 w-24 text-right">{createdAt}</span>
        <span className="text-sm text-gray-600 shrink-0 w-20 text-right">
          {clicks} clicks
        </span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          title="Copy link"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  )
}
