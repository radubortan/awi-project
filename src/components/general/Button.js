import React from 'react';
function Button(props) {
  return (
    <div class='container'>
      <button onClick={props.onClick} className='btn btn-primary'>{props.children}</button>
    </div>
  );
}

export default Button;
