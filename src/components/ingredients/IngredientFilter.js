import Card from '../ui/Card';
import CategoriesCheckBox from './CategoriesCheckBox';

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

  const ALLERGENCATEGORIES = [
    {
      nomCatAllerg: 'Crustaces',
    },
    {
        nomCatAllerg: 'Fruit a coque',
    }
  ];

  return (
    <Card>
      <CategoriesCheckBox
      name ='Catégorie'
        onChange={props.categoriesFiltering}
        categories={CATEGORIES}
        labelIdentifier = "nomCatIng"
      />
      <CategoriesCheckBox
      name ="Catégorie d'allergène"
        onChange={props.allergenCategoriesFiltering}
        categories={ALLERGENCATEGORIES}
        labelIdentifier = "nomCatAllerg"
      />

    </Card>
  );
}

export default IngredientFilter;
