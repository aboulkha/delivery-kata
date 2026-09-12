import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'methods',
  initialState: { items: [], loading: false },
  reducers: {
    set(state, action) { state.items = action.payload; state.loading = false },
    fetch(state) { state.loading = true },
  },
})

export const { set, fetch } = slice.actions
export default slice.reducer
