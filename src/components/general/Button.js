import React from 'react';
import classes from './Button.module.css';

function Button(props) {
  const externalStyle = props.style;
  const style = props.className;
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`${classes[style]} btn ${externalStyle}`}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Button;
