import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <div>
      <button onClick={props.onClick} className={`btn ${props.className}`}>
        {props.children}
      </button>
    </div>
  );
}

export default Button;
