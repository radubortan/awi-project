import classes from './SelectInput.module.css';

function SelectInput(props) {
  const style = props.className;
  return (
    <div className={style}>
      <label for={props.label}>{props.label}</label>
      <select
        name={props.name}
        id={props.label}
        onChange={props.onChange}
        className={classes.input}
      >
        <option
          selected={props.selected === 'false' ? 'true' : 'false'}
          disables
          hidden
        >
          Choisir
        </option>
        {props.dropDownList.map((item, index) => (
          <option
            value={item[props.optionIdentifier]}
            selected={props.selected === item[props.optionIdentifier]}
          >
            {item[props.optionIdentifier]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
