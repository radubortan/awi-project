import React from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

function Ingredient(props) {
  return (
    <div class='container card'>
      <div class='row'>
        <div class='col align-items-center'>{props.nomIng}</div>
        <div class='col'>
          <button type='button' class='btn btn-info'>
            <BsPencilFill />
          </button>
        </div>
        <div class='col'>
          <button type='button' class='btn btn-danger'>
            <BsTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
