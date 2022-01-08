import React from "react";
import Recipe from "./Recipe";
import classes from "./RecipeList.module.css";
import { useNavigate } from "react-router-dom";

function RecipeList(props) {
  const navigate = useNavigate();
  return (
    <ul className={classes.list}>
      {props.recipeList.length === 0 && (
        <p className={classes.nothingFound}>Aucun résultat</p>
      )}
      {props.recipeList.length !== 0 &&
        props.recipeList.map((recipe) => (
          <Recipe
            recipe={recipe}
            onEditRecipe={props.onEditRecipe}
            onDeleteRecipe={props.onDeleteRecipe}
            onViewRecipe={props.onViewRecipe}
            index={props.wholeRecipeList.indexOf(recipe)}
            onClick={() => {
              navigate("/" + recipe.nomRecette);
            }}
          />
        ))}
    </ul>
  );
}

export default RecipeList;
