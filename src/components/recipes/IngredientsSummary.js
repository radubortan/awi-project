import Card from './../ui/Card';
import classes from './IngredientsSummary.module.css';

function IngredientsSummary(props) {
  const allNonAllergenIngredientsRecipe = [];
  const allAllergenIngredientsRecipe = [];
  for (let ingredient of props.ingredients) {
    if (ingredient.nomCatAllerg) {
      allAllergenIngredientsRecipe.push(ingredient);
    } else {
      allNonAllergenIngredientsRecipe.push(ingredient);
    }
  }
  return (
    <Card className={classes.ingredientsCard}>
      <h1 className={classes.title}>Tous les ingrédients</h1>
      <div className={classes.normalIngredients}>
        {allNonAllergenIngredientsRecipe.length === 0 && (
          <p className={classes.nothing}>Aucun ingrédient</p>
        )}
        {allNonAllergenIngredientsRecipe.map((ingredient) => (
          <p className={classes.ingredient}>
            <span className={classes.pill}>
              {ingredient.qte}
              {ingredient.nomUnite.toLowerCase()}
            </span>
            <span className={classes.ingredientName}>{ingredient.nomIng}</span>
          </p>
        ))}
      </div>
      <Card className={classes.allergenCard}>
        <h2>Allèrgenes</h2>
        {allAllergenIngredientsRecipe.length === 0 && (
          <p className={classes.nothing}>Aucun ingrédient</p>
        )}
        {allAllergenIngredientsRecipe.map((ingredient) => (
          <p className={classes.ingredient}>
            <span className={classes.pill}>
              {ingredient.qte}
              {ingredient.nomUnite.toLowerCase()}
            </span>
            <span className={classes.ingredientName}>{ingredient.nomIng}</span>
          </p>
        ))}
      </Card>
    </Card>
  );
}

export default IngredientsSummary;
