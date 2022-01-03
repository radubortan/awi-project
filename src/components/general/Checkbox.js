import classes from './Checkbox.module.css';

const Checkbox = (props) => {
  const style = props.className;
  return (
    <div className={style}>
      <input
        className={classes.input}
        type='checkbox'
        value={props.label}
        id={props.label}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
