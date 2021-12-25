import React from 'react';
import Ingredient from './Ingredient';
import classes from './IngredientList.module.css';

function IngredientList(props) {
  return (
    <ul className={classes.list}>
      {props.ingredientList.length === 0 && (
        <p className={classes.nothingFound}>Aucun résultat</p>
      )}
      {props.ingredientList.length !== 0 &&
        props.ingredientList.map((ingredient) => (
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
