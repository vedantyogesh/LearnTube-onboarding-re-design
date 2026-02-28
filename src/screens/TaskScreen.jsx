import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import Header from '../components/Header'
import Stepper from '../components/Stepper'
import { useFlow } from '../context/FlowContext'
import tasks from '../data/tasks.json'

export default function TaskScreen() {
  const { state, setTaskCompleted } = useFlow()
  const navigate = useNavigate()
  const currentBand = state.band ?? 'intermediate'
  const taskData = tasks[currentBand]

  const [code, setCode] = useState(taskData.starterCode)
  const [output, setOutput] = useState('')
  const [hasError, setHasError] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [pyodideLoading, setPyodideLoading] = useState(false)
  const [ran, setRan] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const pyodideRef = useRef(null)

  useEffect(() => {
    // Check if already loaded from RoadmapScreen
    if (window._pyodideReady && window._pyodide) {
      pyodideRef.current = window._pyodide
      setPyodideReady(true)
      return
    }

    // Load if not already loading
    setPyodideLoading(true)

    const loadPyodide = async () => {
      try {
        if (!window._pyodideScriptLoaded) {
          await new Promise((resolve, reject) => {
            if (document.querySelector('script[src*="pyodide"]')) {
              // Script already in DOM, wait for it
              const check = setInterval(() => {
                if (window.loadPyodide) { clearInterval(check); resolve() }
              }, 100)
              return
            }
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'
            script.onload = () => { window._pyodideScriptLoaded = true; resolve() }
            script.onerror = reject
            document.head.appendChild(script)
          })
        } else {
          // Wait for the function to be available
          await new Promise(resolve => {
            const check = setInterval(() => {
              if (window.loadPyodide) { clearInterval(check); resolve() }
            }, 100)
          })
        }

        if (!window._pyodide) {
          window._pyodide = await window.loadPyodide()
          window._pyodideReady = true
        }
        pyodideRef.current = window._pyodide
        setPyodideReady(true)
        setPyodideLoading(false)
      } catch (e) {
        setPyodideLoading(false)
        setOutput('Failed to load Python runtime. Check your connection.')
        setHasError(true)
      }
    }

    loadPyodide()
  }, [])

  async function runCode() {
    if (!pyodideRef.current) return
    setRan(true)
    setOutput('Running...')
    setHasError(false)
    setSuccess(false)

    try {
      // Reset stdout
      pyodideRef.current.runPython('import sys, io\nsys.stdout = io.StringIO()')

      // Run the code
      await pyodideRef.current.runPythonAsync(code)

      // Capture output
      const result = pyodideRef.current.runPython('sys.stdout.getvalue()')
      setOutput(result || '(no output)')
      setHasError(false)
      setSuccess(true)
      setTaskCompleted()
    } catch (e) {
      setOutput(e.message || String(e))
      setHasError(true)
      setSuccess(false)
    }
  }

  const bandColor = currentBand === 'beginner' ? 'var(--cyan)' : currentBand === 'intermediate' ? '#EAB308' : '#EF4444'

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
      <Stepper activeStep={4} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 20px 24px' }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '8px' }}>
          <div style={{
            background: currentBand === 'beginner' ? 'rgba(0,210,255,0.12)' : currentBand === 'intermediate' ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)',
            border: `1px solid ${bandColor}40`,
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: bandColor,
            boxShadow: currentBand === 'beginner' ? '0 0 10px rgba(0,210,255,0.1)' : 'none',
          }}>
            {taskData.difficulty}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Week 1 · Real Task</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '22px',
          letterSpacing: '-0.4px',
          marginBottom: '8px',
          lineHeight: 1.3,
        }}>
          {taskData.title}
        </h1>

        {taskData.videoUrl && (
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: '12px',
            marginBottom: '16px',
            border: '1px solid var(--navy-border)'
          }}>
            <iframe
              src={taskData.videoUrl}
              title="Task Video"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}>
          {taskData.description}
        </p>

        {/* Hint toggle */}
        <button
          onClick={() => setShowHint(h => !h)}
          style={{
            background: 'transparent',
            border: '1px solid var(--navy-border)',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.15s, border-color 0.15s',
          }}
        >
          <span>💡</span>
          <span>{showHint ? 'Hide hint' : 'Show hint'}</span>
        </button>

        {showHint && (
          <div className="glass-panel" style={{
            padding: '10px 14px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            lineHeight: 1.5,
          }}>
            💡 {taskData.hint}
          </div>
        )}

        {/* Pyodide loading banner */}
        {pyodideLoading && !pyodideReady && (
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            marginBottom: '12px',
          }}>
            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
            <span style={{ fontSize: '13px', color: 'var(--cyan)' }}>
              Loading Python runtime... (one-time ~5 sec)
            </span>
          </div>
        )}

        {/* Editor */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--navy-border)',
          marginBottom: '12px',
        }}>
          {/* Fake title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            background: '#252526',
            borderBottom: '1px solid #333',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA41' }} />
            </div>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-code)', color: '#999' }}>task.py</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '11px',
              fontFamily: 'var(--font-code)',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}>
              Python 3.11
            </span>
          </div>

          <Editor
            height="320px"
            defaultLanguage="python"
            value={code}
            onChange={v => setCode(v || '')}
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: "'DM Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              renderLineHighlight: 'all',
              padding: { top: 12, bottom: 12 },
              tabSize: 4,
              insertSpaces: true,
              folding: false,
            }}
            loading={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '320px', background: '#1e1e1e', color: '#4A6A80', fontSize: '13px', fontFamily: 'var(--font-code)' }}>
                Loading editor...
              </div>
            }
          />
        </div>

        {/* Run button */}
        <button
          className="btn-primary"
          onClick={runCode}
          disabled={!pyodideReady}
          style={{ marginBottom: '12px' }}
        >
          {!pyodideReady ? (
            <><div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', flexShrink: 0 }} /> Loading Python...</>
          ) : (
            <>▶ Run Code</>
          )}
        </button>

        {/* Output panel */}
        {ran && (
          <div className="glass-panel" style={{
            border: `1px solid ${hasError ? '#EF4444' : 'rgba(0,210,255,0.3)'}`,
            padding: '12px 14px',
            marginBottom: '16px',
            fontFamily: 'var(--font-code)',
            fontSize: '13px',
            minHeight: '60px',
          }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '8px' }}>$ output</div>
            <pre style={{
              color: hasError ? '#EF4444' : 'var(--cyan)',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {output}
            </pre>
          </div>
        )}

        {/* Success banner */}
        {success && (
          <div className="glass-panel success-banner" style={{
            background: 'rgba(0,210,255,0.08)',
            border: '1px solid rgba(0,210,255,0.3)',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 12px var(--cyan-glow)'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                Nice work. 🎉
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                You just did what a Data Analyst does on Day 1.
              </div>
              <button className="btn-primary" onClick={() => navigate('/pricing')} style={{ width: 'auto', padding: '10px 20px', fontSize: '14px' }}>
                Start My Python Career Path →
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Sticky CTA bar */}
      <div className="sticky-bar slide-up">
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <button className="btn-primary" style={{ padding: '15px 24px' }} onClick={() => navigate('/pricing')}>
            Start My Python Career Path →
          </button>
        </div>
      </div>
    </div>
  )
}
