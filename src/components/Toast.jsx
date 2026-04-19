// Toast.jsx
// Popup notification — uses useEffect to auto-dismiss
// Props: message (string | null), onDone (clears message)

import { useEffect } from 'react'

export default function Toast({ message, onDone }) {
  // useEffect: runs whenever `message` changes
  // If there's a message, set a timer to clear it after 2.2s
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)  // cleanup if message changes before timer fires
  }, [message])

  if (!message) return null

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--surface2)', border: '1px solid var(--border2)',
      borderRadius: '99px', padding: '10px 20px',
      fontSize: '13px', color: 'var(--text2)',
      animation: 'fadeSlideIn 0.25s ease',
      zIndex: 999, whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      {message}
    </div>
  )
}
