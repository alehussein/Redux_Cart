import classes from './CartItem.module.css';
import { useSelector, useDispatch } from "react-redux";
import { additem, removeItem } from '../store/addToCart';

const CartItem = (props) => {
  // const { title, quantity, total, price } = props.item;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeItemHandler = (itemId)=>{
    dispatch(removeItem(itemId))
  }

  const addItemHandler = (product) => {
    dispatch(additem(product))
  }

  const calculateTotal = () => {
    if(!cartItems){
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
  };


  const mapItemsCart = cartItems.map((items, idx) => {
    return(
     <li key={idx} className={classes.item}>
      <header>
        <h3>{items.title}</h3>
        <div className={classes.price}>
          {/* ${items.total.toFixed(2)}{' '} */}
          <span className={classes.itemprice}>(${items.price.toFixed(2) * items.quantity}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{items.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => removeItemHandler(items.id)}>-</button>
          <button onClick={() => addItemHandler(items)}>+</button>
        </div>
      </div>
    </li>
    )
  })

  return (
    <div>
    <ul className={classes.cart}>{mapItemsCart}</ul>
    <div className={classes.total}>
      {calculateTotal() !==0 && <span>Total: ${calculateTotal().toFixed(2)}</span>}
      
    </div>
  </div>
  );
};

export default CartItem;
