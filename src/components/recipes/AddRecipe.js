import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../general/Button";
import NumberInput from "../general/NumberInput";
import SelectInput from "../general/SelectInput";
import TextInput from "../general/TextInput";
import IngredientsPanel from "./IngredientsPanel";
import StagesPanel from "./StagesPanel";
import DetailPanel from "./DetailPanel";
import { v4 as uuid } from "uuid";
import classes from "./AddRecipe.module.css";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

import Summary from "./Summary";

const generateId = () => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  return small_id;
};

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function AddRecipe() {
  const recipesCollectionRef = collection(db, "recettes");

  const [allRecipesList, setAllRecipesList] = useState([]);
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
      setAllRecipesList(loadedRecipes);
    };
    getRecipes();
  }, []);

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

  // Header new recipe

  const [newRecipe, setNewRecipe] = useState({
    nomRecette: "",
    nomAuteur: "",
    nbCouverts: 0,
    nomCatRecette: "",
    stages: [
      {
        idEtape: generateId(),
        titreEtape: "",
        description: "",
        tempsEtape: "",
        ingredients: [],
      },
    ],
  });

  const handleRecipeChange = (e) => {
    const value = e.target.value;
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: value,
    });
  };

  const addStagesToRecipe = (stages) => {
    const updatedRecipe = {
      ...newRecipe,
      stages: [...stages],
    };
    setNewRecipe(updatedRecipe);
  };

  // Stages new recipe

  const [stages, setStages] = useState([newRecipe.stages[0]]);

  const getIndexByIdStages = (idStage) => {
    return stages.findIndex((stage) => {
      return stage.idEtape === idStage;
    });
  };

  const getStageById = (idStage) => {
    return stages.find((stage) => {
      return stage.idEtape === idStage;
    });
  };

  const [idCurrentStage, setIdCurrentStage] = useState(stages[0].idEtape);

  const addStage = () => {
    const newIdStage = generateId();
    const updatedStages = [
      ...stages,
      {
        idEtape: newIdStage,
        titreEtape: "",
        description: "",
        tempsEtape: "",
        ingredients: [],
      },
    ];
    setStages(updatedStages, setIdCurrentStage(newIdStage));
    setSelectedRecipeType(
      updatedStages[updatedStages.length - 1].idRecette !== undefined
        ? "recette"
        : "in extenso"
    );
    addStagesToRecipe(updatedStages);
  };

  const deleteStage = (idStage) => {
    const index = getIndexByIdStages(idStage);
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    setStages(
      updatedStages,
      index === 0
        ? setIdCurrentStage(
            updatedStages[0].idEtape,
            setSelectedRecipeType(
              updatedStages[0].idRecette !== undefined
                ? "recette"
                : "in extenso"
            )
          )
        : setIdCurrentStage(
            updatedStages[index - 1].idEtape,
            setSelectedRecipeType(
              updatedStages[index - 1].idRecette !== undefined
                ? "recette"
                : "in extenso"
            )
          )
    );

    addStagesToRecipe(updatedStages);
  };

  const updateStages = (updatedCurrentStage) => {
    const updatedStages = [...stages];
    updatedStages.splice(
      getIndexByIdStages(idCurrentStage),
      1,
      updatedCurrentStage
    );
    setStages(updatedStages);
    addStagesToRecipe(updatedStages);
  };

  const handleCurrentStageChange = (e) => {
    let currentStage = getStageById(idCurrentStage);

    const value = e.target.value;
    currentStage = { ...currentStage, [e.target.name]: value };
    updateStages(currentStage);
  };

  const changeCurrentStage = (idCurrentStage) => {
    setIdCurrentStage(idCurrentStage);
    setSelectedRecipeType(
      getStageById(idCurrentStage).idRecette !== undefined
        ? "recette"
        : "in extenso"
    );
  };

  const addIngredientItemToStage = (ingredientItem) => {
    let currentStage = getStageById(idCurrentStage);
    const updatedIngredientsCurrentStage = [
      ...getStageById(idCurrentStage).ingredients,
      ingredientItem,
    ];
    currentStage = {
      ...currentStage,
      ingredients: updatedIngredientsCurrentStage,
    };
    updateStages(currentStage);
  };

  const deleteIngredientItemOfStage = (indexIngredientItem) => {
    let currentStage = getStageById(idCurrentStage);
    const updatedIngredientsCurrentStage = [
      ...getStageById(idCurrentStage).ingredients,
    ];
    updatedIngredientsCurrentStage.splice(indexIngredientItem, 1);
    currentStage = {
      ...currentStage,
      ingredients: updatedIngredientsCurrentStage,
    };
    updateStages(currentStage);
  };
  // Stages new recipe (stages panel)

  const updateStagesOrdering = (source, destination) => {
    const updatedStages = [...stages];
    updatedStages.splice(destination, 0, updatedStages.splice(source, 1)[0]);
    setStages(updatedStages);
  };

  // Stages new recipe (detail panel)

  const setCurrentStageToRecipeMode = () => {
    let { description, tempsEtape, ...currentStage } =
      getStageById(idCurrentStage);
    currentStage = {
      ...currentStage,
      idRecette: "",
      nbCouverts: "",
    };
    updateStages(currentStage);
  };

  const setCurrentStageToInExtensoMode = () => {
    let { idRecette, nbCouverts, ...currentStage } =
      getStageById(idCurrentStage);
    currentStage = {
      ...currentStage,
      description: "",
      tempsEtape: "",
    };
    updateStages(currentStage);
  };

  const [selectedRecipeType, setSelectedRecipeType] = useState(
    getStageById(idCurrentStage).idRecette !== undefined
      ? "recette"
      : "in extenso"
  );
  useEffect(() => {
    console.log(selectedRecipeType);
  }, [selectedRecipeType]);

  const recipeTypeChange = (e) => {
    if (e.target.value === "recette") {
      setSelectedRecipeType("recette");
      setCurrentStageToRecipeMode();
    } else {
      setSelectedRecipeType("in extenso");
      setCurrentStageToInExtensoMode();
    }
  };

  // Add recipe

  //Validation

  const [errorRecipeNameEmpty, setErrorRecipeNameEmpty] = useState(false);
  const [errorRecipeNameExists, setErrorRecipeNameExists] = useState(false);
  const [errorAuthorNameEmpty, setErrorAuthorNameEmpty] = useState(false);
  const [errorCategoryEmpty, setErrorCategoryEmpty] = useState(false);
  const [errorNbDiners, setErrorNbDiners] = useState(false);

  const [errorStageNameEmpty, setErrorStageNameEmpty] = useState([]);

  const isValid = () => {
    setErrorRecipeNameEmpty(false);
    setErrorRecipeNameExists(false);
    setErrorAuthorNameEmpty(false);
    setErrorCategoryEmpty(false);
    setErrorNbDiners(false);

    errorStageNameEmpty.length = 0;
    setErrorStageNameEmpty([...errorStageNameEmpty]);

    let isValid = true;
    if (newRecipe.nomRecette === "") {
      setErrorRecipeNameEmpty(true);
      isValid = false;
    }
    if (
      allRecipesList.some(
        (recipe) => recipe.nomRecette === newRecipe.nomRecette
      )
    ) {
      setErrorRecipeNameExists(true);
      isValid = false;
    }
    if (newRecipe.nomAuteur === "") {
      setErrorAuthorNameEmpty(true);
      isValid = false;
    }
    if (newRecipe.nomCatRecette === "") {
      setErrorCategoryEmpty(true);
      isValid = false;
    }
    if (!/^(?!0\d)\d+$/.test(newRecipe.nbCouverts)) {
      setErrorNbDiners(true);
      isValid = false;
    }

    for (const stage of newRecipe.stages) {
      if (!isValidStage(stage)) {
        isValid = false;
      }
    }
    return isValid;
  };
  // index

  const isValidStage = (stage) => {
    let isValid = true;
    if (stage.titreEtape === "") {
      setErrorStageNameEmpty([...errorStageNameEmpty, stage.idEtape]);
      isValid = false;
    }
    if (stage.idRecette !== undefined) {
      if (stage.idRecette === "") {
        isValid = false;
      }
      if (!/^(?!0\d)\d+$/.test(stage.nbCouverts)) {
        isValid = false;
      }
    } else {
      if (stage.description === "") {
        isValid = false;
      }
      if (!/^(?!0\d)\d+$/.test(stage.tempsEtape)) {
        isValid = false;
      }
    }
    return isValid;
  };

  // Add recipe

  const navigate = useNavigate();

  const addRecipe = async () => {
    let response;
    if (isValid()) {
      response = await addDoc(recipesCollectionRef, newRecipe);

      newRecipe.id = response.id;
      navigate("/");
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
            <Link to="/">Annuler</Link>
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
            {errorRecipeNameEmpty && (
              <p className={classes.errorMessage}>
                Le nom ne peut pas être vide
              </p>
            )}
            {errorRecipeNameExists && (
              <p className={classes.errorMessage}>Ce nom existe déjà</p>
            )}
          </div>
          <div className={classes.authorInputContainer}>
            <TextInput
              label="Auteur(e) du plat"
              name="nomAuteur"
              value={newRecipe.nomAuteur}
              onChange={handleRecipeChange}
            ></TextInput>
            {errorAuthorNameEmpty && (
              <p className={classes.errorMessage}>
                L'auteur ne peut pas être vide
              </p>
            )}
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
              {errorCategoryEmpty && (
                <p className={classes.errorMessage}>
                  La categorie ne peut pas être vide
                </p>
              )}
            </div>
            <div className={classes.couvertsInputContainer}>
              <NumberInput
                label="Couverts"
                name="nbCouverts"
                value={newRecipe.nbCouverts}
                onChange={handleRecipeChange}
              ></NumberInput>
              {errorNbDiners && (
                <p className={classes.errorMessage}>
                  Le nombre de couverts doit être un nombre
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${classes.main}`}>
        <div className="col-12 col-md-12 col-lg-4 order-md-1 order-lg-2">
          <StagesPanel
            stages={stages}
            idCurrentStage={idCurrentStage}
            onChangeCurrentStage={changeCurrentStage}
            onChangeStageTitle={handleCurrentStageChange}
            onAddStage={addStage}
            onDeleteStage={deleteStage}
            onUpdateListOrdering={updateStagesOrdering}
            errorStageNameEmpty={errorStageNameEmpty}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-3 order-lg-3">
          <DetailPanel
            currentStage={getStageById(idCurrentStage)}
            onUpdateCurrentStage={handleCurrentStageChange}
            selectedRecipeType={selectedRecipeType}
            recipeTypeChange={recipeTypeChange}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4 order-md-2 order-lg-1">
          <IngredientsPanel
            currentStage={getStageById(idCurrentStage)}
            addIngredientItem={addIngredientItemToStage}
            onDeleteIngredientItem={deleteIngredientItemOfStage}
          />
        </div>
      </div>
      <Summary stages={stages} />
    </Fragment>
  );
}

export default AddRecipe;
