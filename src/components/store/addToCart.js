import { createSlice } from '@reduxjs/toolkit';
import { toggleActions } from './toggleCart';

const addCartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
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



export const sendCartData = (products) => {
  return async (dispatch) => {
    dispatch(
      toggleActions.showNotification({
        stattus: 'pending',
        title: 'Sending',
        message: 'Sending cart data!'
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://react-http-7cf50-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(products),
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }
    try {
      await sendRequest();

      dispatch(toggleActions.showNotification({
        stattus: 'succes',
        title: 'Succes',
        message: 'Sending cart data successfully'
      }))
    } catch (error) {
      dispatch(toggleActions.showNotification({
        stattus: 'error',
        title: 'Error',
        message: 'Sending cart data Failed'
      }))
    }





  }
}

export const { additem, removeItem, clearCart } = addCartSlice.actions;
export default addCartSlice;