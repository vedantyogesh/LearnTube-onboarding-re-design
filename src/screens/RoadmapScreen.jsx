import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Stepper from '../components/Stepper'
import { useFlow } from '../context/FlowContext'
import tracks from '../data/tracks.json'
import tasks from '../data/tasks.json'

function AccordionWeek({ week, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px')

  useEffect(() => {
    if (!contentRef.current) return
    if (open) {
      const h = contentRef.current.scrollHeight
      setHeight(`${h}px`)
      setTimeout(() => setHeight('auto'), 200)
    } else {
      setHeight(`${contentRef.current.scrollHeight}px`)
      requestAnimationFrame(() => setHeight('0px'))
    }
  }, [open])

  return (
    <div className="glass-panel" style={{ marginBottom: '10px', overflow: 'hidden' }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Week badge */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'rgba(0,210,255,0.1)',
          border: '1px solid rgba(0,210,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '11px',
          color: 'var(--cyan)',
          flexShrink: 0,
        }}>
          W{week.week}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--text-primary)',
            marginBottom: '2px',
          }}>
            {week.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Build:</span>
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{week.build}</span>
          </div>
        </div>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--text-muted)',
            flexShrink: 0,
          }}
        >
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expandable content */}
      <div
        className="accordion-content"
        style={{ height: typeof height === 'string' ? height : 'auto', overflow: open && height === 'auto' ? 'visible' : 'hidden' }}
      >
        <div ref={contentRef} style={{ padding: '0 16px 16px' }}>
          {/* Tool pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {week.tools.map(tool => (
              <span key={tool} style={{
                background: 'rgba(26,58,92,0.6)',
                border: '1px solid var(--navy-border)',
                borderRadius: '6px',
                padding: '3px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-code)',
                color: 'var(--cyan)',
              }}>
                {tool}
              </span>
            ))}
          </div>

          {/* Modules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {week.modules.map((mod, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'rgba(0,210,255,0.12)',
                  border: '1px solid rgba(0,210,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4L3 6L7 2" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RoadmapScreen() {
  const { state } = useFlow()
  const navigate = useNavigate()

  const currentTrack = state.track ?? 'data'
  const currentBand = state.band ?? 'intermediate'
  const trackData = tracks[currentTrack]
  const taskData = tasks[currentBand]

  // Preload Pyodide in background
  useEffect(() => {
    if (window._pyodideLoading || window._pyodideReady) return
    window._pyodideLoading = true
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'
    script.onload = async () => {
      try {
        window._pyodide = await window.loadPyodide()
        window._pyodideReady = true
        window._pyodideLoading = false
      } catch (e) {
        window._pyodideLoading = false
      }
    }
    document.head.appendChild(script)
  }, [])

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
      <Stepper activeStep={3} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px 24px' }}>
        {/* Track header */}
        <div className="glass-panel" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          padding: '16px',
        }}>
          <span style={{ fontSize: '32px' }}>{trackData.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '16px',
              marginBottom: '2px',
            }}>
              Your Python {trackData.label}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{trackData.role}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{
              background: 'rgba(0,210,255,0.1)',
              border: '1px solid rgba(0,210,255,0.25)',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--cyan)',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.05)'
            }}>
              {trackData.salaryRange}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {trackData.learnerCount.toLocaleString()} learners
            </div>
          </div>
        </div>

        {/* Roadmap label */}
        <div style={{
          fontSize: '11px',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'var(--text-muted)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Your 4-Week Roadmap
        </div>

        {/* Accordion weeks */}
        {trackData.weeks.map((week, i) => (
          <AccordionWeek key={i} week={week} defaultOpen={i === 0} />
        ))}

        {/* Task teaser */}
        <div
          className="glass-panel"
          style={{
            padding: '16px',
            marginTop: '16px',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
          }}
          onClick={() => navigate('/task')}
        >
          <div style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            WEEK 1 VIDEO + TASK IS READY FOR YOU
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                {taskData.title}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: currentBand === 'beginner' ? 'rgba(132,204,22,0.15)' : currentBand === 'intermediate' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                border: `1px solid ${currentBand === 'beginner' ? 'rgba(132,204,22,0.3)' : currentBand === 'intermediate' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: '4px',
                padding: '2px 7px',
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: currentBand === 'beginner' ? 'var(--lime)' : currentBand === 'intermediate' ? '#EAB308' : '#EF4444',
              }}>
                {taskData.difficulty}
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px var(--cyan-glow)'
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L12 7L3 12V2Z" fill="var(--navy)"/>
              </svg>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Sticky bar */}
      <div className="sticky-bar slide-up">
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🔒</span>
              <span>Available until 5 March</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>
              ₹299<span style={{ fontWeight: 400, fontSize: '12px', color: 'var(--text-muted)' }}>/course</span>
            </div>
          </div>
          <button className="btn-primary" style={{ width: 'auto', flexShrink: 0, padding: '13px 20px' }} onClick={() => navigate('/task')}>
            Try Your First Video + Task Free →
          </button>
        </div>
      </div>
    </div>
  )
}
