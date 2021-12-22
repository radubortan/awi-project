function SelectInput(props) {
  return (
    <div>
      <label for={props.label}>{props.label}</label>
      <select
        name={props.name}
        id={props.label}
        onChange={props.onChange}
        selected={
          props.selected !== null ? props.selected : props.dropDownList[0]
        }
      >
        {props.dropDownList.map((item, index) => (
          <option value={item[props.optionIdentifier]} selected={index === 0}>
            {item[props.optionIdentifier]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
