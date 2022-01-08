import React, { useEffect, useState } from 'react';
import IngredientFilter from '../components/ingredients/IngredientFilter';
import SearchBar from '../components/general/SearchBar';
import Card from '../components/ui/Card';
import { Fragment } from 'react/cjs/react.production.min';
import ViewStock from '../components/stock/ViewStock';
import classes from './Stocks.module.css';
import StockList from '../components/stock/StockList';
import { db } from '../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import ModifyStock from '../components/stock/ModifyStock';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function Stocks() {
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

  // View Ingredient
  const [onViewStock, setOnViewStock] = useState(null);

  const hideViewStockPanel = () => {
    setOnViewStock(null);
  };

  const showViewStockPanel = (ingredient) => {
    setOnViewStock(ingredient);
  };

  //Increase Stock
  const [onIncreaseStock, setOnIncreaseStock] = useState(null);
  const hideIncreaseStockPanel = () => {
    setOnIncreaseStock(null);
  };

  const showIncreaseStockPanel = (ingredient, indexIngredient) => {
    setOnIncreaseStock({
      ingredient: ingredient,
      indexIngredient: indexIngredient,
    });
  };

  //Decrease Stock
  const [onDecreaseStock, setOnDecreaseStock] = useState(null);
  const hideDecreaseStockPanel = () => {
    setOnDecreaseStock(null);
  };

  const showDecreaseStockPanel = (ingredient, indexIngredient) => {
    setOnDecreaseStock({
      ingredient: ingredient,
      indexIngredient: indexIngredient,
    });
  };

  const modifiedStockHandler = async (ingredient, indexIngredient) => {
    const ingredientDoc = doc(db, 'ingredients', ingredient.id);

    //updating the list of ingredients
    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(indexIngredient, 1, ingredient);
    setIngredientList([...updatedIngredients]);
    setFilteredIngredientList([...updatedIngredients]);

    //updating the ingredient in the database
    const newIngredient = { ...ingredient };
    delete newIngredient.id;
    await updateDoc(ingredientDoc, newIngredient);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Fragment>
          {onViewStock && (
            <ViewStock onClose={hideViewStockPanel} ingredient={onViewStock} />
          )}
          {onIncreaseStock && (
            <ModifyStock
              type='Augmentation'
              onClose={hideIncreaseStockPanel}
              ingredientInfo={onIncreaseStock}
              onAction={modifiedStockHandler}
            />
          )}
          {onDecreaseStock && (
            <ModifyStock
              type='Diminution'
              onClose={hideDecreaseStockPanel}
              ingredientInfo={onDecreaseStock}
              onAction={modifiedStockHandler}
            />
          )}

          <div className={`container-fluid ${classes.container}`}>
            <div className={classes.top}>
              <div className='row'>
                <div className='col'>
                  <h1 className={classes.title}>Stocks</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2 col-lg-3' />
                <div className=' col-sm-12 col-md-8 col-lg-6'>
                  <SearchBar onChange={searchBarFiltering} />
                </div>
                <div className='col-md-2 col-lg-3' />
              </div>
            </div>
            <div className={classes.bottom}>
              <div className='row'>
                <div className='col-xs-12 col-md-3'>
                  <IngredientFilter
                    categoriesFiltering={filterCategoryHandler}
                    allergenCategoriesFiltering={filterAllergenCategoryHandler}
                  />
                </div>
                <div className='col-xs-12 col-md-9 col-lg-6'>
                  <Card>
                    <StockList
                      ingredientList={filteredIngredientList}
                      wholeIngredientList={ingredientList}
                      onViewIngredient={showViewStockPanel}
                      onIncreaseStock={showIncreaseStockPanel}
                      onDecreaseStock={showDecreaseStockPanel}
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

export default Stocks;
