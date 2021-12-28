import React from 'react';
import classes from './StockList.module.css';
import StockItem from './StockItem';

function StockList(props) {
  return (
    <ul className={classes.list}>
      {props.ingredientList.length === 0 && (
        <p className={classes.nothingFound}>Aucun ingrédient</p>
      )}
      {props.ingredientList.length !== 0 &&
        props.ingredientList.map((ingredient) => (
          <StockItem
            ingredient={ingredient}
            onIncreaseStock={props.onIncreaseStock}
            onDecreaseStock={props.onDecreaseStock}
            onViewIngredient={props.onViewIngredient}
            index={props.wholeIngredientList.indexOf(ingredient)}
          />
        ))}
    </ul>
  );
}

export default StockList;
