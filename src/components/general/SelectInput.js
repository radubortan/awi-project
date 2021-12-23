function SelectInput(props) {
  console.log(props);
  return (
    <div>
      <label for={props.label}>{props.label}</label>
      <select name={props.name} id={props.label} onChange={props.onChange}>
        {props.dropDownList.map((item, index) => (
          <option
            value={item[props.optionIdentifier]}
            selected={props.selected == item[props.optionIdentifier]}
          >
            {item[props.optionIdentifier]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
