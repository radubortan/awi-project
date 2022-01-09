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
import { HiPlus } from 'react-icons/hi';
import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function Ingredients() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);
  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: '',
    categories: [],
    allergenCategories: [],
  });

  const ingredientsCollectionRef = collection(db, 'ingredients');

  useEffect(() => {
    const getIngredients = async () => {
      const data = await getDocs(ingredientsCollectionRef);
      const loadedIngredients = [];
      data.docs.map((doc) => {
        return loadedIngredients.push({
          id: doc.id,
          nomCatIng: doc.data().nomCatIng,
          nomCatAllerg: doc.data().nomCatAllerg,
          nomIng: doc.data().nomIng,
          nomUnite: doc.data().nomUnite,
          prixUnitaire: doc.data().prixUnitaire,
          stock: doc.data().stock,
        });
      });
      setIngredientList(loadedIngredients);
      setFilteredIngredientList(loadedIngredients);
      setIsLoading(false);
    };
    getIngredients();
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

  const addIngredient = async (ingredient) => {
    let response;
    const newIngredient = { ...ingredient, stock: 0, prixUnitaire: 0 };

    //if ingredient has an allergen set
    if (newIngredient.nomCatAllerg) {
      response = await addDoc(ingredientsCollectionRef, newIngredient);
    }
    //if no allergen was set, we set an empty string
    else {
      response = await addDoc(ingredientsCollectionRef, {
        ...newIngredient,
        nomCatAllerg: '',
      });
    }
    newIngredient.id = response.id;
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

  const editIngredient = async (editedIngredient, indexIngredient) => {
    const ingredientDoc = doc(db, 'ingredients', editedIngredient.id);
    const newIngredient = { ...editedIngredient };
    delete newIngredient.id;
    if (newIngredient.nomCatAllerg) {
      await updateDoc(ingredientDoc, newIngredient);
    } else {
      const noAllergIngredient = { ...newIngredient };
      noAllergIngredient.nomCatAllerg = '';
      await updateDoc(ingredientDoc, noAllergIngredient);
    }

    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(indexIngredient, 1, editedIngredient);
    setIngredientList([...updatedIngredients]);
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
    const ingredientDoc = doc(db, 'ingredients', idIngredient);
    await deleteDoc(ingredientDoc);

    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(indexIngredient, 1);
    setIngredientList([...updatedIngredients]);
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
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
          <div className={`container-fluid ${classes.container}`}>
            <div className={classes.top}>
              <div className='row'>
                <div className='col'>
                  <h1 className={classes.title}>Ingrédients</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2 col-lg-3' />
                <div className='col-sm-12 col-md-8 col-lg-6'>
                  <SearchBar onChange={searchBarFiltering} />
                </div>
                <div className='col-md-2 col-lg-3' />
              </div>
            </div>
            <div className={classes.bottom}>
              <div className='row'>
                <div className={`col-12 col-lg-3 order-lg-3 ${classes.addBtn}`}>
                  <Button
                    className='addButton'
                    onClick={showAddIngredientPanel}
                  >
                    <HiPlus /> Ajouter ingrédient
                  </Button>
                </div>
                <div className='col-xs-12 col-md-3 order-lg-1'>
                  <IngredientFilter
                    categoriesFiltering={filterCategoryHandler}
                    allergenCategoriesFiltering={filterAllergenCategoryHandler}
                  />
                </div>
                <div className='col-xs-12 col-md-9 col-lg-6 order-lg-2'>
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
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Ingredients;
