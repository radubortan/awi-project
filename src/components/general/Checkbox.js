import { Fragment } from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => {
  return (
    <div className={props.className}>
      <input
        className={classes.input}
        type='checkbox'
        value={props.label}
        id={props.label}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label for={props.label}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
