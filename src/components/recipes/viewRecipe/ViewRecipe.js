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
  const [recipeDisplaying, setRecipeDisplaying] = useState(null);
  const [recipeObject, setRecipeObject] = useState(null);
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
      setRecipeObject((prevState) => {
        const debug = replaceStageByRecipe(prevState, idEtape, returnedRecipe);
        console.log(debug);
        return debug;
      });
      setCurrentStage(returnedRecipe.stages[0]);
    });
  };

  const exploreRecipeStage = (stages, idEtape, subRecipe) => {
    return stages.map((stage) => {
      if (stage.idEtape === idEtape) {
        const updatedStage = Object.assign({}, stage, subRecipe);
        return updatedStage;
      } else {
        return exploreStage(stage, idEtape, subRecipe);
      }
    });
  };

  const exploreStage = (stage, idEtape, subRecipe) => {
    if (stage.idRecette) {
      if (stage.idEtape === idEtape) {
        const updatedStage = Object.assign({}, stage, subRecipe);
        return updatedStage;
      } else {
        if (stage.nomRecette) {
          return exploreRecipeStage(stage.stages, idEtape, subRecipe);
        } else {
          updateRecipeStage(stage.idEtape, stage.idRecette);
        }
      }
    } else {
      return stage;
    }
  };

  const replaceStageByRecipe = (gloabelRecipe, idEtape, subRecipe) => {
    const stages = gloabelRecipe.stages.map((stage) => {
      if (stage.idEtape === idEtape) {
        const updatedStage = Object.assign({}, stage, subRecipe);
        return updatedStage;
      } else {
        return exploreStage(stage, idEtape, subRecipe);
      }
    });
    let updatedRecipe = {
      ...recipeObject,
      stages: stages,
    };
    return updatedRecipe;
  };

  const generateRecipe = async (idRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("__name__", "==", idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const returnedRecipe = doc.data();
      console.log(returnedRecipe);

      setRecipeDisplaying(returnedRecipe);
      setRecipeObject(returnedRecipe);
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
    return recipeDisplaying.stages.find((stage) => {
      return stage.idEtape === idStage;
    });
  };

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
            Nom du plat : {recipeDisplaying?.nomRecette}
          </div>
          <div className={classes.authorInputContainer}>
            Auteur(e) du plat : {recipeDisplaying?.nomAuteur}
          </div>
          <div className={`row ${classes.bottomInfoContainer}`}>
            <div className={`${classes.typeInputContainer}`}>
              Catégorie de recette : {recipeDisplaying?.nomCatRecette}
            </div>
            <div className={classes.couvertsInputContainer}>
              Nombre de couverts : {recipeDisplaying?.nbCouverts}
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${classes.main}`}>
        <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
          {recipeDisplaying && (
            <StaticStagesPanel
              stages={recipeDisplaying.stages}
              onChangeCurrentStage={changeCurrentStage}
            />
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-3 order-lg-3">
          {currentStage && <StaticDetailPanel currentStage={currentStage} />}
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
          {currentStage && (
            <StaticIngredientsPanel currentStage={currentStage} />
          )}
        </div>
      </div>
      {recipeDisplaying && <Summary stages={recipeDisplaying.stages} />}
    </Fragment>
  );
}
export default ViewRecipe;
