import Card from "./../ui/Card";

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
    <Card>
      <h1>Tous les ingrédients</h1>
      <div className="row">
        <div className="col">
          {allNonAllergenIngredientsRecipe.length === 0 && (
            <p>Aucun ingredients</p>
          )}
          {allNonAllergenIngredientsRecipe.map((ingredient) => (
            <p>
              {" "}
              - {ingredient.qte}
              {ingredient.nomUnite} {ingredient.nomIng}
            </p>
          ))}
        </div>
        <div className="col">
          <Card>
            <h2>Allèrgenes</h2>
            {allAllergenIngredientsRecipe.length === 0 && (
              <p>Aucun ingredients</p>
            )}
            {allAllergenIngredientsRecipe.map((ingredient) => (
              <p>
                {" "}
                - {ingredient.qte}
                {ingredient.nomUnite} {ingredient.nomIng}
              </p>
            ))}
          </Card>
        </div>
      </div>
    </Card>
  );
}

export default IngredientsSummary;
