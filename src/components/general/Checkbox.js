const Checkbox = (props) => {
  return (
    <li class='form-check'>
      <input
        class='form-check-input'
        type='checkbox'
        value={props.nomCatIng}
        id={props.nomCatIng}
        onChange={props.categoriesFiltering}
      />
      <label class='form-check-label' for={props.nomCatIng}>
        {props.nomCatIng}
      </label>
    </li>
  );
};

export default Checkbox;
