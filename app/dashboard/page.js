import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import QuickCreateForm from '../components/QuickCreateForm'
import LinkRow from '../components/LinkRow'

const mockStats = [
  { label: 'Total links', value: '5' },
  { label: 'Total clicks', value: '288' },
  { label: 'Clicks this week', value: '142' },
]

const mockLinks = [
  {
    id: 1,
    shortUrl: 'snip.io/abc123',
    originalUrl: 'https://www.notion.so/my-workspace/project-planning-board-2024',
    clicks: 142,
    createdAt: '2 days ago',
  },
  {
    id: 2,
    shortUrl: 'snip.io/xk91f',
    originalUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit',
    clicks: 87,
    createdAt: '5 days ago',
  },
  {
    id: 3,
    shortUrl: 'snip.io/p8mq2',
    originalUrl: 'https://github.com/dhanesh221/link-analytics-backend/pull/3',
    clicks: 34,
    createdAt: '1 week ago',
  },
  {
    id: 4,
    shortUrl: 'snip.io/tz3wr',
    originalUrl: 'https://www.figma.com/file/abc123/Design-System-v2',
    clicks: 19,
    createdAt: '2 weeks ago',
  },
  {
    id: 5,
    shortUrl: 'snip.io/mn7hq',
    originalUrl: 'https://stripe.com/docs/payments/accept-a-payment',
    clicks: 6,
    createdAt: '3 weeks ago',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <QuickCreateForm />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockStats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-500 mb-3">Your links</p>
          <div className="border border-gray-200 rounded-lg bg-white px-5">
            {mockLinks.map((link) => (
              <LinkRow
                key={link.id}
                shortUrl={link.shortUrl}
                originalUrl={link.originalUrl}
                clicks={link.clicks}
                createdAt={link.createdAt}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
