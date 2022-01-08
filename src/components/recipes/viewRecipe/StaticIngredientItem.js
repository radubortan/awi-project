import { FaTrash } from "react-icons/fa";
import classes from "./../IngredientItem.module.css";

function StaticIngredientItem(props) {
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
    </div>
  );
}

export default StaticIngredientItem;
