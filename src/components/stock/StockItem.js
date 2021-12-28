import classes from './StockItem.module.css';
import Button from '../general/Button';
import { HiPlus, HiMinus } from 'react-icons/hi';

function StockItem(props) {
  return (
    <li
      className={classes.ingredient}
      onClick={() => {
        props.onViewIngredient(props.ingredient);
      }}
    >
      <div className={`${classes.nameColumn}`}>
        <h3 className={classes.ingredientName}>{props.ingredient.nomIng}</h3>
      </div>
      <div className={`${classes.buttonsColumn}`}>
        {props.ingredient.nomCatAllerg && (
          <div className={classes.allergeneMessage}>
            <p>Allergène</p>
          </div>
        )}
        <div className={classes.buttons}>
          <Button
            className='addButton'
            onClick={(e) => {
              e.stopPropagation();
              props.onDecreaseStock(props.ingredient, props.index);
            }}
          >
            <HiMinus />
          </Button>
          <div
            className={classes.stockAmount}
          >{`${props.ingredient.stock} ${props.ingredient.nomUnite}`}</div>
          <Button
            className='addButton'
            onClick={(e) => {
              e.stopPropagation();
              props.onIncreaseStock(props.ingredient, props.index);
            }}
          >
            <HiPlus />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default StockItem;
