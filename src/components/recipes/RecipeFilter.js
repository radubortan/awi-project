import Card from '../ui/Card';
import CategoriesCheckBox from '../general/CategoriesCheckBox';

function RecipeFilter(props) {
  const CATEGORIES = [
    {
      nomCatRecipe: 'Entrée',
    },
    {
      nomCatRecipe: 'Principal',
    },
    {
      nomCatRecipe: 'Dessert',
    },
  ];

  const INGREDIENTS = [
    {
      nomIng: 'Tomate',
    },
    {
      nomIng: 'Carotte',
    },
  ];

  return (
    <Card>
      <CategoriesCheckBox
        name='Catégorie repas'
        onChange={props.categoriesFiltering}
        categories={CATEGORIES}
        labelIdentifier='nomCatRecipe'
      />
      <CategoriesCheckBox
        name='Ingrédients'
        onChange={props.ingredientsFiltering}
        categories={INGREDIENTS}
        labelIdentifier='nomIng'
      />
    </Card>
  );
}

export default RecipeFilter;
