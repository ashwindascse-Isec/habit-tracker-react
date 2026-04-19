// HabitList.jsx
// Renders the list of HabitCards, or an empty state
// Props: habits, todayDone, onToggle, onDelete

import HabitCard from './HabitCard'

export default function HabitList({ habits, todayDone, onToggle, onDelete }) {
  if (habits.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text3)' }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
        <p style={{ fontSize: '14px' }}>No habits yet.<br />Go to "+ Add New" to get started.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isDone={todayDone.includes(habit.id)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
