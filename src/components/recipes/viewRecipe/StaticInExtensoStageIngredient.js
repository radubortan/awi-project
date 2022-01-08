import React, { Fragment, useState, useEffect } from "react";
import classes from "./../InExtensoStageIngredient.module.css";
import StaticIngredientItem from "./StaticIngredientItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config";

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
      if (ingredients) {
        for (const ingredient of ingredients) {
          addIngredientToIngredients(ingredient);
          //ingredients.push(ingredient);
        }
      }
      return [];
    };
    setIngredients(getIngredients(props.currentStage?.ingredients));
  }, [props.currentStage]);

  return (
    <Fragment>
      {props.currentStage?.ingredients.length === 0 && (
        <p className={classes.noIngredient}>Aucun ingrédient</p>
      )}
      {props.currentStage?.ingredients && (
        <div className={classes.ingredientList}>
          {ingredients.map((ingredient, index) => (
            <StaticIngredientItem ingredient={ingredient} index={index} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default InExtensoStageIngredient;
