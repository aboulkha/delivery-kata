import { all, takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

const normalizeMethods = (items = []) =>
  items.map((item) => {
    if (typeof item === 'string') {
      const label = item
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/(^|\s)([a-z])/g, (_, prefix, char) => `${prefix}${char.toUpperCase()}`)

      return { id: item, name: label }
    }

    return {
      id: item.id ?? item.name ?? item,
      name: item.name ?? item.id ?? item,
    }
  })

function* fetchMethods() {
  try {
    const res = yield call(axios.get, '/api/methods')
    yield put({ type: 'methods/set', payload: normalizeMethods(res.data) })
  } catch (e) {
    yield put({
      type: 'methods/set',
      payload: [
        { id: 'DELIVERY', name: 'Delivery' },
        { id: 'DRIVE', name: 'Drive' },
        { id: 'DELIVERY_TODAY', name: 'Delivery Today' },
        { id: 'DELIVERY_ASAP', name: 'Delivery ASAP' },
      ],
    })
  }
}

function* fetchSlots(action) {
  try {
    const { method, date } = action.payload
    const res = yield call(axios.get, '/api/slots', { params: { method, date } })
    yield put({ type: 'slots/set', payload: res.data })
  } catch (e) {
    yield put({ type: 'slots/error', payload: 'Failed to load slots' })
  }
}

function* reserveSlot(action) {
  try {
    const { customerId, slotId, method, date } = action.payload
    yield call(axios.post, '/api/reservations', { customerId, slotId, method, date })
    yield put({ type: 'slots/message', payload: 'Reservation successful' })
    yield put({ type: 'slots/fetch', payload: { method, date } })
  } catch (e) {
    const message = e.response && e.response.status === 409 ? 'Slot unavailable' : 'Reservation failed'
    yield put({ type: 'slots/message', payload: message })
    yield put({ type: 'slots/fetch', payload: { method: action.payload.method, date: action.payload.date } })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('methods/fetch', fetchMethods),
    takeLatest('slots/fetch', fetchSlots),
    takeLatest('reservations/reserve', reserveSlot),
  ])
}
