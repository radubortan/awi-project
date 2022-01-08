import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import classes from "./Recipe.module.css";
import Button from "../general/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

function Recipe(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <li
      className={classes.recipe}
      onClick={() => {
        navigate("/" + props.recipe.idRecette);
      }}
    >
      <div
        className={`${
          authCtx.isLoggedIn ? classes.nameColumn : classes.nameColumnSmall
        }`}
      >
        <h3 className={classes.recipeName}>{props.recipe.nomRecette}</h3>
      </div>
      {authCtx.isLoggedIn && (
        <div className={`${classes.buttonsColumn}`}>
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
        </div>
      )}
    </li>
  );
}

export default Recipe;
