import { createSlice } from "@reduxjs/toolkit";

const isToggle = { toggle: false }

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: isToggle,
  reducers: {
    toggle(state) {
      state.toggle = !state.toggle
    },
  }
})


export const toggleActions = toggleSlice.actions
export default toggleSlice;