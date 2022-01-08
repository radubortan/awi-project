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
          setIngredients(getIngredients(doc.data().stages));
          // doc.data() is never undefined for query doc snapshots
          setRecipe(doc.data());
        });
      };
      getRecipeById();
    }
  }, [props.currentStage.idRecette]);

  const addIngredientToIngredients = async (ingredient) => {
    const q = query(
      collection(db, "ingredients"),
      where("__name__", "==", ingredient.idIng)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const fetchedIngredient = doc.data();
      setIngredients((prevState) => {
        return [
          ...prevState,
          {
            ...ingredient,
            nomIng: fetchedIngredient.nomIng,
            prixUnitaire: fetchedIngredient.prixUnitaire,
          },
        ];
      });
    });
  };

  const [ingredients, setIngredients] = useState([]);

  const getIngredients = (stages) => {
    for (const stage of stages) {
      for (const ingredient of stage.ingredients) {
        addIngredientToIngredients(ingredient);
        //ingredients.push(ingredient);
      }
    }
    return [];
  };

  return (
    <Fragment>
      {ingredients.length === 0 && (
        <p className={classes.noIngredient}>Aucun ingrédient</p>
      )}
      <div className={classes.ingredientList}>
        {ingredients.map((ingredient) => (
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
