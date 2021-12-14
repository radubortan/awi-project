import React from 'react';
function AddIngredientButton(props) {
  return (
    <div class='container'>
      <button className='btn btn-primary'>{props.children}</button>
    </div>
  );
}

export default AddIngredientButton;
