import React from "react";

function TextAreaInput(props) {
  return (
    <div>
      <label for={props.label}>{props.label}</label>

      <textarea
        id={props.label}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows="4"
        cols="50"
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
