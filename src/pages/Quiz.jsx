import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Timer from '../components/Timer.jsx'

export default function Quiz() {
  const { questions, resetQuiz } = useOutletContext()
  const navigate = useNavigate()

  const total = questions.length
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [answers, setAnswers] = useState(Array(total).fill(null))
  const [timerEnabled, setTimerEnabled] = useState(true)
  const [timerSeed, setTimerSeed] = useState(0)

  useEffect(() => {
    setCurrent(0)
    setSelected(null)
    setLocked(false)
    setAnswers(Array(total).fill(null))
    setTimerSeed(s => s + 1)
  }, [questions, total])

  if (!questions || total === 0) {
    return <div className="text-center py-12">No questions available.</div>
  }

  const q = questions[current]

  function handleSelect(opt) {
    if (locked) return
    setSelected(opt)
  }

  function lockAnswer() {
    if (selected == null) return
    setLocked(true)
    setAnswers(prev => {
      const copy = prev.slice()
      copy[current] = {
        question: q.question,
        selected,
        correct: q.correct_answer,
        correctBool: selected === q.correct_answer,
        options: q.options
      }
      return copy
    })
  }

  function next() {
    if (!locked) return
    if (current < total - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setLocked(false)
      setTimerSeed(s => s + 1)
    } else {
      const finalAnswers = answers.slice()
      if (!finalAnswers[current]) {
        finalAnswers[current] = {
          question: q.question,
          selected,
          correct: q.correct_answer,
          correctBool: selected === q.correct_answer,
          options: q.options
        }
      }
      const score = finalAnswers.reduce((s, a) => s + (a?.correctBool ? 1 : 0), 0)
      localStorage.setItem('lastScore', String(score))
      localStorage.setItem('lastAnswers', JSON.stringify(finalAnswers))
      const best = Number(localStorage.getItem('bestScore') || '0')
      if (score > best) localStorage.setItem('bestScore', String(score))
      navigate('/results')
    }
  }

  function prev() {
    if (current > 0) {
      setCurrent(c => c - 1)
      setSelected(null)
      setLocked(false)
      setTimerSeed(s => s + 1)
    }
  }

  function handleExpire() {
    if (locked) return
    if (selected == null) {
      setSelected('__NO_SELECTION__')
    }
    lockAnswer()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="w-3/4"><ProgressBar current={current} total={total} /></div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-sm small">Difficulty: <strong className="text-slate-700">Auto</strong></div>
          <div className="flex items-center gap-2">
            <label className="small flex items-center gap-2"><input type="checkbox" checked={timerEnabled} onChange={(e)=> setTimerEnabled(e.target.checked)} /> Timer</label>
            <button className="btn btn-ghost" onClick={() => resetQuiz()}>Restart</button>
          </div>
        </div>
      </div>

      {timerEnabled && (
        <div className="flex justify-end"><Timer seconds={30} running={!locked} onExpire={handleExpire} keySeed={timerSeed} /></div>
      )}

      <QuestionCard
        question={q.question}
        options={q.options}
        selected={selected}
        locked={locked}
        onSelect={handleSelect}
        showSolution={locked}
        correctAnswer={q.correct_answer}
      />

      <div className="flex items-center justify-between">
        <button className="btn btn-ghost" onClick={prev} disabled={current === 0}>Previous</button>
        <div className="flex items-center gap-2">
          {!locked ? (
            <button className="btn btn-primary" onClick={lockAnswer} disabled={selected == null}>Lock Answer</button>
          ) : (
            <button className="btn btn-primary" onClick={next}>{current < total - 1 ? 'Next' : 'Finish'}</button>
          )}
        </div>
      </div>
      <div className="small text-slate-500">Tip: Select an option then Lock — or let timer auto-lock.</div>
    </div>
  )
}
