import classes from './RadioButton.module.css';

const RadioButton = (props) => {
  return (
    <li className={classes.element}>
      <input
        type='radio'
        id={props.forInput}
        name={props.inputName}
        defaultChecked={props.isChecked === 'true' ? true : false}
        className={classes.input}
      />
      <label for={props.forInput}>{props.label}</label>
    </li>
  );
};

export default RadioButton;
