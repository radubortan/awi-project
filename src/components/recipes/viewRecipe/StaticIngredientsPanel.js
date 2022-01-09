import Card from "../../ui/Card";
import StaticInExtensoStageIngredient from "./StaticInExtensoStageIngredient";
import StaticRecipeStageIngredient from "./StaticRecipeStageIngredient";
import classes from "./../IngredientsPanel.module.css";

function StaticIngredientsPanel(props) {
  return (
    <Card>
      <h1 className={classes.title}>Ingrédients</h1>
      {props.currentStage?.idRecette !== undefined && (
        <StaticRecipeStageIngredient currentStage={props.currentStage} />
      )}
      {props.currentStage?.idRecette === undefined && (
        <StaticInExtensoStageIngredient currentStage={props.currentStage} />
      )}
    </Card>
  );
}

export default StaticIngredientsPanel;
