import React, { useState } from 'react';
import IngredientCategoryFilter from '../components/ingredients/IngredientFilter';
import Button from '../components/general/Button';
import IngredientList from '../components/ingredients/IngredientList';
import SearchBar from '../components/general/SearchBar';
import Card from '../components/ui/Card';

function Ingredients() {
  const INGREDIENTS = [
    {
      nomIng: 'Tomate',
      nomCatIng: 'Fruit',
    },
    {
      nomIng: 'Carotte',
      nomCatIng: 'Légume',
    },
  ];

  const [ingredientList, setIngredientList] = useState(INGREDIENTS);
  //Less prioritised filtering
  const [
    ingredientListForSearchBarFiltering,
    setingredientListForSearchBarFiltering,
  ] = useState(INGREDIENTS);
  let filteredIngredientList = [...INGREDIENTS];
  const searchBarFiltering = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = ingredientListForSearchBarFiltering.filter(
        (ingredient) => {
          return ingredient.nomIng
            .toLowerCase()
            .startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        }
      );
      setIngredientList(results);
    } else {
      setIngredientList(ingredientListForSearchBarFiltering);
      // If the text field is empty, show all users
    }
  };

  const filterCategoryHandler = (listOfCheckedCategories) => {
    console.log(listOfCheckedCategories);
    if (listOfCheckedCategories.length !== 0) {
      const results = INGREDIENTS.filter((ingredient) => {
        return listOfCheckedCategories.includes(ingredient.nomCatIng);
      });
      setingredientListForSearchBarFiltering(results);
      setIngredientList(results);
    } else {
      setingredientListForSearchBarFiltering(INGREDIENTS);
      setIngredientList(INGREDIENTS);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <SearchBar searchBarFiltering={searchBarFiltering} />
        </div>
        <div className='col-3'></div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <IngredientCategoryFilter
            categoriesFiltering={filterCategoryHandler}
          />
        </div>
        <div className='col-6'>
          <Card>
            <IngredientList ingredientList={ingredientList} />
          </Card>
        </div>
        <div className='col-3'>
          <Button>Ajouter ingrédient</Button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
