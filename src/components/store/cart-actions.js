import { toggleActions } from "./toggleCart";
import { replaceCart } from "./addToCart";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
    const response = await fetch('https://react-http-7cf50-default-rtdb.firebaseio.com/cart.json')
    

    if(!response.ok){
      throw new Error('Error reciving data')
    }
    const data = await response.json()

    return data
  };
  try{
    const cartData = await fetchData();
    dispatch(replaceCart(cartData)) /// OJO


  }catch(error){
    dispatch(toggleActions.showNotification({
      stattus: 'error',
      title: 'Error',
      message: 'Sending cart data Failed'
    }))
  }
}
}



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