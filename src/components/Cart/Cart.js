import React from 'react';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux'
import { clearCart } from '../store/addToCart';


const Cart = (props) => {
  const dispatch = useDispatch();
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem />
      </ul>
      <div style={{ textAlign:'right'}}>
        <button onClick={clearCartHandler}>Clear cart</button>
      </div>
    </Card>
  );
};

export default Cart;
