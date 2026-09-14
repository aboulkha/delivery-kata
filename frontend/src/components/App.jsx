import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LanguageSwitcher from './LanguageSwitcher'
import ReservationForm from './ReservationForm'
import SlotList from './SlotList'

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

            <LanguageSwitcher
              locale={locale}
              onChangeLocale={setLocale}
              languageLabel={t.language}
            />
          </div>
        </header>

        <ReservationForm
          methods={methods}
          method={method}
          date={date}
          loading={loading}
          onMethodChange={setMethod}
          onDateChange={setDate}
          onLoadSlots={loadSlots}
          prettyMethodName={prettyMethodName}
          texts={t}
        />

        {error && (
          <div className="alert alert-error">
            {error === 'Failed to load slots' ? t.failedLoad : error}
          </div>
        )}
        {message && (
          <div className="alert alert-success">
            {message === 'Reservation successful'
              ? t.success
              : message === 'Slot unavailable'
                ? t.unavailable
                : message === 'Reservation failed'
                  ? t.failed
                  : message}
          </div>
        )}

        <SlotList
          slots={slots}
          prettyMethodName={prettyMethodName}
          texts={t}
          onReserve={reserve}
        />
      </div>
    </div>
  )
}

