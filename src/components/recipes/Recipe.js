import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import classes from "./Recipe.module.css";
import Button from "../general/Button";

function Recipe(props) {
  return (
    <li
      className={classes.recipe}
      onClick={() => {
        props.onViewRecipe(props.recipe);
      }}
    >
      <h3>{props.recipe.nomRecette}</h3>
      <div className={classes.buttons}>
        <div className={classes.btnSpacing}>
          <Button
            className="addButton"
            onClick={(e) => {
              e.stopPropagation();
              props.onEditRecipe(props.recipe, props.index);
            }}
          >
            <MdModeEdit />
          </Button>
        </div>
        <Button
          className="cancelButton"
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteRecipe(props.index, props.recipe);
          }}
        >
          <FaTrash />
        </Button>
      </div>
    </li>
  );
}

export default Recipe;
