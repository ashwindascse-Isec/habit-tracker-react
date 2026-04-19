// Overview.jsx
// Progress ring + 3 stat cards
// Props: pct, doneCount, total, bestStreak

const CIRCUMFERENCE = 2 * Math.PI * 46  // matches r="46" in the SVG

export default function Overview({ pct, doneCount, total, bestStreak }) {
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem',
      alignItems: 'center', marginBottom: '2rem',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.5rem'
    }}>
      {/* SVG Progress Ring */}
      <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
        <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
          <circle className="ring-bg" cx="55" cy="55" r="46"
            fill="none" stroke="var(--surface3)" strokeWidth="8" />
          <circle cx="55" cy="55" r="46"
            fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        {/* Centered text overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)' }}>{pct}%</span>
          <span style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>today</span>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <StatCard label="Done"        value={doneCount}         color="var(--accent)" />
        <StatCard label="Total"       value={total}             color="var(--text)"   />
        <StatCard label="Best streak" value={`${bestStreak}d`}  color="var(--amber)"  />
      </div>
    </div>
  )
}

// Small reusable sub-component — notice how React encourages breaking UI into small pieces
function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px'
    }}>
      <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 600, marginTop: '2px', color }}>
        {value}
      </div>
    </div>
  )
}
