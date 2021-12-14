import Card from '../ui/Card';
import IngredientCategoryFilter from './IngredientCategoryFilter';
import IngredientAllergeneFilter from './IngredientAllergeneFilter';

function IngredientFilter(props) {
  const CATEGORIES = [
    {
      nomCatIng: 'Fruit',
    },
    {
      nomCatIng: 'Légume',
    },
    {
      nomCatIng: 'Lait',
    },
    {
      nomCatIng: 'Poisson',
    },
  ];

  return (
    <Card>
      <IngredientCategoryFilter
        categoriesFiltering={props.categoriesFiltering}
        CATEGORIES={CATEGORIES}
      />
      <IngredientAllergeneFilter />
    </Card>
  );
}

export default IngredientFilter;
