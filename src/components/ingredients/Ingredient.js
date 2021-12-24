import React from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import classes from './Ingredient.module.css';

function Ingredient(props) {
  return (
    <li
      className={classes.ingredient}
      onClick={() => {
        console.log(props);
        props.onViewIngredient(props.ingredient);
      }}
    >
      <h3>{props.ingredient.nomIng}</h3>
      {props.ingredient.nomCatAllerg && (
        <div className={classes.allergeneMessage}>
          <p>Allergène</p>
        </div>
      )}
      <div className={classes.buttons}>
        <button
          type='button'
          class='btn btn-info'
          onClick={(e) => {
            e.stopPropagation();
            props.onEditIngredient(props.ingredient, props.index);
          }}
        >
          <BsPencilFill />
        </button>
        <button
          type='button'
          class='btn btn-danger'
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteIngredient(props.index);
          }}
        >
          <BsTrashFill />
        </button>
      </div>
    </li>
  );
}

export default Ingredient;
