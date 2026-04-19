// WeekHeatmap.jsx
// Shows last 7 days with completion % and per-habit dots
// Props: habits, completions, pct (today's %)

import { offsetKey, offsetDay } from '../hooks/useHabits'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function WeekHeatmap({ habits, completions, pct }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--text3)',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px'
      }}>
        This Week
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {/* Loop i from -6 (6 days ago) to 0 (today) */}
        {Array.from({ length: 7 }, (_, i) => i - 6).map(offset => {
          const dk      = offsetKey(offset)
          const day     = offsetDay(offset)
          const dayDone = (completions[dk] || []).length
          const total   = habits.length
          const dayPct  = total ? Math.round((dayDone / total) * 100) : 0
          const display = offset === 0 ? pct : dayPct
          const isToday = offset === 0
          const level   = display >= 80 ? 'great' : display >= 40 ? 'ok' : ''

          return (
            <div key={dk} style={{
              background: 'var(--surface2)',
              border: `1px solid ${isToday ? 'var(--accent-border)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '8px 4px 6px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: 'DM Mono, monospace', marginBottom: '4px' }}>
                {DAYS[day.getDay()]}
              </div>
              <div style={{
                fontSize: '13px', fontWeight: 500,
                color: level === 'great' ? 'var(--accent)' : level === 'ok' ? 'var(--amber)' : 'var(--text2)'
              }}>
                {display}%
              </div>
              {/* One dot per habit — green if done */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '4px', flexWrap: 'wrap' }}>
                {habits.map(h => {
                  const done = (completions[dk] || []).includes(h.id)
                  return (
                    <div key={h.id} style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: done ? 'var(--accent)' : 'var(--surface3)'
                    }} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
