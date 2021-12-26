import { Fragment } from 'react';
import classes from './SelectInput.module.css';

function SelectInput(props) {
  return (
    <Fragment>
      <label for={props.label}>{props.label}</label>
      <select
        name={props.name}
        id={props.label}
        onChange={props.onChange}
        className={classes.input}
      >
        <option selected={props.selected ? false : true} disables hidden>
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
    </Fragment>
  );
}

export default SelectInput;
