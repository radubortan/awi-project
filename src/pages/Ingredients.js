import React, { useEffect, useState } from 'react';
import IngredientFilter from '../components/ingredients/IngredientFilter';
import Button from '../components/general/Button';
import IngredientList from '../components/ingredients/IngredientList';
import AddIngredient from '../components/ingredients/AddIngredient';
import EditIngredient from '../components/ingredients/EditIngredient';
import SearchBar from '../components/general/SearchBar';
import Card from '../components/ui/Card';
import { Fragment } from 'react/cjs/react.production.min';
import DeleteIngredient from '../components/ingredients/DeleteIngredient';
import ViewIngredient from '../components/ingredients/ViewIngredient';

function Ingredients() {
  let INGREDIENTS = [
    {
      nomIng: 'Tomate',
      nomCatIng: 'Fruit',
      prixUnitaire: 2,
      nomUnite: 'g',
    },
    {
      nomIng: 'Carotte',
      nomCatIng: 'Légume',
      prixUnitaire: 1,
      nomUnite: 'g',
    },
  ];

  const [ingredientList, setIngredientList] = useState(INGREDIENTS);
  const [filteredIngredientList, setFilteredIngredientList] =
    useState(INGREDIENTS);
  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: '',
    categories: [],
    allergenCategories: [],
  });

  //Filtering method

  const filterIngredient = (ingredient) => {
    const { patternToMatch, categories, allergenCategories } = filteringOptions;
    if (
      patternToMatch !== '' &&
      !ingredient.nomIng.toLowerCase().startsWith(patternToMatch.toLowerCase())
    ) {
      return false;
    }
    if (categories.length !== 0 && !categories.includes(ingredient.nomCatIng)) {
      return false;
    }
    if (
      allergenCategories.length !== 0 &&
      !allergenCategories.includes(ingredient.nomCatAllerg)
    ) {
      return false;
    }
    return true;
  };

  const filterIngredients = () => {
    const filteredList = ingredientList.filter(filterIngredient);
    setFilteredIngredientList(filteredList);
  };

  const searchBarFiltering = (e) => {
    filteringOptions.patternToMatch = e.target.value;
    setFilteringOptions(filteringOptions);

    filterIngredients();
  };

  const filterCategoryHandler = (checkedCategories) => {
    filteringOptions.categories = checkedCategories;
    setFilteringOptions(filteringOptions);
    filterIngredients();
  };

  const filterAllergenCategoryHandler = (checkedAllergenCategories) => {
    filteringOptions.allergenCategories = checkedAllergenCategories;
    setFilteringOptions(filteringOptions);
    filterIngredients();
  };

  // Add Ingredient
  const [onAddIngredient, setOnAddIngredient] = useState(false);

  const hideAddIngredientPanel = () => {
    setOnAddIngredient(false);
  };

  const showAddIngredientPanel = () => {
    setOnAddIngredient(true);
  };

  const addIngredient = (newIngredient) => {
    setIngredientList([...ingredientList, newIngredient]);
  };

  useEffect(() => {
    filterIngredients();
  }, [ingredientList]);

  // Edit Ingredient

  const [onEditIngredient, setOnEditIngredient] = useState(null);

  const hideEditIngredientPanel = () => {
    setOnEditIngredient(null);
  };

  const showEditIngredientPanel = (ingredient, index) => {
    const ingredientInfo = {
      ingredient: ingredient,
      index: index,
    };
    setOnEditIngredient(ingredientInfo);
  };

  const editIngredient = (editedIngredient, indexIngredient) => {
    ingredientList.splice(indexIngredient, 1, editedIngredient);
    setIngredientList([...ingredientList]);
  };

  // Delete Ingredient

  const [onDeleteIngredient, setOnDeleteIngredient] = useState(null);

  const hideDeleteIngredientPanel = () => {
    setOnDeleteIngredient(null);
  };

  const showDeleteIngredientPanel = (indexIngredient) => {
    setOnDeleteIngredient(indexIngredient);
  };

  const deleteIngredient = (indexIngredient) => {
    ingredientList.splice(indexIngredient, 1);
    setIngredientList([...ingredientList]);
  };

  // View Ingredient

  const [onViewIngredient, setOnViewIngredient] = useState(null);

  const hideViewIngredientPanel = () => {
    setOnViewIngredient(null);
  };

  const showViewIngredientPanel = (ingredient) => {
    setOnViewIngredient(ingredient);
  };

  return (
    <Fragment>
      {onAddIngredient && (
        <AddIngredient
          onClose={hideAddIngredientPanel}
          addIngredient={addIngredient}
          ingredientList={ingredientList}
        />
      )}
      {onEditIngredient && (
        <EditIngredient
          onClose={hideEditIngredientPanel}
          ingredientInfo={onEditIngredient}
          editIngredient={editIngredient}
          ingredientList={ingredientList}
        />
      )}
      {onDeleteIngredient !== null && (
        <DeleteIngredient
          onClose={hideDeleteIngredientPanel}
          indexIngredient={onDeleteIngredient}
          onDeleteIngredient={deleteIngredient}
        />
      )}
      {onViewIngredient && (
        <ViewIngredient
          onClose={hideViewIngredientPanel}
          ingredient={onViewIngredient}
        />
      )}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3' />
          <div className='col-6'>
            <SearchBar onChange={searchBarFiltering} />
          </div>
          <div className='col-3' />
        </div>
        <div className='row'>
          <div className='col-3'>
            <IngredientFilter
              categoriesFiltering={filterCategoryHandler}
              allergenCategoriesFiltering={filterAllergenCategoryHandler}
            />
          </div>
          <div className='col-6'>
            <Card>
              <IngredientList
                ingredientList={filteredIngredientList}
                wholeIngredientList={ingredientList}
                onEditIngredient={showEditIngredientPanel}
                onDeleteIngredient={showDeleteIngredientPanel}
                onViewIngredient={showViewIngredientPanel}
              />
            </Card>
          </div>
          <div className='col-3'>
            <Button onClick={showAddIngredientPanel}>Ajouter ingrédient</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Ingredients;
