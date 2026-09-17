const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

async function request(path, accessToken, options = {}) {
  const response = await fetch(`${BACKEND}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`, ...options.headers },
  })
  if (response.status === 401) throw new Error('SESSION_EXPIRED')
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.detail || data?.original_url?.[0] || 'REQUEST_FAILED')
  }
  return response.json()
}

export async function getAccessToken(supabase) {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) throw new Error('SESSION_EXPIRED')
  return session.access_token
}
export const fetchLinks = (token) => request('/api/v1/links/', token)
export const createLink = (token, originalUrl) => request('/api/v1/links/', token, { method: 'POST', body: JSON.stringify({ original_url: originalUrl }) })
export function relativeTime(value) {
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const days = Math.round((new Date(value).getTime() - Date.now()) / 86400000)
  if (Math.abs(days) < 30) return formatter.format(days, 'day')
  return formatter.format(Math.round(days / 30), 'month')
}
