import React, { Fragment } from 'react';
import IngredientItem from './IngredientItem';
import AddIngredientItem from './AddIngredientItem';
import classes from './InExtensoStageIngredient.module.css';

function InExtensoStageIngredient(props) {
  return (
    <Fragment>
      {props.currentStage.ingredients.length === 0 && (
        <p className={classes.noIngredient}>Aucun ingrédient</p>
      )}
      {props.currentStage.ingredients && (
        <div className={classes.ingredientList}>
          {props.currentStage.ingredients.map((ingredient, index) => (
            <IngredientItem
              ingredient={ingredient}
              index={index}
              onDeleteIngredientItem={props.onDeleteIngredientItem}
            />
          ))}
        </div>
      )}
      <AddIngredientItem addIngredientItem={props.addIngredientItem} />
    </Fragment>
  );
}

export default InExtensoStageIngredient;
