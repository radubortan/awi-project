import React, { Fragment, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import classes from "./RecipeStageIngredient.module.css";

const sortIngredients = (a, b) => {
  const textA = a.nomIng;
  const textB = b.nomIng;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function RecipeStageIngredient(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (props.currentStage.idRecette) {
      const q = query(
        collection(db, "recettes"),
        where("__name__", "==", props.currentStage.idRecette)
      );
      const getRecipeById = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setRecipe(doc.data());
        });
      };
      getRecipeById();
    }
  }, [props.currentStage.idRecette]);
  const ingredientsOfRecipe = [];
  if (recipe) {
    for (const stage of recipe.stages) {
      for (const ingredient of stage.ingredients) {
        ingredientsOfRecipe.push(ingredient);
      }
    }
    ingredientsOfRecipe.sort(sortIngredients);
  }

  return (
    <Fragment>
      {ingredientsOfRecipe.length === 0 && (
        <p className={classes.noIngredient}>Aucun ingrédient</p>
      )}
      <div className={classes.ingredientList}>
        {ingredientsOfRecipe.map((ingredient) => (
          <p className={classes.ingredient}>
            <span className={classes.pill}>
              {ingredient.qte}
              {ingredient.nomUnite.toLowerCase()}
            </span>
            <span className={classes.ingredientName}>{ingredient.nomIng}</span>
          </p>
        ))}
      </div>
    </Fragment>
  );
}

export default RecipeStageIngredient;
