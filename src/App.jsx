import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [schedules, setSchedules] = useState([])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/schedules')
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(() => setMessage('Failed to load schedules'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const res = await fetch('http://localhost:3000/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start, end })
    })
    const data = await res.json()
    if (res.status === 201) {
      setSchedules([...schedules, data])
      setStart('')
      setEnd('')
      setMessage('Schedule added!')
    } else {
      setMessage(data.error || 'Error')
    }
  }

  return (
    <div className="App">
      <h1>Schedules</h1>
      <ul>
        {schedules.map(s => (
          <li key={s.id}>
            {s.start} - {s.end}
          </li>
        ))}
      </ul>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>Start: <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required /></label>
        </div>
        <div>
          <label>End: <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required /></label>
        </div>
        <button type="submit">Add</button>
      </form>
      {message && <div style={{ color: message === 'Schedule added!' ? 'green' : 'red', marginTop: 10 }}>{message}</div>}
    </div>
  )
}

export default App
