export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)

  return (
    <div style={{ padding: '16px 20px 8px' }}>
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${pct}%` }}
          >
            <span className="progress-star">⭐</span>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
      }}>
        <span style={{ fontWeight: 600 }}>{current}/{total}</span>
        <span>86% people who completed this quiz got hired</span>
      </div>
    </div>
  )
}
