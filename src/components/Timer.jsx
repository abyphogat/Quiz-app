import { useEffect, useRef, useState } from 'react'

export default function Timer({ seconds=30, running=true, onExpire, keySeed }) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const ref = useRef(null)

  useEffect(() => { setTimeLeft(seconds) }, [seconds, keySeed])

  useEffect(() => {
    if (!running) return
    ref.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(ref.current)
          onExpire?.()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(ref.current)
  }, [running, onExpire])

  const pct = Math.round((timeLeft / seconds) * 100)
  return (
    <div className="flex items-center gap-3" role="timer" aria-live="polite">
      <div className="w-36 progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-sm small tabular-nums">{timeLeft}s</div>
    </div>
  )
}
