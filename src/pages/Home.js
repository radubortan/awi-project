import { Fragment } from "react/cjs/react.production.min";
import SearchBar from "../components/general/SearchBar";
import Card from "../components/ui/Card";
import Button from "../components/general/Button";
import RecipeList from "../components/recipes/RecipeList";
import { useState, useEffect } from "react";
import DeleteRecipe from "../components/recipes/DeleteRecipe";
import classes from "./Home.module.css";
import RecipeFilter from "../components/recipes/RecipeFilter";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function Home() {
  // fetch recipes
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const recipesCollectionRef = collection(db, "recettes");
  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      const loadedRecipes = [];
      data.docs.map((doc) => {
        return loadedRecipes.push({
          idRecette: doc.id,
          nomRecette: doc.data().nomRecette,
        });
      });
      loadedRecipes.sort(sortRecipes);
      setRecipeList(loadedRecipes);
      setFilteredRecipeList(loadedRecipes);
    };
    getRecipes();
  }, []);

  let RECIPES = [
    {
      id: 1,
      nomRecipe: "Steak",
      nomCatRecipe: "Principal",
      ingredients: [
        {
          nomIng: "Carotte",
        },
      ],
    },
    {
      id: 2,
      nomRecipe: "Frites",
      nomCatRecipe: "Entrée",
      ingredients: [
        {
          nomIng: "Tomate",
        },
      ],
    },
  ];

  const showViewRecipePanel = () => {};

  const showEditRecipePanel = () => {};

  //const [recipeList, setRecipeList] = useState(RECIPES);
  //const [filteredRecipeList, setFilteredRecipeList] = useState(RECIPES);
  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: "",
    categories: [],
    ingredients: [],
  });

  //Filtering method
  const filterRecipe = (recipe) => {
    const { patternToMatch, categories, ingredients } = filteringOptions;
    if (
      patternToMatch !== "" &&
      !recipe.nomRecipe.toLowerCase().startsWith(patternToMatch.toLowerCase())
    ) {
      return false;
    }
    if (categories.length !== 0 && !categories.includes(recipe.nomCatRecipe)) {
      return false;
    }
    if (
      ingredients.length !== 0 &&
      !recipe.ingredients.some((ing) => ingredients.includes(ing.nomIng))
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    filterRecipes();
  }, [recipeList]);

  const filterRecipes = () => {
    const filteredList = recipeList.filter(filterRecipe);
    setFilteredRecipeList(filteredList);
  };

  const searchBarFiltering = (e) => {
    filteringOptions.patternToMatch = e.target.value;
    setFilteringOptions(filteringOptions);
    filterRecipes();
  };

  const filterCategoryHandler = (checkedCategories) => {
    filteringOptions.categories = checkedCategories;
    setFilteringOptions(filteringOptions);
    filterRecipes();
  };

  const filterIngredientHandler = (checkedIngredients) => {
    filteringOptions.ingredients = checkedIngredients;
    setFilteringOptions(filteringOptions);
    filterRecipes();
  };

  //Delete Recipe

  const [indexRecipeBeingDeleted, setIndexRecipeBeingDeleted] = useState(null);
  const [recipeBeingDeleted, setRecipeBeingDeleted] = useState(null);

  const hideDeleteRecipePanel = () => {
    setIndexRecipeBeingDeleted(null);
  };

  const showDeleteRecipePanel = (indexRecipe, recipe) => {
    setIndexRecipeBeingDeleted(indexRecipe);
    setRecipeBeingDeleted(recipe);
  };

  const deleteRecipe = async (indexRecipe, idRecette) => {
    const recipeDoc = doc(db, "recettes", idRecette);
    await deleteDoc(recipeDoc);

    const updatedRecipes = [...recipeList];
    updatedRecipes.splice(indexRecipe, 1);
    setRecipeList([...updatedRecipes]);
  };

  return (
    <Fragment>
      {indexRecipeBeingDeleted !== null && (
        <DeleteRecipe
          onClose={hideDeleteRecipePanel}
          indexRecipe={indexRecipeBeingDeleted}
          recipe={recipeBeingDeleted}
          onDeleteRecipe={deleteRecipe}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className={classes.title}>Recettes</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 col-sm-12">
            <SearchBar onChange={searchBarFiltering} />
          </div>
          <div className="col-md-3"></div>
        </div>
        <div class="row">
          <div class="col-3">
            <RecipeFilter
              categoriesFiltering={filterCategoryHandler}
              ingredientsFiltering={filterIngredientHandler}
            />
          </div>
          <div class="col-6">
            <Card>
              <RecipeList
                recipeList={filteredRecipeList}
                wholeRecipeList={recipeList}
                onEditRecipe={showEditRecipePanel}
                onDeleteRecipe={showDeleteRecipePanel}
                onViewRecipe={showViewRecipePanel}
              />
            </Card>
          </div>
          <div class="col-3 d-flex justify-content-start">
            <Link to="/ajouter-recette">
              <Button className="addButton">
                <HiPlus /> Ajouter Recette
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
