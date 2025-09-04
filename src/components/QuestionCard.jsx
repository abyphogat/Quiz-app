import cn from 'classnames'

export default function QuestionCard({ question, options, selected, locked, onSelect, showSolution=false, correctAnswer }) {
  return (
    <div className="fade-in">
      <h2 className="text-lg font-semibold mb-3" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt
          const isCorrect = showSolution && opt === correctAnswer
          const isWrongSelected = showSolution && isSelected && !isCorrect
          const classes = cn('option-btn', {
            selected: isSelected && !showSolution,
            correct: isCorrect,
            wrong: isWrongSelected,
          })

          return (
            <button
              key={idx}
              className={classes}
              onClick={() => !locked && onSelect(opt)}
              disabled={locked}
              aria-pressed={isSelected}
            >
              <span dangerouslySetInnerHTML={{ __html: opt }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
