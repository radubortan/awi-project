import React, { Fragment } from "react";
import IngredientItem from "./IngredientItem";
import AddIngredientItem from "./AddIngredientItem";

function InExtensoStageIngredient(props) {
  return (
    <Fragment>
      {props.currentStage.ingredients.length === 0 && <p>Aucun ingrédients</p>}
      {props.currentStage.ingredients &&
        props.currentStage.ingredients.map((ingredient, index) => (
          <IngredientItem
            ingredient={ingredient}
            index={index}
            onDeleteIngredientItem={props.onDeleteIngredientItem}
          ></IngredientItem>
        ))}
      <AddIngredientItem
        addIngredientItem={props.addIngredientItem}
      ></AddIngredientItem>
    </Fragment>
  );
}

export default InExtensoStageIngredient;
