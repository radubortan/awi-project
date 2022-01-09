import { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StaticIngredientsPanel from "./StaticIngredientsPanel";
import StaticStagesPanel from "./StaticStagesPanel";
import StaticDetailPanel from "./StaticDetailPanel";
import Summary from "./../Summary";
import classes from "./../AddRecipe.module.css";
import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

function ViewRecipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);

  const updateRecipeStage = async (idEtape, idRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("__name__", "==", idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const returnedRecipe = doc.data();
      setRecipe((prevState) => {
        return replaceStageByRecipe(prevState, idEtape, returnedRecipe);
      });
      /*
      for (const stage of returnedRecipe.stages) {
        if (stage.idRecette) {
          updateRecipeStage(stage.idEtape, stage.idRecette);
        } else {
          updateOrdinaryStage(stage.idEtape, stage.ingredients);
        }
      }
      */
      setCurrentStage(returnedRecipe.stages[0]);
    });
  };

  const updateSubRecipeStage = async (idEtape, ingredients) => {};
  const updateOrdinaryStage = async (idEtape, ingredients) => {};

  const exploreRecipeStage = (stage, idEtape, subRecipe) => {
    return stage.stages.map((stage) => {
      if (stage.idEtape === idEtape) {
        return subRecipe;
      } else {
        return exploreStage(stage, idEtape, subRecipe);
      }
    });
  };

  const exploreStage = (stage, idEtape, subRecipe) => {
    if (stage.idRecette) {
      if (stage.idEtape === idEtape) {
        return subRecipe;
      } else {
        return exploreRecipeStage(stage, idEtape, subRecipe);
      }
    } else {
      return stage;
    }
  };

  const replaceStageByRecipe = (idEtape, subRecipe) => {
    const stages = recipe.stages.map((stage) => {
      if (stage.idEtape === idEtape) {
        return subRecipe;
      } else {
        return exploreStage(stage, idEtape, subRecipe);
      }
    });
    let recipe = {
      ...recipe,
      stages: stages,
    };
    return recipe;
  };

  const generateRecipe = async (idRecette) => {
    console.log(idRecette);
    const q = query(
      collection(db, "recettes"),
      where("__name__", "==", idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const returnedRecipe = doc.data();
      console.log(returnedRecipe);
      setRecipe(returnedRecipe);
      for (const stage of returnedRecipe.stages) {
        if (stage.idRecette) {
          updateRecipeStage(stage.idEtape, stage.idRecette);
        } else {
          //updateOrdinaryStage(stage.idEtape, stage.ingredients);
        }
      }
      setCurrentStage(returnedRecipe.stages[0]);
    });
  };

  useEffect(() => {
    generateRecipe(params.idRecette);
  }, [params.idRecette]);

  const changeCurrentStage = (idCurrentStage) => {
    setCurrentStage(getStageById(idCurrentStage));
  };

  const getStageById = (idStage) => {
    return recipe.stages.find((stage) => {
      return stage.idEtape === idStage;
    });
  };
  console.log(recipe);

  return (
    <Fragment>
      <div className={`${classes.topContainer} row`}>
        <div className={`col-12 col-md-4 order-md-3 ${classes.buttons}`}>
          <button className={`${classes.button}  ${classes.cancelButton}`}>
            <Link to="/">Retour</Link>
          </button>
        </div>
        <div className="col-3 col-md-4 d-none d-md-flex" />
        <div
          className={`col-12 col-md-4 order-md-2 ${classes.infoInputContainer}`}
        >
          <div className={classes.recipeNameInput}>
            Nom du plat : {recipe?.nomRecette}
          </div>
          <div className={classes.authorInputContainer}>
            Auteur(e) du plat : {recipe?.nomAuteur}
          </div>
          <div className={`row ${classes.bottomInfoContainer}`}>
            <div className={`${classes.typeInputContainer}`}>
              Catégorie de recette : {recipe?.nomCatRecette}
            </div>
            <div className={classes.couvertsInputContainer}>
              Nombre de couverts : {recipe?.nbCouverts}
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${classes.main}`}>
        <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
          {recipe && (
            <StaticStagesPanel
              stages={recipe.stages}
              onChangeCurrentStage={changeCurrentStage}
            />
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-3 order-lg-3">
          {recipe && <StaticDetailPanel currentStage={currentStage} />}
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
          {recipe && <StaticIngredientsPanel currentStage={currentStage} />}
        </div>
      </div>
      {recipe && <Summary stages={recipe.stages} />}
    </Fragment>
  );
}
export default ViewRecipe;
