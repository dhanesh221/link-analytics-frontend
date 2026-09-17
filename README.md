# Snip
A portfolio-grade link shortener and analytics dashboard built with Next.js, Supabase Auth, and the Snip Django API.

## Setup
Copy `.env.example` to `.env.local`, set the three public values, then run `npm ci && npm run dev`.

## Production contract
`NEXT_PUBLIC_BACKEND_URL` must be the canonical HTTPS API origin. Configure the same frontend origin in the API CORS allowlist and in Supabase's allowed redirect URLs. The browser sends the short-lived Supabase access token directly to the API; no second long-lived token is stored in local storage.

The UI treats an unavailable API as an error, not an empty account, and explains that a free backend may be waking. Production promotion requires a create -> redirect -> analytics smoke test.
