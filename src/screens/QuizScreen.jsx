import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ProgressBar from '../components/ProgressBar'
import { useFlow } from '../context/FlowContext'
import questions from '../data/questions.json'

const LETTERS = ['A', 'B', 'C', 'D']

function CodeBlock({ text }) {
  const parts = text.split('\n')
  const question = parts[0]
  const code = parts.slice(1).join('\n').trim()

  return (
    <>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '17px',
        lineHeight: 1.4,
        marginBottom: code ? '12px' : '0',
        color: 'var(--text-primary)',
      }}>
        {question}
      </p>
      {code && (
        <pre style={{
          background: 'rgba(6, 14, 30, 0.8)',
          border: '1px solid var(--navy-border)',
          borderRadius: '8px',
          padding: '12px 14px',
          fontFamily: 'var(--font-code)',
          fontSize: '12.5px',
          color: '#94B4CC',
          overflowX: 'auto',
          lineHeight: 1.6,
          marginBottom: '0',
          whiteSpace: 'pre',
        }}>
          {code}
        </pre>
      )}
    </>
  )
}

export default function QuizScreen() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const { submitQuiz } = useFlow()
  const navigate = useNavigate()

  const q = questions[current]
  const isLast = current === questions.length - 1

  function handleSelect(idx) {
    setSelected(idx)
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (isLast) {
      submitQuiz(newAnswers, questions)
      navigate('/loading')
    } else {
      setAnswers(newAnswers)
      setSelected(null)
      setCurrent(c => c + 1)
    }
  }

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingBottom: '90px' }}>
      <Header showBack />
      <ProgressBar current={current + 1} total={questions.length} />

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px' }}>
        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 20px' }}>
          <svg width="180" height="150" viewBox="0 0 180 150" fill="none">
            <ellipse cx="90" cy="140" rx="65" ry="7" fill="rgba(15,28,54,0.5)"/>
            {/* Bar chart */}
            <rect x="20" y="100" width="22" height="35" rx="4" fill="#1F3A5A"/>
            <rect x="52" y="75" width="22" height="60" rx="4" fill="#0A1628" stroke="#1F3A5A" strokeWidth="1"/>
            <rect x="84" y="50" width="22" height="85" rx="4" fill="#007B99" opacity="0.6"/>
            <rect x="116" y="30" width="22" height="105" rx="4" fill="#00D2FF"/>
            {/* Trophy */}
            <circle cx="150" cy="25" r="18" fill="#0A1628" stroke="#00D2FF" strokeWidth="1.5"/>
            <text x="150" y="31" textAnchor="middle" fontSize="16">🏆</text>
            {/* Person jumping */}
            <circle cx="90" cy="35" r="7" fill="#33DDFF"/>
            <line x1="90" y1="42" x2="90" y2="58" stroke="#33DDFF" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="82" y1="48" x2="98" y2="48" stroke="#33DDFF" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="90" y1="58" x2="84" y2="70" stroke="#33DDFF" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="90" y1="58" x2="96" y2="70" stroke="#33DDFF" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Stars */}
            <circle cx="165" cy="50" r="1.5" fill="white" opacity="0.4"/>
            <circle cx="15" cy="45" r="1" fill="white" opacity="0.3"/>
            <circle cx="170" cy="80" r="1" fill="white" opacity="0.4"/>
          </svg>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <span style={{
              background: 'rgba(0, 210, 255, 0.1)',
              border: '1px solid rgba(0, 210, 255, 0.2)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '11px',
              fontFamily: 'var(--font-code)',
              color: 'var(--cyan)',
              fontWeight: 500,
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.05)'
            }}>{q.topic}</span>
          </div>
          <CodeBlock text={q.question} />
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const optText = opt.includes('\n') ? opt.replace(/\\n/g, '\n') : opt
            const hasCode = optText.includes('\n')

            return (
              <button
                key={i}
                className={`option-btn${isSelected ? ' selected' : ''}`}
                onClick={() => handleSelect(i)}
                style={{ alignItems: hasCode ? 'flex-start' : 'center' }}
              >
                {/* Letter badge */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: isSelected ? 'rgba(0, 210, 255, 0.15)' : 'rgba(15, 28, 54, 0.5)',
                  border: `1px solid ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isSelected ? 'var(--cyan)' : 'var(--text-muted)',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                  boxShadow: isSelected ? '0 0 10px var(--cyan-glow)' : 'none'
                }}>
                  {LETTERS[i]}
                </div>

                {hasCode ? (
                  <pre style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    flex: 1,
                  }}>{optText}</pre>
                ) : (
                  <span style={{ flex: 1, fontSize: '14px' }}>{optText}</span>
                )}

                {/* Radio */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.15)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: 'auto',
                  transition: 'border-color 0.15s',
                }}>
                  {isSelected && <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sticky bar */}
      <div className="sticky-bar slide-up">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <button
            className="btn-primary"
            disabled={selected === null}
            onClick={handleNext}
          >
            {isLast ? 'See My Analysis →' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  )
}
