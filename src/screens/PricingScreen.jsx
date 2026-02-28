import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Stepper from '../components/Stepper'
import { useFlow } from '../context/FlowContext'
import tracks from '../data/tracks.json'

const COMPANIES = ['Razorpay', 'Swiggy', 'Meesho', 'CRED', 'Zepto', 'PhonePe']

const TESTIMONIAL = {
  avatar: '👩🏽‍💻',
  name: 'Ayesha Khan',
  role: 'Data Analyst at Swiggy',
  quote: '"Completed the Python data track in 3.5 weeks. Got my first interview call the week after I finished the capstone project."',
}

const BAND_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function PricingScreen() {
  const { state } = useFlow()
  const navigate = useNavigate()
  const [toastVisible, setToastVisible] = useState(false)

  const currentTrack = state.track ?? 'data'
  const currentBand = state.band ?? 'intermediate'
  const trackData = tracks[currentTrack]

  function handleUnlock() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack />
      <Stepper activeStep={5} />

      {/* Toast */}
      {toastVisible && (
        <div className="toast" style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--lime)',
          color: '#0A1A00',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '13px',
          padding: '10px 20px',
          borderRadius: '10px',
          zIndex: 200,
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 24px rgba(132,204,22,0.3)',
        }}>
          ✅ You're in! Check your WhatsApp for access details.
        </div>
      )}

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '24px',
          letterSpacing: '-0.5px',
          marginBottom: '6px',
          lineHeight: 1.25,
          marginTop: '8px',
        }}>
          Unlock Your{' '}
          <span style={{ color: 'var(--cyan)' }}>Python Career Path</span>
        </h1>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          {trackData.label} · {BAND_LABELS[currentBand]} level · 4 weeks
        </p>

        {/* Primary pricing card */}
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '4px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '40px',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>₹299</div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Per course · One-time unlock
          </div>

          <div style={{ height: '1px', background: 'var(--navy-border)', marginBottom: '16px' }} />

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            What's included
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {[
              'Full 4-week roadmap (68 lessons)',
              '4 real-world projects for your portfolio',
              'Certificate of completion',
              'Personalised to your skill level and goal',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  background: 'rgba(132,204,22,0.15)',
                  border: '1px solid rgba(132,204,22,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7.5L8 2.5" stroke="#84CC16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Money-back badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(132,204,22,0.07)',
            border: '1px solid rgba(132,204,22,0.2)',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '16px' }}>🛡️</span>
            <span style={{ fontSize: '12px', color: 'var(--lime)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              7-Day Money-Back Guarantee
            </span>
          </div>

          <button className="btn-primary" onClick={handleUnlock}>
            Unlock Python Career Path
          </button>
        </div>

        {/* Hiring partner strip */}
        <div style={{
          background: 'var(--navy-card)',
          border: '1px solid var(--navy-border)',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            900+ companies hire from LearnTube
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {COMPANIES.map(c => (
              <div key={c} style={{
                background: 'rgba(26,58,92,0.5)',
                border: '1px solid var(--navy-border)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            1,240 learners enrolled in Python this month
          </span>
        </div>

        {/* Testimonial */}
        <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--navy-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}>
              {TESTIMONIAL.avatar}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px' }}>{TESTIMONIAL.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{TESTIMONIAL.role}</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
            {TESTIMONIAL.quote}
          </p>
        </div>

        {/* Secondary — LearnTubeX */}
        <div style={{
          background: 'transparent',
          border: '1px solid var(--navy-border)',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '16px',
        }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '2px' }}>
            Want access to all 200+ courses?
          </div>
          <div style={{ fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '10px' }}>
            LearnTubeX <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '13px' }}>from ₹499/month</span>
          </div>
          <button className="btn-ghost" style={{ width: '100%' }}>
            Explore LearnTubeX
          </button>
        </div>

        {/* Date note */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Pricing valid until 5 March 2025
        </p>
      </div>

      {/* Sticky bar */}
      <div className="sticky-bar slide-up">
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>₹299</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>one-time</div>
          </div>
          <button className="btn-primary" style={{ width: 'auto', flex: 1, padding: '13px 20px' }} onClick={handleUnlock}>
            Unlock Python Career Path
          </button>
        </div>
      </div>
    </div>
  )
}
