import Card from "../ui/Card";
import AddIngredientItem from "./AddIngredientItem";
import IngredientItem from "./IngredientItem";
function IngredientsPanel(props) {
  return (
    <Card>
      <h1>Ingrédients</h1>
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
    </Card>
  );
}

export default IngredientsPanel;
