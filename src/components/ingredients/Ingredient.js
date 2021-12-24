import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import classes from './Ingredient.module.css';
import Button from '../general/Button';

function Ingredient(props) {
  return (
    <li
      className={classes.ingredient}
      onClick={() => {
        console.log(props);
        props.onViewIngredient(props.ingredient);
      }}
    >
      <h3>{props.ingredient.nomIng}</h3>
      {props.ingredient.nomCatAllerg && (
        <div className={classes.allergeneMessage}>
          <p>Allergène</p>
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
            <BsPencilFill />
          </Button>
        </div>
        <Button
          className='cancelButton'
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteIngredient(props.index);
          }}
        >
          <BsTrashFill />
        </Button>
      </div>
    </li>
  );
}

export default Ingredient;
