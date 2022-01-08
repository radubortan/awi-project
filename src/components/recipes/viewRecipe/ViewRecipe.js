import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import RecipeStageIngredient from "../RecipeStageIngredient";

function ViewRecipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState(null);
  const [idCurrentStage, setIdCurrentStage] = useState(null);

  const getRecipeByName = async (nomRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("nomRecette", "==", nomRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const fetchedrecipe = doc.data();
      setRecipe(fetchedrecipe);
      setIdCurrenStage(recipe.stages[0].idEtape);
    });
  };
  getRecipeByName(params.nomRecette);

  const changeCurrentStage = (idCurrentStage) => {
    setIdCurrentStage(idCurrentStage);
    setSelectedRecipeType(
      getStageById(idCurrentStage).idRecette !== undefined
        ? "recette"
        : "in extenso"
    );
  };

  //Detail Panel
  const [selectedRecipeType, setSelectedRecipeType] = useState(
    getStageById(idCurrentStage).idRecette !== undefined
      ? "recette"
      : "in extenso"
  );

  const recipeTypeChange = (e) => {
    if (e.target.value === "recette") {
      setSelectedRecipeType("recette");
    } else {
      setSelectedRecipeType("in extenso");
    }
  };

  return (
    <Fragment>
      <div className={`${classes.topContainer} row`}>
        <div className={`col-12 col-md-4 order-md-3 ${classes.buttons}`}>
          <button
            className={`${classes.button} ${classes.addButton}`}
            onClick={addRecipe}
          >
            Ajouter
          </button>

          <button className={`${classes.button}  ${classes.cancelButton}`}>
            <Link to="/">Retour</Link>
          </button>
        </div>
        <div className="col-3 col-md-4 d-none d-md-flex" />
        <div
          className={`col-12 col-md-4 order-md-2 ${classes.infoInputContainer}`}
        >
          <div className={classes.recipeNameInput}>
            <TextInput
              label="Nom du plat"
              name="nomRecette"
              value={newRecipe.nomRecette}
              onChange={handleRecipeChange}
            />
          </div>
          <div className={classes.authorInputContainer}>
            <TextInput
              label="Auteur(e) du plat"
              name="nomAuteur"
              value={newRecipe.nomAuteur}
              onChange={handleRecipeChange}
            ></TextInput>
          </div>
          <div className={`row ${classes.bottomInfoContainer}`}>
            <div className={`${classes.typeInputContainer}`}>
              <SelectInput
                label="Type"
                name="nomCatRecette"
                value={newRecipe.nomCatRecette}
                dropDownList={CATEGORIES}
                optionIdentifier="nomCatRecipe"
                onChange={handleRecipeChange}
              />
            </div>
            <div className={classes.couvertsInputContainer}>
              <NumberInput
                label="Couverts"
                name="nbCouverts"
                value={newRecipe.nbCouverts}
                onChange={handleRecipeChange}
              ></NumberInput>
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${classes.main}`}>
        <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
          <StagesPanel
            stages={stages}
            onChangeCurrentStage={changeCurrentStage}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-3 order-lg-3">
          <DetailPanel
            currentStage={getStageById(idCurrentStage)}
            selectedRecipeType={selectedRecipeType}
            recipeTypeChange={recipeTypeChange}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
          <IngredientsPanel currentStage={getStageById(idCurrentStage)} />
        </div>
      </div>
      <Summary stages={recipe.stages} />
    </Fragment>
  );
}
export default ViewRecipe;
