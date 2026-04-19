// AddHabitForm.jsx
// Controlled form component — demonstrates useState for form inputs
// Props: onAdd (callback), onDone (switches tab back after adding)

import { useState } from 'react'

const inputStyle = {
  flex: 1, fontSize: '14px',
  background: 'var(--surface2)', color: 'var(--text)',
  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
  padding: '10px 14px', outline: 'none',
}

export default function AddHabitForm({ onAdd, onDone }) {
  // Controlled inputs — each field is a piece of state
  const [name, setName] = useState('')
  const [cat,  setCat]  = useState('study')
  const [note, setNote] = useState('')

  function handleSubmit() {
    if (!name.trim()) return
    onAdd({ name: name.trim(), cat, note: note.trim() })
    // Reset form
    setName('')
    setNote('')
    setCat('study')
    onDone()
  }

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <input
          style={inputStyle}
          type="text"
          placeholder="Habit name, e.g. Review CSS notes..."
          maxLength={60}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={cat}
            onChange={e => setCat(e.target.value)}
            style={{
              fontFamily: 'DM Mono, monospace', fontSize: '12px',
              background: 'var(--surface2)', color: 'var(--text2)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              padding: '10px 12px', outline: 'none', cursor: 'pointer',
            }}
          >
            <option value="study">Study</option>
            <option value="code">Code</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>

          <input
            style={{ ...inputStyle, flex: 2 }}
            type="text"
            placeholder="Note (optional)"
            maxLength={80}
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            style={{
              fontSize: '13px', fontWeight: 500,
              background: 'var(--accent)', color: '#0d0d0f',
              border: 'none', borderRadius: 'var(--radius-sm)',
              padding: '10px 20px', whiteSpace: 'nowrap',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Add Habit
          </button>
        </div>

      </div>
    </div>
  )
}
