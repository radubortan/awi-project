import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NumberInput from "../../general/NumberInput";
import SelectInput from "../../general/SelectInput";
import TextInput from "../../general/TextInput";
import StaticIngredientsPanel from "./StaticIngredientsPanel";
import StaticStagesPanel from "./StaticStagesPanel";
import StaticDetailPanel from "./StaticDetailPanel";
import Summary from "./../Summary";
import classes from "./../AddRecipe.module.css";
import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

function ViewRecipe() {
  const CATEGORIES = [
    {
      nomCatRecipe: "Entrée",
    },
    {
      nomCatRecipe: "Principal",
    },
    {
      nomCatRecipe: "Dessert",
    },
  ];

  const params = useParams();
  const [recipe, setRecipe] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);

  const getRecipeByName = async (nomRecette) => {
    console.log(nomRecette);
    const q = query(
      collection(db, "recettes"),
      where("nomRecette", "==", nomRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const fetchedrecipe = doc.data();
      setRecipe(fetchedrecipe);
      console.log("fetched");
      console.log(recipe);
      setCurrentStage(recipe.stages[0]);
    });
  };
  getRecipeByName(params.nomRecette);

  const changeCurrentStage = (idCurrentStage) => {
    setCurrentStage(getStageById(idCurrentStage));
    setSelectedRecipeType(
      getStageById(idCurrentStage).idRecette !== undefined
        ? "recette"
        : "in extenso"
    );
  };

  const getStageById = (idStage) => {
    return recipe.stages.find((stage) => {
      return recipe.stage.idEtape === idStage;
    });
  };

  //Detail Panel
  const [selectedRecipeType, setSelectedRecipeType] = useState(
    currentStage.idRecette !== undefined ? "recette" : "in extenso"
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
          <button className={`${classes.button}  ${classes.cancelButton}`}>
            <Link to="/">Retour</Link>
          </button>
        </div>
        <div className="col-3 col-md-4 d-none d-md-flex" />
        <div
          className={`col-12 col-md-4 order-md-2 ${classes.infoInputContainer}`}
        >
          <div className={classes.recipeNameInput}>
            Nom du plat
            {recipe.nomRecette}
          </div>
          <div className={classes.authorInputContainer}>
            Auteur(e) du plat
            {recipe.nomAuteur}
          </div>
          <div className={`row ${classes.bottomInfoContainer}`}>
            <div className={`${classes.typeInputContainer}`}>
              {recipe.nomCatRecette}
            </div>
            <div className={classes.couvertsInputContainer}>
              Nombre de couverts
              {recipe.nbCouverts}
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${classes.main}`}>
        <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
          <StaticStagesPanel
            stages={recipe.stages}
            onChangeCurrentStage={changeCurrentStage}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-3 order-lg-3">
          <StaticDetailPanel
            currentStage={currentStage}
            selectedRecipeType={selectedRecipeType}
            recipeTypeChange={recipeTypeChange}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
          <StaticIngredientsPanel currentStage={currentStage} />
        </div>
      </div>
      <Summary stages={recipe.stages} />
    </Fragment>
  );
}
export default ViewRecipe;
