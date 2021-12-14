import React from 'react';
import Ingredient from './Ingredient';
import classes from './IngredientList.module.css';

function IngredientList(props) {
  return (
    <ul>
      {props.ingredientList.map((ingredient) => (
        <Ingredient nomIng={ingredient.nomIng} />
      ))}
    </ul>
  );
}

export default IngredientList;
