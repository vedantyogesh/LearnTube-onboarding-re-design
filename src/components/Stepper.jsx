const STEPS = ['Goal', 'Skill', 'Quiz', 'Path', 'Task', 'Start']

export default function Stepper({ activeStep }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      gap: 0,
    }}>
      {STEPS.map((label, i) => {
        const done   = i < activeStep
        const active = i === activeStep

        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            {/* Node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: done ? 'var(--lime)' : active ? 'rgba(132,204,22,0.12)' : 'rgba(26,58,92,0.4)',
                border: `1.5px solid ${done || active ? 'var(--lime)' : 'var(--navy-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}>
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7.5L8 2.5" stroke="#0A1A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: active ? 'var(--lime)' : 'var(--text-muted)',
                  }}>{i + 1}</span>
                )}
              </div>
              <span className="stepper-label" style={{
                fontSize: '9px',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: done || active ? 'var(--lime)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.2px',
                transition: 'color 0.3s',
              }}>{label}</span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1,
                height: '1.5px',
                background: done ? 'var(--lime)' : 'var(--navy-border)',
                margin: '0 3px',
                marginBottom: '13px',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        )
      })}
      <style>{`@media (max-width: 480px) { .stepper-label { display: none; } }`}</style>
    </div>
  )
}
