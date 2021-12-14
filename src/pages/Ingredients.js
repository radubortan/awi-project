import React, { useState } from 'react';
import AddIngredientButton from '../components/ingredients/AddIngredientButton';
import Categories from '../components/ingredients/Categories';
import IngredientList from '../components/ingredients/IngredientList';
import SearchIngredientsBar from '../components/general/SearchBar';
import classes from './Ingredients.module.css';

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

  const categoriesFiltering = (listOfCheckedCategories) => {
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
    <div class='container'>
      <div class='row'>
        <SearchIngredientsBar searchBarFiltering={searchBarFiltering} />
      </div>
      <div class='row'>
        <div class='col-4'>
          <Categories categoriesFiltering={categoriesFiltering} />
        </div>
        <div class='col-6'>
          <IngredientList ingredientList={ingredientList} />
        </div>
        <div class='col-2'>
          <AddIngredientButton />
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
