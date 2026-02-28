import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Stepper from '../components/Stepper'
import { useFlow } from '../context/FlowContext'

const OPTIONS = [
  { id: 'beginner', label: 'Almost 0 knowledge', sub: 'I\'m just starting out' },
  { id: 'beginner2', label: 'Basic understanding', sub: 'I know some basics' },
  { id: 'intermediate', label: 'Have done some work on it', sub: 'I\'ve built small scripts or projects' },
  { id: 'advanced', label: 'Work regularly with it', sub: 'I use Python professionally' },
]

// Map option id to skill band
const BAND_MAP = {
  beginner: 'beginner',
  beginner2: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
}

function RadioDot({ selected }) {
  return (
    <div style={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${selected ? 'var(--cyan)' : 'rgba(255,255,255,0.15)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginLeft: 'auto',
      transition: 'border-color 0.15s',
    }}>
      {selected && (
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan-glow)' }} />
      )}
    </div>
  )
}

export default function SkillLevelScreen() {
  const [selected, setSelected] = useState(null)
  const { setSkillLevel } = useFlow()
  const navigate = useNavigate()

  function handleContinue() {
    if (!selected) return
    setSkillLevel(BAND_MAP[selected])
    navigate('/quiz')
  }

  return (
    <div
      className="screen-enter"
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Header showBack />
      <Stepper activeStep={1} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px 24px' }}>
        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
            <ellipse cx="100" cy="80" rx="70" ry="70" fill="var(--cyan)" opacity="0.05" filter="blur(20px)"/>
            <ellipse cx="100" cy="148" rx="70" ry="8" fill="rgba(15,28,54,0.5)"/>
            {/* Monitor */}
            <rect x="45" y="55" width="110" height="75" rx="8" fill="#0A1628" stroke="#1F3A5A" strokeWidth="1.5"/>
            <rect x="52" y="62" width="96" height="58" rx="4" fill="#050B14"/>
            {/* Code lines on screen */}
            <rect x="58" y="70" width="60" height="4" rx="2" fill="#00D2FF" opacity="0.8"/>
            <rect x="58" y="80" width="45" height="4" rx="2" fill="#33DDFF" opacity="0.6"/>
            <rect x="64" y="90" width="70" height="4" rx="2" fill="#1F3A5A" opacity="0.8"/>
            <rect x="64" y="100" width="50" height="4" rx="2" fill="#1F3A5A" opacity="0.8"/>
            <rect x="58" y="110" width="35" height="4" rx="2" fill="#33DDFF" opacity="0.7"/>
            {/* Cursor blink */}
            <rect x="95" y="110" width="2" height="8" rx="1" fill="white" opacity="0.8"/>
            {/* Stand */}
            <rect x="90" y="130" width="20" height="8" rx="2" fill="#0A1628" stroke="#1F3A5A" strokeWidth="1"/>
            <rect x="75" y="138" width="50" height="4" rx="2" fill="#1F3A5A"/>
            {/* Grad cap */}
            <polygon points="100,18 130,32 100,46 70,32" fill="#007B99"/>
            <rect x="95" y="32" width="10" height="16" rx="2" fill="#0A1628"/>
            <line x1="130" y1="32" x2="130" y2="48" stroke="#33DDFF" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="130" cy="50" r="4" fill="#00D2FF"/>
            {/* Stars */}
            <circle cx="160" cy="20" r="1.5" fill="white" opacity="0.4"/>
            <circle cx="40" cy="35" r="1" fill="white" opacity="0.3"/>
            <circle cx="170" cy="50" r="1" fill="white" opacity="0.5"/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '22px',
          lineHeight: 1.3,
          marginBottom: '6px',
          letterSpacing: '-0.4px',
        }}>
          Let's Create The Best{' '}
          <span style={{ color: 'var(--cyan)' }}>Python Course</span>{' '}
          For You!
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          marginBottom: '8px',
        }}>
          What's your current skill level?
        </p>

        {/* Trust nudge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          padding: '8px 12px',
          background: 'rgba(0, 210, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 210, 255, 0.15)',
        }}>
          <span style={{ fontSize: '14px' }}>✅</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            86% of people who completed this get a course that fits perfectly
          </span>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={`option-btn${selected === opt.id ? ' selected' : ''}`}
              onClick={() => setSelected(opt.id)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {opt.sub}
                </div>
              </div>
              <RadioDot selected={selected === opt.id} />
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* Sticky bar */}
      <div className="sticky-bar slide-up">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <button
            className="btn-primary"
            disabled={!selected}
            onClick={handleContinue}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}
