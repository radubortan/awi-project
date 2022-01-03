import Card from '../ui/Card';
import InExtensoStageIngredient from './InExtensoStageIngredient';
import RecipeStageIngredient from './RecipeStageIngredient';
import classes from './IngredientsPanel.module.css';

function IngredientsPanel(props) {
  return (
    <Card>
      <h1 className={classes.title}>Ingrédients</h1>
      {props.currentStage.nomRecette !== undefined && (
        <RecipeStageIngredient currentStage={props.currentStage} />
      )}
      {props.currentStage.nomRecette === undefined && (
        <InExtensoStageIngredient
          currentStage={props.currentStage}
          addIngredientItem={props.addIngredientItem}
          onDeleteIngredientItem={props.onDeleteIngredientItem}
        />
      )}
    </Card>
  );
}

export default IngredientsPanel;
