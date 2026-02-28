import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useFlow } from '../context/FlowContext'
import tracks from '../data/tracks.json'
import { BarChart, Bot, Settings, AlertTriangle, Check, Snail, GraduationCap, Rocket } from 'lucide-react'

const BAND_COLORS = {
  beginner: '#F97316',    // orange
  intermediate: '#EAB308', // yellow
  advanced: '#00D2FF',   // cyan (excellent)
}

const BAND_LABELS = {
  beginner: 'Average',
  intermediate: 'Good',
  advanced: 'Excellent',
}

function ScoreVisualizer({ score, band }) {
  const color = BAND_COLORS[band] || '#84CC16'

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        fontFamily: 'var(--font-display)',
        color: 'var(--text-muted)',
        marginBottom: '8px',
        fontWeight: 600,
        textTransform: 'uppercase',
      }}>
        <span>Avg</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>
      
      <div style={{
        position: 'relative',
        height: '14px',
        background: 'var(--navy-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${score}%`,
          background: `linear-gradient(90deg, ${color}40 0%, ${color} 100%)`,
          borderRadius: '8px',
          boxShadow: `0 0 10px ${color}40`,
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '20px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          }} />
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: 'var(--text-secondary)',
        marginTop: '6px',
        opacity: 0.6,
      }}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  )
}

export default function AnalysisScreen() {
  const { state, setTrack } = useFlow()
  const navigate = useNavigate()
  const { quizScore, band, track, topicsKnown, topicsToLearn } = state

  // Fallback defaults if navigated directly
  const score = quizScore ?? 62
  const currentBand = band ?? 'intermediate'
  const currentTrack = track ?? 'data'

  const bandColor = BAND_COLORS[currentBand]
  const bandLabel = BAND_LABELS[currentBand]
  const trackData = tracks[currentTrack]

  const rank = Math.max(1, Math.round(522 - (score / 100) * 450))

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

      {/* Three-dot progress indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 20px',
        gap: '0',
        overflowX: 'auto',
      }}>
        {['Course Details', 'Skill Analysis', 'Personalised Course'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i === 1 ? 'var(--cyan)' : 'var(--navy-border)',
                transition: 'background 0.3s',
              }} />
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-display)',
                color: i === 1 ? 'var(--cyan)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>{label}</span>
            </div>
            {i < 2 && (
              <div style={{
                width: '48px',
                height: '1px',
                background: 'var(--navy-border)',
                margin: '0 8px',
                marginBottom: '16px',
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px 24px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '22px',
          letterSpacing: '-0.4px',
          marginBottom: '16px',
        }}>
          Here Is Your Analysis For{' '}
          <span style={{ color: 'var(--cyan)' }}>Python</span>
        </h1>

        {/* Score card */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Current Score
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            {/* Visualizer */}
            <div style={{ flex: 1, paddingRight: '12px' }}>
              <ScoreVisualizer score={score} band={currentBand} />
              <div style={{
                textAlign: 'left',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                color: bandColor,
                marginTop: '12px',
              }}>
                {bandLabel} Performance
              </div>
            </div>

            {/* Score + Rank */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px', paddingTop: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: bandColor, lineHeight: 1 }}>
                  {score}%
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Your Score</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--cyan)', lineHeight: 1 }}>
                  #{rank}/<span style={{ fontSize: '16px' }}>522</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Your Rank</div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--navy-border)', margin: '16px 0' }} />

          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              You Can Achieve <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>91%+ Score</span> In 4 Weeks
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--cyan)' }}>91%+</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Potential Score</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)' }}>#49</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Future Rank</div>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={() => navigate('/roadmap')} style={{ marginBottom: '12px' }}>
            View Personalised Path To Reach Your Goals
          </button>

        </div>

        {/* Topics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {/* Topics to learn */}
          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#F97316', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              To Learn
            </div>
            {(topicsToLearn.length > 0 ? topicsToLearn : ['Pandas', 'File I/O', 'Classes']).map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <AlertTriangle size={14} color="#F97316" />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Topics known */}
          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              You Know
            </div>
            {(topicsKnown.length > 0 ? topicsKnown : ['List Comprehensions', 'Dictionaries']).map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,210,255,0.15)', border: '1px solid rgba(0,210,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} color="#00D2FF" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Track */}
        <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Your Recommended Track
          </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--cyan)' }}>
                {currentTrack === 'data' && <BarChart size={32} strokeWidth={1.5} />}
                {currentTrack === 'ai' && <Bot size={32} strokeWidth={1.5} />}
                {currentTrack === 'backend' && <Settings size={32} strokeWidth={1.5} />}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>{trackData.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{trackData.role}</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: 'rgba(0,210,255,0.1)',
                border: '1px solid rgba(0,210,255,0.25)',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--cyan)',
                fontFamily: 'var(--font-display)',
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(0, 210, 255, 0.05)'
              }}>
                {trackData.salaryRange}
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              background: 'rgba(0,210,255,0.1)',
              border: '1px solid rgba(0,210,255,0.25)',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--cyan)',
              fontFamily: 'var(--font-display)',
              flexShrink: 0,
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.05)'
            }}>
              {trackData.salaryRange}
            </div>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
            Based on your goal and current level, we recommend the{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{trackData.label}</span>.
            This prepares you for {trackData.role} roles.
          </p>

          {/* Track switcher */}
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>Switch track:</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'data', label: 'Data', icon: BarChart },
              { id: 'ai', label: 'AI', icon: Bot },
              { id: 'backend', label: 'Backend', icon: Settings },
            ].map(t => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setTrack(t.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: `1.5px solid ${currentTrack === t.id ? 'var(--cyan)' : 'var(--navy-border)'}`,
                    background: currentTrack === t.id ? 'rgba(0,200,224,0.1)' : 'transparent',
                    color: currentTrack === t.id ? 'var(--cyan)' : 'var(--text-muted)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <Icon size={14} strokeWidth={2.5} />
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
