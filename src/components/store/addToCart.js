import { createSlice } from '@reduxjs/toolkit';

const addCartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    replaceCart(state, action){
     return  action.payload;
    },


    additem(state, action) {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...newItem, quantity: 1 })
      }

    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.find(item => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          return state.filter(item => item.id !== itemId)
        }
      }
      return state
    },
    clearCart(state) {
      return []
    }
  }
})



export const { additem, removeItem, clearCart, replaceCart } = addCartSlice.actions;
export default addCartSlice;