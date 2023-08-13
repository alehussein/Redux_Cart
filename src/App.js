import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { toggleActions } from './components/store/toggleCart';
import { Fragment } from 'react';
import Notification from './components/UI/Notifications';

let isInitial = true;

function App() {
  const toggle = useSelector(state => state.toggle.toggle);
  const products = useSelector(state => state.cart);
  const notification = useSelector(state => state.toggle.notification)
  const dispatch = useDispatch();


  useEffect(() => {
    const sendCartData = async () => {
      dispatch(toggleActions.showNotification({
        stattus: 'pending',
        title: 'Sending',
        message: 'Sending cart data!'
      }))
      const response = await fetch('https://react-http-7cf50-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(products),
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }

      dispatch(toggleActions.showNotification({
        stattus: 'succes',
        title: 'Succes',
        message: 'Sending cart data successfully'
      }))
    };

    if(isInitial){
      isInitial = false
      return;
    }

    sendCartData().catch(error => {
      dispatch(toggleActions.showNotification({
        stattus: 'error',
        title: 'Error',
        message: 'Sending cart data Failed'
      }))
    });

  }, [products, dispatch])



  return (
    <Fragment>
      {notification && (
      <Notification 
      status={notification.status} 
      title={notification.title} 
      message={notification.message}
      />)}
    <Layout >
      {!toggle && <Cart />}
      <Products />
    </Layout>
    </Fragment>

  );
}

export default App;
