import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './toggleCart';
import addCartSlice from './addToCart'


const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    cart: addCartSlice.reducer,
  },
})


export default store;