import { Outlet } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import questionsData from './data/questions.json'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [seed, setSeed] = useState(0)

  const loadQuestions = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple', {cache: "no-store"})
      const data = await res.json()
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const normalized = data.results.map((q, idx) => ({
          id: 'api-' + idx,
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          correct_answer: q.correct_answer,
          difficulty: q.difficulty || 'medium'
        }))
        setQuestions(normalized.slice(0,10))
      } else {
        throw new Error('API empty')
      }
    } catch (err) {
      console.warn('Using local fallback', err)
      // normalize local (answer index -> text)
      const normalizedLocal = questionsData.map((q, idx) => ({
        id: 'local-' + idx,
        question: q.question,
        options: q.options,
        correct_answer: q.options[q.answer],
        difficulty: q.difficulty || 'easy'
      }))
      setQuestions(normalizedLocal.slice(0,10))
      setError('Offline - using local questions')
    } finally {
      setLoading(false)
    }
  }, [seed])

  useEffect(() => { loadQuestions() }, [loadQuestions])

  function resetQuiz() { setSeed(s => s + 1) }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200 z-10">
        <div className="container flex items-center justify-between py-3">
          <div>
            <h1 className="text-xl font-semibold">🧠 Quiz App</h1>
            <div className="small">Clean · Responsive · Accessible</div>
          </div>
          <div className="text-sm text-slate-600">Best: <strong>{localStorage.getItem('bestScore') || 0}</strong></div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container">
          <div className="app-card">
            {loading ? (
              <div className="py-20 text-center">
                <div className="animate-pulse text-slate-600">Loading questions…</div>
                {error && <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">{error}</div>}
              </div>
            ) : (
              <Outlet context={{ questions, resetQuiz }} />
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500">
        Built with ❤️ — Follow the assignment requirements. Deployed: Vite + React + Tailwind
      </footer>
    </div>
  )
}
