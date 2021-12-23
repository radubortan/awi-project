import React from "react";
import Ingredient from "./Ingredient";
import classes from "./IngredientList.module.css";

function IngredientList(props) {
  return (
    <ul>
      {props.ingredientList.map((ingredient) => (
        <Ingredient
          ingredient={ingredient}
          onEditIngredient={props.onEditIngredient}
          onDeleteIngredient={props.onDeleteIngredient}
          onViewIngredient={props.onViewIngredient}
          index={props.wholeIngredientList.indexOf(ingredient)}
        />
      ))}
    </ul>
  );
}

export default IngredientList;
