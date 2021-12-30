import React from 'react';
import classes from './Button.module.css';

function Button(props) {
  const style = props.className;
  return (
    <div>
      <button onClick={props.onClick} className={`${classes[style]} btn`}>
        {props.children}
      </button>
    </div>
  );
}

export default Button;
