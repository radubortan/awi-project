import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../general/Button";
import NumberInput from "../general/NumberInput";
import SelectInput from "../general/SelectInput";
import TextInput from "../general/TextInput";
import IngredientsPanel from "./IngredientsPanel";
import StagesPanel from "./StagesPanel";
import DetailPanel from "./DetailPanel";
import { v4 as uuid } from "uuid";

import Summary from "./Summary";

const generateId = () => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  return small_id;
};

function AddRecipe() {
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
  });

  const handleRecipeChange = (e) => {
    const value = e.target.value;
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: value,
    });
  };

  const addStagesToRecipe = (stages) => {
    setNewRecipe({
      ...newRecipe,
      stages: stages,
    });
  };

  // Stages new recipe

  const [stages, setStages] = useState([
    {
      idEtape: generateId(),
      titreEtape: "",
      ingredients: [],
    },
  ]);

  const getIndexByIdStages = (idStage) => {
    return stages.findIndex((stage) => {
      return stage.idEtape == idStage;
    });
  };

  const getStageById = (idStage) => {
    return stages.find((stage) => {
      return stage.idEtape === idStage;
    });
  };

  const [idCurrentStage, setIdCurrentStage] = useState(stages[0].idEtape);

  useEffect(() => {
    console.log(idCurrentStage);
  }, [idCurrentStage]);

  const addStage = () => {
    const newIdStage = generateId();
    setStages(
      [
        ...stages,
        {
          idEtape: newIdStage,
          titreEtape: "",
          description: "",
          tempsEtape: "",
          ingredients: [],
          nomRecette: "",
          nbCouverts: 0,
        },
      ],
      setIdCurrentStage(newIdStage)
    );
  };

  const deleteStage = (idStage) => {
    const index = getIndexByIdStages(idStage);
    const updatedStages = [...stages];
    updatedStages.filter((stage) => {
      return stage.idEtape !== idStage;
    });
    setStages(
      updatedStages,
      index === 0
        ? setIdCurrentStage(stages[0].idEtape)
        : setIdCurrentStage(stages[index - 1].idEtape)
    );
  };

  const updateStages = (updatedCurrentStage) => {
    const updatedStages = [...stages];
    updatedStages.splice(
      getIndexByIdStages(idCurrentStage),
      1,
      updatedCurrentStage
    );
    setStages(updatedStages);
  };

  const handleCurrentStageChange = (e) => {
    let currentStage = getStageById(idCurrentStage);

    const value = e.target.value;
    currentStage = { ...currentStage, [e.target.name]: value };
    updateStages(currentStage);
    console.log(currentStage);
  };

  const changeCurrentStage = (idCurrentStage) => {
    setIdCurrentStage(idCurrentStage);
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
      nomRecette: "",
      nbCouverts: 0,
    };
    updateStages(currentStage);
    console.log(currentStage);
  };

  const setCurrentStageToInExtensoMode = () => {
    let { nomRecette, nbCouverts, ...currentStage } =
      getStageById(idCurrentStage);
    currentStage = {
      ...currentStage,
      description: "",
      tempsEtape: 0,
    };
    updateStages(currentStage);
    console.log(currentStage);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <div>
            <TextInput
              label="Nom du plat"
              name="nomRecette"
              value={newRecipe.nomRecette}
              onChange={handleRecipeChange}
            ></TextInput>
          </div>
          <div>
            <TextInput
              label="Auteur(e) du plat"
              name="nomAuteur"
              onChange={handleRecipeChange}
            ></TextInput>
          </div>
          <div className="row">
            <div className="col">
              <SelectInput
                label="Type"
                name="nomCatRecette"
                dropDownList={CATEGORIES}
                optionIdentifier="nomCatRecipe"
                onChange={handleRecipeChange}
              ></SelectInput>
            </div>
            <div className="col">
              <NumberInput
                label="Couverts"
                name="nbCouverts"
                onChange={handleRecipeChange}
              ></NumberInput>
            </div>
          </div>
        </div>
        <div className="col-6">
          <Button>Sauvegarder</Button>
          <Link to="/">
            <Button>Annuler</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <IngredientsPanel
            currentStage={getStageById(idCurrentStage)}
            addIngredientItem={addIngredientItemToStage}
            onDeleteIngredientItem={deleteIngredientItemOfStage}
          ></IngredientsPanel>
        </div>
        <div className="col-4">
          <StagesPanel
            stages={stages}
            onChangeCurrentStage={changeCurrentStage}
            onChangeStageTitle={handleCurrentStageChange}
            onAddStage={addStage}
            onDeleteStage={deleteStage}
            onUpdateListOrdering={updateStagesOrdering}
          ></StagesPanel>
        </div>
        <div className="col-4">
          <DetailPanel
            currentStage={getStageById(idCurrentStage)}
            onUpdateCurrentStage={handleCurrentStageChange}
            onRecipeMode={setCurrentStageToRecipeMode}
            onInExtensoMode={setCurrentStageToInExtensoMode}
          ></DetailPanel>
        </div>
      </div>
      <Summary></Summary>
    </Fragment>
  );
}

export default AddRecipe;
