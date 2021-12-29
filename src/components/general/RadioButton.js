import classes from "./RadioButton.module.css";

const RadioButton = (props) => {
  return (
    <li className={classes.element}>
      <input
        type="radio"
        id={props.label}
        name={props.name}
        value={props.value}
        checked={props.selectedValue === props.value}
        className={classes.input}
        onChange={props.onChange}
      ></input>
      <label for={props.label}>
        {props.label} {props.children}
      </label>
    </li>
  );
};

export default RadioButton;
