import React from "react";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import classes from "./Ingredient.module.css";

function Ingredient(props) {
  return (
    <li className={classes.ingredient}>
      <h3>{props.ingredient.nomIng}</h3>
      <div className={classes.buttons}>
        <button
          type="button"
          class="btn btn-info"
          onClick={() => {
            props.onEditIngredient(props.ingredient, props.index);
          }}
        >
          <BsPencilFill />
        </button>
        <button type="button" class="btn btn-danger">
          <BsTrashFill />
        </button>
      </div>
    </li>
  );
}

export default Ingredient;
