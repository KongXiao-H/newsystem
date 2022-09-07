import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search_result',
  initialState: {
    value: [],
  },
  reducers: {
    setResult: (state,actions) => {
      state.value=actions.payload;
    },
  },
})

export const { setResult } = searchSlice.actions

export default searchSlice.reducer