import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import products from '../../Data/products';
import {useDispatch} from 'react-redux'
import { additem } from '../store/addToCart';

const ProductItem = (props) => {
  // const { title, price, description } = props;

  const dispatch = useDispatch();
  const addItemHandler = (product) => {
    dispatch(additem(product))
  }

  const mapProtucts = products.map((product) => {
    return(
      <li className={classes.item} key={product.id}>
      <Card>
        <header>
          <h3>{product.title}</h3>
          <div className={classes.price}>${ product.price.toFixed(2)}</div>
        </header>
        <p>{product.description}</p>
        <div className={classes.actions}>
          <button onClick={() => addItemHandler(product)}>Add to Cart</button>
        </div>
      </Card>
    </li>
    )
  })


  return (
    mapProtucts
  );
};

export default ProductItem;
