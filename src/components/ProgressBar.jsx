export default function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <div className="text-sm font-medium">Question {current + 1} of {total}</div>
        <div className="text-sm small">{pct}%</div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
