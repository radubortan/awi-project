import Card from "../ui/Card";
import CostsSummary from "./CostsSummary";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import IngredientsSummary from "./IngredientsSummary";

const sortIngredients = (a, b) => {
  const textA = a.nomIng;
  const textB = b.nomIng;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

const Summary = (props) => {
  //settings state
  const [currentSettings, setCurrentSettings] = useState({});

  const settingsCollectionRef = collection(db, "settings");

  //to fetch the stored values when the component loads
  useEffect(() => {
    const getSettings = async () => {
      const data = await getDocs(settingsCollectionRef);
      let loadedSettings = {};
      data.docs.map((doc) => {
        return (loadedSettings = { ...doc.data(), id: doc.id });
      });
      setCurrentSettings(loadedSettings);
    };
    getSettings();
  }, []);

  // Probleme de chargement des couts de la bd

  // Ingredients from recipe list

  const getRecipeByName = async (nomRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("nomRecette", "==", nomRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const recipe = doc.data();
      const ingredientsFromCurrentRecipe = getAllIngredientsFromStages(
        recipe.stages
      );
      setIngredientsFromRecipe((prevState) => {
        return [...prevState, ...ingredientsFromCurrentRecipe];
      });
    });
  };

  const getAllIngredientsFromStages = (stages) => {
    let ingredients = [];
    for (let stage of stages) {
      if (stage.nomRecette !== undefined) {
        getRecipeByName(stage.nomRecette);
      } else {
        for (let ingredient of stage.ingredients) {
          ingredients.push(ingredient);
        }
      }
    }
    return ingredients;
  };
  const [ingredientsFromRecipe, setIngredientsFromRecipe] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      const allIngredientsFromRecipe = getAllIngredientsFromStages(
        props.stages
      );
      setIngredientsFromRecipe(allIngredientsFromRecipe);
    };
    getIngredients();
  }, [props.stages]);

  return (
    <Card>
      <h1>Synthèse</h1>
      <CostsSummary
        avgHourlyCost={currentSettings.coutHoraireMoyen}
        flatHourlyCost={currentSettings.coutHoraireForfaitaire}
        withAdditionalCostCoeff={currentSettings.coeffMultiAvec}
        withoutAdditionalCostCoeff={currentSettings.coeffMultiSans}
        ingredients={ingredientsFromRecipe}
        stages={props.stages}
      ></CostsSummary>
      <IngredientsSummary
        ingredients={ingredientsFromRecipe}
      ></IngredientsSummary>
    </Card>
  );
};

export default Summary;
