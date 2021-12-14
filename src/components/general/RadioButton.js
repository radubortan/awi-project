import classes from './RadioButton.module.css';

const RadioButton = (props) => {
  return (
    <li>
      <input
        className={classes.input}
        type='radio'
        class='custom-control-input'
        id={props.forInput}
        name={props.inputName}
        defaultChecked={props.isChecked === 'true' ? true : false}
      />
      <label class='custom-control-label' for={props.forInput}>
        {props.label}
      </label>
    </li>
  );
};

export default RadioButton;
