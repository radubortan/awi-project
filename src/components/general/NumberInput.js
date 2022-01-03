import React, { Fragment } from 'react';
import classes from './NumberInput.module.css';

function NumberInput(props) {
  const style = props.className;

  return (
    <div className={`${style} ${classes.container}`} onClick={props.onClick}>
      <label for={props.label}>{props.label}</label>
      <input
        id={props.label}
        type='number'
        name={props.name}
        value={props.value !== null ? props.value : ''}
        onChange={props.onChange}
        className={classes.input}
      />
      {props.labelUnite ? <p>{props.labelUnite}</p> : ''}
    </div>
  );
}

export default NumberInput;
