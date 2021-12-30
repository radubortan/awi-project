import Card from '../ui/Card';
import CategoriesCheckBox from '../general/CategoriesCheckBox';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const sortAllergens = (a, b) => {
  const textA = a.nomCatAllerg;
  const textB = b.nomCatAllerg;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
const sortIngredientCategories = (a, b) => {
  const textA = a.nomCatIng;
  const textB = b.nomCatIng;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function IngredientFilter(props) {
  const [categories, setCategories] = useState([]);
  const [allergenCategories, setAllergenCategories] = useState([]);

  const ingredientCategoriesCollectionRef = collection(
    db,
    'ingredientCategories'
  );
  const allergenCollectionRef = collection(db, 'allergens');

  //fetching ingredient and allergen categories
  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(ingredientCategoriesCollectionRef);
      const loadedCategories = [];
      data.docs.map((doc) => {
        return loadedCategories.push({
          nomCatIng: doc.data().nomCatIng,
        });
      });
      loadedCategories.sort(sortIngredientCategories);
      setCategories(loadedCategories);
    };

    const getAllergen = async () => {
      const data = await getDocs(allergenCollectionRef);
      const loadedAllergens = [];
      data.docs.map((doc) => {
        return loadedAllergens.push({
          nomCatAllerg: doc.data().nomCatAllerg,
        });
      });
      loadedAllergens.sort(sortAllergens);
      setAllergenCategories(loadedAllergens);
    };
    getCategories();
    getAllergen();
  }, []);

  return (
    <Card>
      <div className='row'>
        <div className='col-6 col-sm-6 col-md-12'>
          <CategoriesCheckBox
            name='Catégorie'
            onChange={props.categoriesFiltering}
            categories={categories}
            labelIdentifier='nomCatIng'
          />
        </div>
        <div className='col-6 col-sm-6 col-md-12'>
          <CategoriesCheckBox
            name="Catégorie d'allergène"
            onChange={props.allergenCategoriesFiltering}
            categories={allergenCategories}
            labelIdentifier='nomCatAllerg'
          />
        </div>
      </div>
    </Card>
  );
}

export default IngredientFilter;
