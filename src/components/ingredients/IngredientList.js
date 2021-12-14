import React from 'react';
import Ingredient from './Ingredient';

function IngredientList(props) {
  return (
    <div class='container'>
      {props.ingredientList.map((ingredient) => (
        <Ingredient nomIng={ingredient.nomIng} />
      ))}
    </div>
  );
}

export default IngredientList;
