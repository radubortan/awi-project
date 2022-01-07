import Card from "../ui/Card";
import CostsSummary from "./CostsSummary";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import IngredientsSummary from "./IngredientsSummary";
import classes from "./Summary.module.css";

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

  const addIngredientsFromSubRecipe = async (idRecette, nbCouvertsRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("__name__", "==", idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const recipe = doc.data();
      let ingredientsFromCurrentRecipe = getAllIngredientsFromStages(
        recipe.stages
      );

      // modify quantity of ingredients according to nbCouverts
      console.log(nbCouvertsRecette);
      console.log(recipe);
      if (nbCouvertsRecette) {
        console.log("in");
        ingredientsFromCurrentRecipe = ingredientsFromCurrentRecipe.map(
          (ingredient) => {
            let updatedIngredient = ingredient;
            console.log("info");
            console.log(updatedIngredient.qte);
            console.log(nbCouvertsRecette);
            console.log(recipe.nbCouverts);
            updatedIngredient = {
              ...updatedIngredient,
              qte:
                (updatedIngredient.qte * nbCouvertsRecette) / recipe.nbCouverts,
            };
            return updatedIngredient;
          }
        );
      }

      // add quantities

      setIngredientsFromRecipe((prevState) => {
        const ingredients = prevState;
        for (const ingredient of ingredientsFromCurrentRecipe) {
          addIngredientToIngredients(ingredients, ingredient);
        }
        return [...ingredients];
      });
    });
  };

  // Function to add ingredients quantity

  const addIngredientToIngredients = (ingredients, newIngredient) => {
    const indexIngredient = ingredients.findIndex(
      (ingredient) => ingredient.nomIng === newIngredient.nomIng
    );
    if (indexIngredient === -1) {
      ingredients.push(newIngredient);
    } else {
      let updatedIngredient = ingredients[indexIngredient];
      updatedIngredient = {
        ...updatedIngredient,
        qte:
          parseInt(ingredients[indexIngredient].qte) +
          parseInt(newIngredient.qte),
      };
      ingredients.splice(indexIngredient, 1, updatedIngredient);
    }
  };

  const getAllIngredientsFromStages = (stages) => {
    let ingredients = [];
    console.log("start");
    console.log(ingredientsFromRecipe);
    for (let stage of stages) {
      if (stage.idRecette !== undefined) {
        if (stage.idRecette) {
          addIngredientsFromSubRecipe(stage.idRecette, stage.nbCouverts);
        }
      } else {
        for (let ingredient of stage.ingredients) {
          addIngredientToIngredients(ingredients, ingredient);
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
      console.log("check");
      console.log(allIngredientsFromRecipe);
      setIngredientsFromRecipe(allIngredientsFromRecipe);
    };
    getIngredients();
  }, [props.stages]);

  return (
    <div className={classes.summaryContainer}>
      <h1 className={classes.title}>Synthèse</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <CostsSummary
            avgHourlyCost={currentSettings.coutHoraireMoyen}
            flatHourlyCost={currentSettings.coutHoraireForfaitaire}
            withAdditionalCostCoeff={currentSettings.coeffMultiAvec}
            withoutAdditionalCostCoeff={currentSettings.coeffMultiSans}
            ingredients={ingredientsFromRecipe}
            stages={props.stages}
          ></CostsSummary>
        </div>
        <div className="col-12 col-md-6">
          <IngredientsSummary
            ingredients={ingredientsFromRecipe}
          ></IngredientsSummary>
        </div>
      </div>
    </div>
  );
};

export default Summary;
