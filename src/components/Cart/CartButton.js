import { useDispatch, useSelector } from 'react-redux';
import { toggleActions } from '../store/toggleCart';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  
  const toggleHandler = () =>{
    dispatch(toggleActions.toggle())
  }

  const totalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems()}</span>
    </button>
  );
};

export default CartButton;
