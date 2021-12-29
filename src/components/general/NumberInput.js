import React, { Fragment } from "react";
import classes from "./NumberInput.module.css";

function NumberInput(props) {
  return (
    <Fragment>
      <label for={props.label}>{props.label}</label>
      <input
        id={props.label}
        type="number"
        name={props.name}
        value={props.value !== null ? props.value : ""}
        onChange={props.onChange}
        className={classes.input}
      ></input>
      {props.labelUnite ? props.labelUnite : ""}
    </Fragment>
  );
}

export default NumberInput;
