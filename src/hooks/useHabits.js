import { useState, useEffect } from 'react'

// --- Date helpers ---
export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function offsetKey(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function offsetDay(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}

// --- Default seed data ---
const DEFAULT_STATE = {
  habits: [
    { id: 1, name: 'Review lecture notes',      cat: 'study',  note: '',                       streak: 3 },
    { id: 2, name: 'Practice HTML/CSS 30 min',  cat: 'code',   note: '',                       streak: 1 },
    { id: 3, name: 'Read a tech article',        cat: 'study',  note: '',                       streak: 0 },
    { id: 4, name: 'Drink 8 glasses of water',   cat: 'health', note: '',                       streak: 5 },
    { id: 5, name: 'Solve 1 coding problem',     cat: 'code',   note: 'LeetCode or HackerRank', streak: 2 },
  ],
  completions: {},
  nextId: 6,
}

// --- Load from localStorage or use defaults ---
function loadState() {
  try {
    const raw = localStorage.getItem('ht-react')
    return raw ? JSON.parse(raw) : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

// --- Custom hook ---
export function useHabits() {
  const [habits, setHabits]           = useState(() => loadState().habits)
  const [completions, setCompletions] = useState(() => loadState().completions)
  const [nextId, setNextId]           = useState(() => loadState().nextId)

  // useEffect: persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ht-react', JSON.stringify({ habits, completions, nextId }))
  }, [habits, completions, nextId])

  // Toggle a habit done/undone for today
  function toggleHabit(id) {
    const key = todayKey()
    setCompletions(prev => {
      const todayList = prev[key] || []
      const alreadyDone = todayList.includes(id)
      return {
        ...prev,
        [key]: alreadyDone
          ? todayList.filter(i => i !== id)
          : [...todayList, id],
      }
    })
    // Update streak
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h
      const todayList = completions[key] || []
      const alreadyDone = todayList.includes(id)
      return { ...h, streak: alreadyDone ? Math.max(0, h.streak - 1) : h.streak + 1 }
    }))
  }

  // Add a new habit
  function addHabit({ name, cat, note }) {
    setHabits(prev => [...prev, { id: nextId, name, cat, note, streak: 0 }])
    setNextId(prev => prev + 1)
  }

  // Delete a habit and clean its completions
  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
    setCompletions(prev => {
      const updated = {}
      for (const [day, ids] of Object.entries(prev)) {
        updated[day] = ids.filter(i => i !== id)
      }
      return updated
    })
  }

  // Derived values
  const todayDone  = completions[todayKey()] || []
  const doneCount  = todayDone.length
  const total      = habits.length
  const pct        = total ? Math.round((doneCount / total) * 100) : 0
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.streak || 0), 0)

  return {
    habits,
    completions,
    todayDone,
    doneCount,
    total,
    pct,
    bestStreak,
    toggleHabit,
    addHabit,
    deleteHabit,
  }
}
