export default function StatCard({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}
