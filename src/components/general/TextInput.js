import React, { Fragment } from 'react';
import classes from './TextInput.module.css';

function TextInput(props) {
  return (
    <Fragment>
      <label for={props.label}>{props.label}</label>
      <input
        id={props.label}
        type='text'
        name={props.name}
        value={props.value !== null ? props.value : ''}
        onChange={props.onChange}
        className={classes.input}
        placeholder={props.label}
      ></input>
    </Fragment>
  );
}

export default TextInput;
