import React, { Fragment } from "react";
import "./Button.css";

function Button(props) {
  return (
    <Fragment>
      <button onClick={props.onClick} className={`btn ${props.className}`}>
        {props.children}
      </button>
    </Fragment>
  );
}

export default Button;
