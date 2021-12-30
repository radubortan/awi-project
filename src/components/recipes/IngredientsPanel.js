import Card from "../ui/Card";
import InExtensoStageIngredient from "./InExtensoStageIngredient";

import RecipeStageIngredient from "./RecipeStageIngredient";
function IngredientsPanel(props) {
  return (
    <Card>
      <h1>Ingrédients</h1>
      {props.currentStage.nomRecette !== undefined && (
        <RecipeStageIngredient
          currentStage={props.currentStage}
        ></RecipeStageIngredient>
      )}
      {props.currentStage.nomRecette === undefined && (
        <InExtensoStageIngredient
          currentStage={props.currentStage}
          addIngredientItem={props.addIngredientItem}
          onDeleteIngredientItem={props.onDeleteIngredientItem}
        ></InExtensoStageIngredient>
      )}
    </Card>
  );
}

export default IngredientsPanel;
