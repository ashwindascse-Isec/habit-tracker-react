// HabitCard.jsx
// A single habit row — shows name, category tag, streak, delete button
// Props: habit, isDone, onToggle, onDelete

const CAT_STYLES = {
  study:  { bg: 'var(--blue-dim)',   color: 'var(--blue)'   },
  code:   { bg: 'var(--teal-dim)',   color: 'var(--teal)'   },
  health: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
  other:  { bg: 'var(--surface3)',   color: 'var(--text2)'  },
}

export default function HabitCard({ habit, isDone, onToggle, onDelete }) {
  const { id, name, cat, note, streak } = habit
  const isFire      = streak >= 7
  const streakLabel = isFire ? `🔥 ${streak}d` : `${streak}d`
  const catStyle    = CAT_STYLES[cat] || CAT_STYLES.other

  return (
    <div
      onClick={() => onToggle(id)}
      style={{
        background: isDone ? 'var(--accent-dim)' : 'var(--surface)',
        border: `1px solid ${isDone ? 'var(--accent-border)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        animation: 'fadeSlideIn 0.25s ease',
        userSelect: 'none',
      }}
    >
      {/* Check circle */}
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        border: `1.5px solid ${isDone ? 'var(--accent)' : 'var(--border2)'}`,
        background: isDone ? 'var(--accent)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.2s',
      }}>
        {isDone && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </div>

      {/* Habit info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px', fontWeight: 500,
          color: isDone ? 'var(--text2)' : 'var(--text)',
          textDecoration: isDone ? 'line-through' : 'none',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {name}
        </div>
        <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
          <span style={{
            fontSize: '10px', fontFamily: 'DM Mono, monospace', fontWeight: 500,
            padding: '2px 8px', borderRadius: '99px',
            background: catStyle.bg, color: catStyle.color,
          }}>
            {cat}
          </span>
          {note && (
            <span style={{ fontSize: '11px', color: 'var(--text3)' }}>{note}</span>
          )}
        </div>
      </div>

      {/* Streak badge */}
      <div style={{
        fontSize: '11px', fontFamily: 'DM Mono, monospace', fontWeight: 500,
        padding: '4px 10px', borderRadius: '99px', flexShrink: 0,
        background: isFire ? 'var(--amber-dim)' : isDone ? 'var(--accent-dim)' : 'var(--surface3)',
        color: isFire ? 'var(--amber)' : isDone ? 'var(--accent)' : 'var(--text2)',
      }}>
        {streakLabel} streak
      </div>

      {/* Delete button — stopPropagation prevents triggering the card's onClick */}
      <button
        onClick={e => { e.stopPropagation(); onDelete(id) }}
        style={{
          background: 'none', border: 'none', color: 'var(--text3)',
          fontSize: '18px', flexShrink: 0, width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '6px', transition: 'color 0.15s, background 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'var(--red-dim)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none' }}
      >
        ×
      </button>
    </div>
  )
}
