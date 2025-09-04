import { useOutletContext, useNavigate } from 'react-router-dom'

export default function Results() {
  const { resetQuiz } = useOutletContext() || {}
  const navigate = useNavigate()
  const raw = localStorage.getItem('lastAnswers')
  const answers = raw ? JSON.parse(raw) : []
  const score = Number(localStorage.getItem('lastScore') || 0)
  const best = Number(localStorage.getItem('bestScore') || 0)
  const total = answers.length || 0

  function handleRestart() {
    resetQuiz?.()
    navigate('/quiz')
  }

  if (!answers || answers.length === 0) {
    return (
      <div className="app-card text-center">
        <h2 className="text-lg font-semibold">No results yet</h2>
        <p className="mt-2">Take the quiz first.</p>
        <div className="mt-4"><button className="btn btn-primary" onClick={() => navigate('/quiz')}>Go to Quiz</button></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="app-card">
        <h2 className="text-lg font-semibold">Your Results</h2>
        <p className="text-slate-700 mt-1">You scored <span className="font-semibold">{score}/{total}</span>.</p>
        <p className="text-slate-700">Best score (this device): <span className="font-semibold">{best}/{total}</span></p>
        <div className="mt-3 flex gap-2"><button className="btn btn-primary" onClick={handleRestart}>Restart Quiz</button></div>
      </div>

      <div className="app-card">
        <h3 className="font-semibold mb-3">Answer Review</h3>
        <ol className="space-y-3 list-decimal pl-5">
          {answers.map((a, idx) => (
            <li key={idx} className="border rounded-xl p-3">
              <div className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: a?.question || `Question ${idx+1}` }} />
              <div className="text-sm">
                <div className="mb-1">
                  <span className="font-medium">Your Answer:</span>{' '}
                  <span className={a?.correctBool ? 'text-emerald-700' : 'text-red-700'} dangerouslySetInnerHTML={{ __html: a?.selected === '__NO_SELECTION__' ? 'No selection' : (a?.selected || '—') }} />
                </div>
                <div>
                  <span className="font-medium">Correct Answer:</span>{' '}
                  <span className="text-emerald-700" dangerouslySetInnerHTML={{ __html: a?.correct || '—' }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
