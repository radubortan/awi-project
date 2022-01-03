import React from 'react';

function TextAreaInput(props) {
  const style = props.className;

  return (
    <div className={style}>
      <label for={props.label}>{props.label}</label>
      <textarea
        id={props.label}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
