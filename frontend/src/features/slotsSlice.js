import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'slots',
  initialState: { items: [], loading: false, error: null, message: null },
  reducers: {
    set(state, action) { state.items = action.payload; state.loading = false; state.error = null; state.message = null },
    fetch(state) { state.loading = true; state.error = null; state.message = null },
    error(state, action) { state.error = action.payload; state.loading = false },
    message(state, action) { state.message = action.payload; state.loading = false },
  },
})

export const { set, fetch, error, message } = slice.actions
export default slice.reducer
