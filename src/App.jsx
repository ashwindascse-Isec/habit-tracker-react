// App.jsx
// Root component — assembles all child components
// Manages tab state and toast state here (UI state, not habit state)

import { useState } from 'react'
import { useHabits } from './hooks/useHabits'

import Header       from './components/Header'
import Overview     from './components/Overview'
import WeekHeatmap  from './components/WeekHeatmap'
import HabitList    from './components/HabitList'
import AddHabitForm from './components/AddHabitForm'
import Analytics    from './components/Analytics'
import Toast        from './components/Toast'

const TABS = ['habits', 'add', 'analytics']

export default function App() {
  // UI state — lives here because it's page-level
  const [activeTab, setActiveTab] = useState('habits')
  const [toast, setToast]         = useState(null)

  // All habit logic comes from our custom hook
  const {
    habits, completions, todayDone,
    doneCount, total, pct, bestStreak,
    toggleHabit, addHabit, deleteHabit,
  } = useHabits()

  function showToast(msg) { setToast(msg) }

  function handleToggle(id) {
    toggleHabit(id)
    showToast('✓ Habit updated!')
  }

  function handleAdd(data) {
    addHabit(data)
    showToast('Habit added!')
  }

  function handleDelete(id) {
    deleteHabit(id)
    showToast('Habit removed.')
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

      <Header />

      <Overview
        pct={pct}
        doneCount={doneCount}
        total={total}
        bestStreak={bestStreak}
      />

      <WeekHeatmap
        habits={habits}
        completions={completions}
        pct={pct}
      />

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: '4px', marginBottom: '1rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontSize: '13px', fontWeight: 500, padding: '8px 16px',
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
              marginBottom: '-1px',
              color: activeTab === tab ? 'var(--accent)' : 'var(--text3)',
              cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {tab === 'add' ? '+ Add New' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab panels — conditional rendering with && */}
      {activeTab === 'habits' && (
        <HabitList
          habits={habits}
          todayDone={todayDone}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      {activeTab === 'add' && (
        <AddHabitForm
          onAdd={handleAdd}
          onDone={() => setActiveTab('habits')}
        />
      )}

      {activeTab === 'analytics' && (
        <Analytics habits={habits} completions={completions} />
      )}

      <Toast message={toast} onDone={() => setToast(null)} />

    </div>
  )
}
