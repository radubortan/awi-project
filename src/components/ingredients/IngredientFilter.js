import Card from '../ui/Card';
import CategoriesCheckBox from '../general/CategoriesCheckBox';
import { useEffect, useState } from 'react';

function IngredientFilter(props) {
  const [categories, setCategories] = useState([]);
  const [allergenCategories, setAllergenCategories] = useState([]);

  //fetching ingredient and allergen categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/ingredientCategory.json'
      );
      const data = await response.json();
      const loadedCategories = [];
      for (const key in data) {
        loadedCategories.push({ nomCatIng: data[key] });
      }
      setCategories(loadedCategories);
    };
    const fetchAllergen = async () => {
      const response = await fetch(
        'https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/allergen.json'
      );
      const data = await response.json();
      const loadedAllergen = [];
      for (const key in data) {
        loadedAllergen.push({ nomCatAllerg: data[key] });
      }
      setAllergenCategories(loadedAllergen);
    };
    fetchCategories();
    fetchAllergen();
  }, []);

  return (
    <Card>
      <CategoriesCheckBox
        name='Catégorie'
        onChange={props.categoriesFiltering}
        categories={categories}
        labelIdentifier='nomCatIng'
      />
      <CategoriesCheckBox
        name="Catégorie d'allergène"
        onChange={props.allergenCategoriesFiltering}
        categories={allergenCategories}
        labelIdentifier='nomCatAllerg'
      />
    </Card>
  );
}

export default IngredientFilter;
