import classes from './Checkbox.module.css';

const Checkbox = (props) => {
  return (
    <li>
      <input
        className={classes.input}
        type='checkbox'
        value={props.nomCatIng}
        id={props.nomCatIng}
        onChange={props.categoriesFiltering}
      />
      <label for={props.nomCatIng}>{props.nomCatIng}</label>
    </li>
  );
};

export default Checkbox;
