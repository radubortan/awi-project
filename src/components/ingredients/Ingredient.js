import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import classes from './Ingredient.module.css';
import Button from '../general/Button';
import { CgDanger } from 'react-icons/cg';

function Ingredient(props) {
  return (
    <li
      className={classes.ingredient}
      onClick={() => {
        props.onViewIngredient(props.ingredient);
      }}
    >
      <div className={`${classes.nameColumn}`}>
        <h3 className={classes.ingredientName}>{props.ingredient.nomIng}</h3>
      </div>
      <div className={`${classes.buttonsColumn}`}>
        {props.ingredient.nomCatAllerg && (
          <div className={classes.allergeneMessage}>
            <p>Allergène</p>
          </div>
        )}
        {props.ingredient.nomCatAllerg && (
          <div className={classes.allergeneMessageSmall}>
            <CgDanger size={25} />
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
      </div>
    </li>
  );
}

export default Ingredient;
