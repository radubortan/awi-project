import React, { Fragment, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const sortIngredients = (a, b) => {
  const textA = a.nomIng;
  const textB = b.nomIng;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function RecipeStageIngredient(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "recettes"),
      where("nomRecette", "==", props.currentStage.nomRecette)
    );
    const getRecipeById = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setRecipe(doc.data());
      });
    };
    getRecipeById();
  }, [props.currentStage.nomRecette]);
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
      {ingredientsOfRecipe.length === 0 && <p>Aucun ingrédients</p>}
      {ingredientsOfRecipe.map((ingredient) => (
        <p>
          {" "}
          - {ingredient.qte}
          {ingredient.nomUnite} {ingredient.nomIng}
        </p>
      ))}
    </Fragment>
  );
}

export default RecipeStageIngredient;
