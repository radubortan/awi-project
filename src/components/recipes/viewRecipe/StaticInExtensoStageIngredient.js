import React, { Fragment, useState } from "react";
import IngredientItem from "./IngredientItem";
import AddIngredientItem from "./AddIngredientItem";
import classes from "./InExtensoStageIngredient.module.css";

function InExtensoStageIngredient(props) {
  const [ingredients, setIngredients] = useState([]);

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
          },
        ];
      });
    });
  };

  useEffect(() => {
    const getIngredients = (ingredients) => {
      for (const ingredient of ingredients) {
        addIngredientToIngredients(ingredient);
        //ingredients.push(ingredient);
      }
    };
    getIngredients(props.currentStage.ingredients);
  }, [props.currentStage]);

  return (
    <Fragment>
      {props.currentStage.ingredients.length === 0 && (
        <p className={classes.noIngredient}>Aucun ingrédient</p>
      )}
      {props.currentStage.ingredients && (
        <div className={classes.ingredientList}>
          {ingredients.map((ingredient, index) => (
            <IngredientItem ingredient={ingredient} index={index} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default InExtensoStageIngredient;
