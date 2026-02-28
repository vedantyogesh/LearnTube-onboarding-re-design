import { useNavigate } from 'react-router-dom'

export default function Header({ showBack = false, onBack }) {
  const navigate = useNavigate()

  function handleBack() {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showBack && (
          <button
            onClick={handleBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '6px',
              transition: 'color 0.15s',
            }}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Play triangle icon */}
          <div style={{
            width: '28px',
            height: '28px',
            background: 'var(--lime)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2L12 7L3 12V2Z" fill="#0A1A00"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
          }}>
            LearnTube<span style={{ color: 'var(--cyan)' }}>.ai</span>
          </span>
        </div>
      </div>

      {/* Google for Startups badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '11px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
      }}>
        <span>backed by</span>
        <span style={{ fontWeight: 700 }}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </span>
        <span>for Startups</span>
      </div>
    </header>
  )
}
