import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { CgDanger } from 'react-icons/cg';
import classes from './Ingredient.module.css';
import Button from '../general/Button';

function Ingredient(props) {
  return (
    <li
      className={classes.ingredient}
      onClick={() => {
        props.onViewIngredient(props.ingredient);
      }}
    >
      <h3>{props.ingredient.nomIng}</h3>
      {props.ingredient.nomCatAllerg && (
        <div className={classes.allergeneMessage}>
          <p>Allergène</p>
        </div>
      )}
      {props.ingredient.nomCatAllerg && (
        <div className={classes.allergeneMessageSmall}>
          <p>
            <CgDanger />
          </p>
        </div>
      )}
      <div className={classes.buttons}>
        <div className={classes.btnSpacing}>
          <Button
            className='addButton'
            onClick={(e) => {
              e.stopPropagation();
              props.onEditIngredient(props.ingredient, props.index);
            }}
          >
            <MdModeEdit />
          </Button>
        </div>
        <Button
          className='cancelButton'
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteIngredient(props.index, props.ingredient);
          }}
        >
          <FaTrash />
        </Button>
      </div>
    </li>
  );
}

export default Ingredient;
