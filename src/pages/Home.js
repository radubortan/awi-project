import { Fragment } from 'react/cjs/react.production.min';
import SearchBar from '../components/general/SearchBar';
import Card from '../components/ui/Card';
import Button from '../components/general/Button';
import RecipeList from '../components/recipes/RecipeList';
import { useState, useEffect, useContext } from 'react';
import DeleteRecipe from '../components/recipes/DeleteRecipe';
import classes from './Home.module.css';
import RecipeFilter from '../components/recipes/RecipeFilter';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import AuthContext from '../store/auth-context';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  // fetch recipes
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const recipesCollectionRef = collection(db, 'recettes');
  useEffect(() => {
    setIsLoading(false);
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      const loadedRecipes = [];
      data.docs.map((doc) => {
        const ingredients = [];
        doc.data().stages.map((stage) => {
          stage.ingredients.map((ingredient) => {
            ingredients.push({ nomIng: ingredient.nomIng });
          });
        });
        return loadedRecipes.push({
          idRecette: doc.id,
          nomRecette: doc.data().nomRecette,
          nomCatRecette: doc.data().nomCatRecette,
          ingredients: ingredients,
        });
      });
      loadedRecipes.sort(sortRecipes);
      setRecipeList(loadedRecipes);
      setFilteredRecipeList(loadedRecipes);
      setIsLoading(false);
    };
    getRecipes();
  }, []);

  const showEditRecipePanel = () => {};

  const [filteringOptions, setFilteringOptions] = useState({
    patternToMatch: '',
    categories: [],
    ingredients: [],
  });

  //Filtering method
  const filterRecipe = (recipe) => {
    const { patternToMatch, categories, ingredients } = filteringOptions;
    //for search bar
    if (
      patternToMatch !== '' &&
      !recipe.nomRecette.toLowerCase().startsWith(patternToMatch.toLowerCase())
    ) {
      return false;
    }
    //for dish category
    if (categories.length !== 0 && !categories.includes(recipe.nomCatRecette)) {
      return false;
    }
    //if no ingredient has been checked
    if (ingredients.length === 0) {
      return true;
    }

    //Shows recipe if all the ingredients match
    if (
      recipe.ingredients.every((ing) => ingredients.includes(ing.nomIng)) &&
      recipe.ingredients.length === ingredients.length
    ) {
      return true;
    }

    return false;

    //Shows recipe if any ingredient matches
    // if (
    //   ingredients.length !== 0 &&
    //   !recipe.ingredients.some((ing) => ingredients.includes(ing.nomIng))
    // ) {
    //   return false;
    // }
    // return true;
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
    const recipeDoc = doc(db, 'recettes', idRecette);
    await deleteDoc(recipeDoc);

    const updatedRecipes = [...recipeList];
    updatedRecipes.splice(indexRecipe, 1);
    setRecipeList([...updatedRecipes]);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Fragment>
          {indexRecipeBeingDeleted !== null && (
            <DeleteRecipe
              onClose={hideDeleteRecipePanel}
              indexRecipe={indexRecipeBeingDeleted}
              recipe={recipeBeingDeleted}
              onDeleteRecipe={deleteRecipe}
            />
          )}

          <div className={`container-fluid ${classes.container}`}>
            <div className={classes.top}>
              <div className='row'>
                <div className='col'>
                  <h1 className={classes.title}>Recettes</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2 col-lg-3'></div>
                <div className='col-sm-12 col-md-8 col-lg-6'>
                  <SearchBar onChange={searchBarFiltering} />
                </div>
                <div className='col-md-2 col-lg-3'></div>
              </div>
            </div>
            <div className={`${classes.bottom}`}>
              <div className='row'>
                {authCtx.isLoggedIn && (
                  <div
                    className={`col-12 col-lg-3 order-lg-3 ${classes.addBtn}`}
                  >
                    <Link to='/ajouter-recette'>
                      <Button className='addButton'>
                        <HiPlus /> Ajouter Recette
                      </Button>
                    </Link>
                  </div>
                )}
                <div className='col-xs-12 col-md-3 order-lg-1'>
                  <RecipeFilter
                    categoriesFiltering={filterCategoryHandler}
                    ingredientsFiltering={filterIngredientHandler}
                  />
                </div>
                <div className='col-xs-12 col-md-9 col-lg-6 order-lg-2'>
                  <Card>
                    <RecipeList
                      recipeList={filteredRecipeList}
                      wholeRecipeList={recipeList}
                      onEditRecipe={showEditRecipePanel}
                      onDeleteRecipe={showDeleteRecipePanel}
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

export default Home;
