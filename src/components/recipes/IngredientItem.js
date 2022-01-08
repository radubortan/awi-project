import { FaTrash } from 'react-icons/fa';
import classes from './IngredientItem.module.css';

function IngredientItem(props) {
  return (
    <div className={classes.ingredient}>
      <p className={classes.ingredientInfo}>
        <span className={classes.pill}>
          {props.ingredient.qte}
          {props.ingredient.nomUnite.toLowerCase()}
        </span>
        <span className={classes.ingredientName}>
          {props.ingredient.nomIng}
        </span>
      </p>
      {props.deletable && (
        <button
          className={classes.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteIngredientItem(props.index);
          }}
        >
          <FaTrash size={20} />
        </button>
      )}
    </div>
  );
}

export default IngredientItem;
