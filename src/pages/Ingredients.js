import React, { useEffect, useState } from "react";
import IngredientFilter from "../components/ingredients/IngredientFilter";
import Button from "../components/general/Button";
import IngredientList from "../components/ingredients/IngredientList";
import AddIngredient from "../components/ingredients/AddIngredient";
import EditIngredient from "../components/ingredients/EditIngredient";
import SearchBar from "../components/general/SearchBar";
import Card from "../components/ui/Card";
import { Fragment } from "react/cjs/react.production.min";

function Ingredients() {
  let INGREDIENTS = [
    {
      nomIng: "Tomate",
      nomCatIng: "Fruit",
    },
    {
      nomIng: "Carotte",
      nomCatIng: "Légume",
    },
  ];

  const [ingredientList, setIngredientList] = useState(INGREDIENTS);
  const [filteredIngredientList, setFilteredIngredientList] =
    useState(INGREDIENTS);
  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: "",
    categories: [],
    allergenCategories: [],
  });

  //Filtering method

  const filterIngredient = (ingredient) => {
    const { patternToMatch, categories, allergenCategories } = filteringOptions;
    if (
      patternToMatch !== "" &&
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

  return (
    <Fragment>
      {onAddIngredient && (
        <AddIngredient
          onClose={hideAddIngredientPanel}
          addIngredient={addIngredient}
        />
      )}
      {onEditIngredient && (
        <EditIngredient
          onClose={hideEditIngredientPanel}
          ingredientInfo={onEditIngredient}
          editIngredient={editIngredient}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <SearchBar onChange={searchBarFiltering} />
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row">
          <div className="col-3">
            <IngredientFilter
              categoriesFiltering={filterCategoryHandler}
              allergenCategoriesFiltering={filterAllergenCategoryHandler}
            />
          </div>
          <div className="col-6">
            <Card>
              <IngredientList
                ingredientList={filteredIngredientList}
                wholeIngredientList={ingredientList}
                onEditIngredient={showEditIngredientPanel}
              />
            </Card>
          </div>
          <div className="col-3">
            <Button onClick={showAddIngredientPanel}>Ajouter ingrédient</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Ingredients;
