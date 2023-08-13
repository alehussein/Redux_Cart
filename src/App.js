import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Fragment } from 'react';
import Notification from './components/UI/Notifications';
import { sendCartData } from './components/store/addToCart';

let isInitial = true;

function App() {
  const toggle = useSelector(state => state.toggle.toggle);
  const products = useSelector(state => state.cart);
  const notification = useSelector(state => state.toggle.notification)
  const dispatch = useDispatch();


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return
    }
    dispatch(sendCartData(products))
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
