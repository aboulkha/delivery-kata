import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function App() {
  const dispatch = useDispatch()
  const methods = useSelector((s) => s.methods.items)
  const slots = useSelector((s) => s.slots.items)
  const loading = useSelector((s) => s.slots.loading)
  const error = useSelector((s) => s.slots.error)

  const todayISO = new Date().toISOString().slice(0, 10)
  const [method, setMethod] = useState('')
  const [date, setDate] = useState(todayISO)

  useEffect(() => {
    dispatch({ type: 'methods/fetch' })
  }, [dispatch])

  useEffect(() => {
    if (methods && methods.length > 0 && !method) setMethod(methods[0].id)
  }, [methods])

  const loadSlots = () => {
    dispatch({ type: 'slots/fetch', payload: { method, date } })
  }

  return (
    <div className="container bg-white rounded shadow">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Delivery Slot Reservation</h1>

        <div className="flex items-center gap-3 mb-4">
          <label className="font-medium">Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="border rounded px-2 py-1">
            {methods.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <label className="font-medium">Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-2 py-1" />

          <button onClick={loadSlots} disabled={loading} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60">
            {loading ? 'Loading...' : 'Load slots'}
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {slots.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">Available slots</h3>
            <ul className="space-y-3">
              {slots.map((s) => (
                <li key={s.id} className="flex items-center justify-between border rounded p-3">
                  <div>
                    <div className="font-medium">{s.start} - {s.end}</div>
                    <div className="text-sm text-gray-600">Remaining: {s.remaining}</div>
                  </div>
                  <button className="bg-green-600 text-white px-3 py-1 rounded" disabled={s.remaining === 0}>Reserve</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-600">No slots loaded yet.</div>
        )}
      </div>
    </div>
  )
}
