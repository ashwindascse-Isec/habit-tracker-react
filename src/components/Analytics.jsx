// Analytics.jsx
// Three panels: weekly bars, category breakdown, streak leaderboard
// Props: habits, completions

import { offsetKey, offsetDay } from '../hooks/useHabits'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const CAT_COLORS = {
  study:  'var(--blue)',
  code:   'var(--teal)',
  health: 'var(--accent)',
  other:  'var(--text2)',
}

const cardStyle = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', padding: '1.25rem',
}
const titleStyle = {
  fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--text3)',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem',
}

export default function Analytics({ habits, completions }) {
  const total = habits.length

  // --- Weekly completion bars ---
  const weekData = Array.from({ length: 7 }, (_, i) => i - 6).map(offset => {
    const dk      = offsetKey(offset)
    const d       = offsetDay(offset)
    const dayDone = (completions[dk] || []).length
    const pct     = total ? Math.round((dayDone / total) * 100) : 0
    return { label: DAYS[d.getDay()], pct }
  })

  // --- Category counts ---
  const cats = habits.reduce((acc, h) => {
    acc[h.cat] = (acc[h.cat] || 0) + 1
    return acc
  }, {})

  // --- Streak leaderboard (sorted descending) ---
  const sorted    = [...habits].sort((a, b) => (b.streak || 0) - (a.streak || 0))
  const maxStreak = sorted[0]?.streak || 1

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>

        {/* Weekly bars */}
        <div style={cardStyle}>
          <div style={titleStyle}>Completion this week</div>
          {weekData.map(({ label, pct }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text2)', width: '32px', textAlign: 'right', flexShrink: 0 }}>{label}</span>
              <div style={{ flex: 1, background: 'var(--surface3)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '99px', background: 'var(--accent)', width: `${pct}%`, transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', width: '30px' }}>{pct}%</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={cardStyle}>
          <div style={titleStyle}>Habits by category</div>
          {Object.entries(cats).map(([cat, count]) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: CAT_COLORS[cat] || 'var(--text2)', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--text2)', flex: 1 }}>{cat}</span>
              <span style={{ fontSize: '13px', fontFamily: 'DM Mono, monospace', color: 'var(--text)' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Streak leaderboard */}
      <div style={cardStyle}>
        <div style={titleStyle}>Streak leaderboard</div>
        {sorted.map(h => {
          const pct = maxStreak ? Math.round(((h.streak || 0) / maxStreak) * 100) : 0
          return (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                fontSize: '11px', color: 'var(--text2)', width: '90px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 0, textAlign: 'right'
              }}>{h.name}</span>
              <div style={{ flex: 1, background: 'var(--surface3)', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '99px', width: `${pct}%`, background: CAT_COLORS[h.cat] || 'var(--accent)', transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', width: '28px' }}>{h.streak || 0}d</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
