import React from "react";
import Recipe from "./Recipe";
import classes from "./RecipeList.module.css";

function RecipeList(props) {
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
          />
        ))}
    </ul>
  );
}

export default RecipeList;
