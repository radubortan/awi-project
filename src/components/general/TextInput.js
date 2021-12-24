import React, { Fragment } from "react";
function TextInput(props) {
  return (
    <Fragment>
      <label for={props.label}>{props.label}</label>
      <input
        id={props.label}
        type="text"
        name={props.name}
        value={props.value !== null ? props.value : ""}
        onChange={props.onChange}
      ></input>
    </Fragment>
  );
}

export default TextInput;
