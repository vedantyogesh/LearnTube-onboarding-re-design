import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Marquee from '../components/Marquee'

const STEPS = [
  'Analysing your skill map...',
  'Mapping to career outcomes...',
  'Selecting your best track...',
  'Building your roadmap...',
]

const SALARY_BUBBLES = [
  { emoji: '👨🏽‍💻', name: 'Arjun S.', salary: '₹8 LPA', x: '15%', y: '20%' },
  { emoji: '👩🏾‍💼', name: 'Priya M.', salary: '₹19 LPA', x: '65%', y: '5%' },
  { emoji: '👦🏻', name: 'Rahul K.', salary: '₹24 LPA', x: '75%', y: '45%' },
  { emoji: '👩🏽‍🎓', name: 'Sneha P.', salary: '₹26 LPA', x: '20%', y: '60%' },
  { emoji: '👨🏾‍🔬', name: 'Vikram L.', salary: '₹8 LPA', x: '55%', y: '65%' },
]

export default function LoadingScreen() {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timers = []
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleSteps(i + 1), i * 700 + 400))
    })
    // Auto-navigate after 3.2 seconds
    timers.push(setTimeout(() => navigate('/analysis'), 3200))
    return () => timers.forEach(clearTimeout)
  }, [navigate])

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
      <Header />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 20px', width: '100%' }}>
        {/* Spinner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div className="spinner" />
        </div>

        {/* Step list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {STEPS.map((step, i) => {
            const visible = i < visibleSteps
            const done = i < visibleSteps - 1 || (i < visibleSteps && visibleSteps >= STEPS.length)
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: visible ? 1 : 0.25,
                transition: 'opacity 0.4s ease',
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: `2px solid ${done ? 'var(--lime)' : visible ? 'var(--cyan)' : 'var(--navy-border)'}`,
                  background: done ? 'var(--lime)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s',
                }}>
                  {done ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5L4.5 8L9 3" stroke="#0A1A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : visible ? (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', animation: 'spin 1s linear infinite' }} />
                  ) : null}
                </div>
                <span style={{
                  fontSize: '14px',
                  color: done ? 'var(--text-primary)' : visible ? 'var(--cyan)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.3s',
                }}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        {/* Salary bubble cluster */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-border)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: 'var(--font-body)',
          }}>
            Our Learners Report{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>43% Higher Salaries</span>{' '}
            Than Average
          </div>

          {/* Bubble grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}>
            {SALARY_BUBBLES.map((b, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--navy-border)',
                  border: '2px solid var(--navy-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  position: 'relative',
                }}>
                  {b.emoji}
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    background: 'var(--lime)',
                    color: '#0A1A00',
                    fontSize: '9px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    padding: '1px 4px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                  }}>
                    {b.salary}
                  </div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <div style={{
        borderTop: '1px solid var(--navy-border)',
        paddingTop: '12px',
        paddingBottom: '12px',
        overflow: 'hidden',
      }}>
        <Marquee />
      </div>
    </div>
  )
}
