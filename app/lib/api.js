const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

export function relativeTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 14) return '1 week ago'
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

export async function getDjangoToken(supabase) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const cachedUserId = localStorage.getItem('django_token_user_id')
  const cached = localStorage.getItem('django_access_token')
  if (cached && cachedUserId === session.user.id) return cached

  const res = await fetch(`${BACKEND}/api/auth/supabase/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: session.access_token }),
  })
  if (!res.ok) return null

  const { access } = await res.json()
  localStorage.setItem('django_access_token', access)
  localStorage.setItem('django_token_user_id', session.user.id)
  return access
}

export function clearDjangoToken() {
  localStorage.removeItem('django_access_token')
  localStorage.removeItem('django_token_user_id')
}

export async function fetchLinks(token) {
  const res = await fetch(`${BACKEND}/api/links/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch links')
  return res.json()
}

export async function createLink(token, originalUrl) {
  const res = await fetch(`${BACKEND}/api/links/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ original_url: originalUrl }),
  })
  if (!res.ok) throw new Error('Failed to create link')
  return res.json()
}
