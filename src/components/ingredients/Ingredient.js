import React from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import classes from './Ingredient.module.css';

function Ingredient(props) {
  return (
    <li className={classes.ingredient}>
      <h3>{props.nomIng}</h3>
      <div className={classes.buttons}>
        <button type='button' class='btn btn-info'>
          <BsPencilFill />
        </button>
        <button type='button' class='btn btn-danger'>
          <BsTrashFill />
        </button>
      </div>
    </li>
  );
}

export default Ingredient;
