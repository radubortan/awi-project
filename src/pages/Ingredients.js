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
import classes from './Ingredients.module.css';

function Ingredients() {
  const [ingredientList, setIngredientList] = useState([]);
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);
  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: '',
    categories: [],
    allergenCategories: [],
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch(
        'https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
      );
      const data = await response.json();
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          nomIng: data[key].nomIng,
          nomCatIng: data[key].nomCatIng,
          prixUnitaire: data[key].prixUnitaire,
          nomUnite: data[key].nomUnite,
          nomCatAllerg: data[key].nomCatAllerg,
        });
      }
      setIngredientList(loadedIngredients);
      setFilteredIngredientList(loadedIngredients);
    };
    fetchIngredients();
  }, []);

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

  const addIngredient = async (newIngredient) => {
    setIngredientList([...ingredientList, newIngredient]);
    await fetch(
      'https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(newIngredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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

  const editIngredient = async (editedIngredient, indexIngredient) => {
    ingredientList.splice(indexIngredient, 1, editedIngredient);
    setIngredientList([...ingredientList]);
    await fetch(
      `https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${editedIngredient.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(editedIngredient),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  // Delete Ingredient

  const [indexIngredientBeingDeleted, setIndexIngredientBeingDeleted] =
    useState(null);
  const [ingredientBeingDeleted, setIngredientBeingDeleted] = useState(null);

  const hideDeleteIngredientPanel = () => {
    setIndexIngredientBeingDeleted(null);
  };

  const showDeleteIngredientPanel = (indexIngredient, ingredient) => {
    setIndexIngredientBeingDeleted(indexIngredient);
    setIngredientBeingDeleted(ingredient);
  };

  const deleteIngredient = async (indexIngredient, idIngredient) => {
    ingredientList.splice(indexIngredient, 1);
    await fetch(
      `https://projet-awi-4e549-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${idIngredient}.json`,
      {
        method: 'DELETE',
      }
    );
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
      {indexIngredientBeingDeleted !== null && (
        <DeleteIngredient
          onClose={hideDeleteIngredientPanel}
          indexIngredient={indexIngredientBeingDeleted}
          ingredient={ingredientBeingDeleted}
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
          <div className='col'>
            <h1 className={classes.title}>Ingrédients</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3' />
          <div className='col-md-6 col-sm-12'>
            <SearchBar onChange={searchBarFiltering} />
          </div>
          <div className='col-md-3' />
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
          <div className='col-3 d-flex justify-content-start'>
            <Button className='addButton' onClick={showAddIngredientPanel}>
              Ajouter ingrédient
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Ingredients;
