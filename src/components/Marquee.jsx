const CARDS = [
  { avatar: '👨🏽‍💻', name: 'Arjun S.', course: 'Python for Data Science' },
  { avatar: '👩🏾‍💼', name: 'Priya M.', course: 'ML Engineering Bootcamp' },
  { avatar: '👦🏻', name: 'Rahul K.', course: 'Backend with FastAPI' },
  { avatar: '👩🏽‍🎓', name: 'Sneha P.', course: 'Data Analytics with pandas' },
  { avatar: '👨🏾‍🔬', name: 'Vikram L.', course: 'AI & LLM Applications' },
  { avatar: '👩🏻‍💻', name: 'Divya R.', course: 'SQL for Analysts' },
  { avatar: '🧑🏽‍🎨', name: 'Karan B.', course: 'Python Automation' },
  { avatar: '👩🏾‍🔬', name: 'Ananya T.', course: 'Deep Learning with TensorFlow' },
]

function Card({ avatar, name, course }) {
  return (
    <div style={{
      background: 'var(--navy-card)',
      border: '1px solid var(--navy-border)',
      borderRadius: '10px',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexShrink: 0,
      marginRight: '12px',
      minWidth: '220px',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--navy-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0,
      }}>
        {avatar}
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          {name}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          enrolled in {course}
        </div>
      </div>
      <div style={{
        marginLeft: 'auto',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--lime)',
        flexShrink: 0,
      }} />
    </div>
  )
}

export default function Marquee() {
  const doubled = [...CARDS, ...CARDS]

  return (
    <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginBottom: '8px',
        fontFamily: 'var(--font-body)',
      }}>
        Every minute a new course is created on LearnTube
      </div>
      <div className="marquee-track">
        {doubled.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
    </div>
  )
}
