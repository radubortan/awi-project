import { Fragment } from "react";
import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  return (
    <Fragment>
      <input
        className={classes.input}
        type="checkbox"
        value={props.label}
        id={props.label}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label for={props.label}>{props.label}</label>
    </Fragment>
  );
};

export default Checkbox;
