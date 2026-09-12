import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const translations = {
  en: {
    operations: 'Operations',
    title: 'Delivery Slot Reservation',
    method: 'Method',
    date: 'Date',
    loadSlots: 'Load slots',
    loading: 'Loading...',
    noSlots: 'No slots available for this selection.',
    reserved: 'Reserved',
    available: 'Available',
    booked: 'Booked',
    reserve: 'Reserve',
    language: 'Language',
    success: 'Reservation successful',
    unavailable: 'Slot unavailable',
    failed: 'Reservation failed',
    failedLoad: 'Failed to load slots',
  },
  fr: {
    operations: 'Opérations',
    title: 'Réservation de créneaux de livraison',
    method: 'Méthode',
    date: 'Date',
    loadSlots: 'Charger les créneaux',
    loading: 'Chargement...',
    noSlots: 'Aucun créneau disponible pour cette sélection.',
    reserved: 'Réservé',
    available: 'Disponible',
    booked: 'Réservé',
    reserve: 'Réserver',
    language: 'Langue',
    success: 'Réservation réussie',
    unavailable: 'Créneau indisponible',
    failed: 'Réservation échouée',
    failedLoad: 'Échec du chargement des créneaux',
  },
}

const methodLabels = {
  en: {
    DELIVERY: 'Delivery',
    DRIVE: 'Drive',
    DELIVERY_TODAY: 'Delivery Today',
    DELIVERY_ASAP: 'Delivery ASAP',
  },
  fr: {
    DELIVERY: 'Livraison',
    DRIVE: 'Course',
    DELIVERY_TODAY: 'Livraison aujourd’hui',
    DELIVERY_ASAP: 'Livraison ASAP',
  },
}

export default function App() {
  const dispatch = useDispatch()
  const methods = useSelector((state) => state.methods.items)
  const slots = useSelector((state) => state.slots.items)
  const loading = useSelector((state) => state.slots.loading)
  const error = useSelector((state) => state.slots.error)
  const message = useSelector((state) => state.slots.message)

  const [locale, setLocale] = useState('fr')
  const [method, setMethod] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const t = translations[locale]

  useEffect(() => {
    dispatch({ type: 'methods/fetch' })
  }, [dispatch])

  useEffect(() => {
    if (methods.length > 0 && !method) {
      setMethod(methods[0].id)
    }
  }, [methods, method])

  useEffect(() => {
    if (method) {
      dispatch({ type: 'slots/fetch', payload: { method, date } })
    }
  }, [dispatch, method, date])

  const loadSlots = () => {
    if (!method) return
    dispatch({ type: 'slots/fetch', payload: { method, date } })
  }

  const reserve = (slotId) => {
    if (!method) return
    dispatch({
      type: 'reservations/reserve',
      payload: { customerId: 'demo-customer', slotId, method, date },
    })
  }

  const prettyMethodName = (value) => {
    const key = typeof value === 'string' ? value : value?.id
    if (!key) return value
    return methodLabels[locale]?.[key] ?? methodLabels.en[key] ?? key
  }

  return (
    <div className="app-shell">
      <div className="app-panel">
        <header className="app-header">
          <div className="header-row">
            <div>
              <p className="eyebrow">{t.operations}</p>
              <h1>{t.title}</h1>
            </div>

            <div className="language-switcher" aria-label={t.language}>
              <button
                className={locale === 'en' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLocale('en')}
                type="button"
              >
                EN
              </button>
              <button
                className={locale === 'fr' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLocale('fr')}
                type="button"
              >
                FR
              </button>
            </div>
          </div>
        </header>

        <section className="control-bar">
          <label className="field">
            <span>{t.method}</span>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              {methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {prettyMethodName(m)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{t.date}</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <button className="primary-button" onClick={loadSlots} disabled={loading || !method}>
            {loading ? t.loading : t.loadSlots}
          </button>
        </section>

        {error && <div className="alert alert-error">{error === 'Failed to load slots' ? t.failedLoad : error}</div>}
        {message && <div className="alert alert-success">{message === 'Reservation successful' ? t.success : message === 'Slot unavailable' ? t.unavailable : message === 'Reservation failed' ? t.failed : message}</div>}

        <section className="slots-section">
          {slots.length === 0 ? (
            <div className="empty-state">
              <p>{t.noSlots}</p>
            </div>
          ) : (
            <ul className="slots-list">
              {slots.map((s) => (
                <li key={s.id} className={`slot-card ${s.reserved ? 'is-reserved' : ''}`}>
                  <div className="slot-main">
                    <div className="slot-time">{s.start} - {s.end}</div>
                    <div className="slot-meta">
                      <span>{prettyMethodName(s.method)}</span>
                      <span>{s.date}</span>
                    </div>
                  </div>

                  <div className="slot-status">
                    {s.reserved ? t.reserved : t.available}
                  </div>

                  <button
                    className="reserve-button"
                    onClick={() => reserve(s.id)}
                    disabled={s.reserved}
                  >
                    {s.reserved ? t.booked : t.reserve}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

