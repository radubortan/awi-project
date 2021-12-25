import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import classes from './Recipe.module.css';
import Button from '../general/Button';

function Recipe(props) {
  return (
    <li
      className={classes.recipe}
      onClick={() => {
        props.onViewRecipe(props.recipe);
      }}
    >
      <h3>{props.recipe.nomRecipe}</h3>
      <div className={classes.buttons}>
        <div className={classes.btnSpacing}>
          <Button
            className='addButton'
            onClick={(e) => {
              e.stopPropagation();
              props.onEditRecipe(props.recipe, props.index);
            }}
          >
            <BsPencilFill />
          </Button>
        </div>
        <Button
          className='cancelButton'
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteRecipe(props.index);
          }}
        >
          <BsTrashFill />
        </Button>
      </div>
    </li>
  );
}

export default Recipe;
