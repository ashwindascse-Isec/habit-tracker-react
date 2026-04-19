// Header.jsx
// Shows greeting (morning/afternoon/evening) and today's date

export default function Header() {
  const hour = new Date().getHours()
  const timePart = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const dateStr  = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.5px', color: 'var(--text)' }}>
          Good <span style={{ color: 'var(--accent)' }}>{timePart}</span>, student.
        </h1>
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--text2)',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: '99px', padding: '6px 14px', whiteSpace: 'nowrap'
        }}>
          {dateStr}
        </span>
      </div>
    </div>
  )
}
