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
      console.log("fetched recipe");
      console.log(recipe);
      getAllIngredientsFromStages(recipe.stages);

      // modify quantity of ingredients according to nbCouverts
      /*
      if (nbCouvertsRecette) {
        ingredientsFromCurrentRecipe = ingredientsFromCurrentRecipe.map(
          (ingredient) => {
            let updatedIngredient = ingredient;
            updatedIngredient = {
              ...updatedIngredient,
              qte:
                (updatedIngredient.qte * nbCouvertsRecette) / recipe.nbCouverts,
            };
            return updatedIngredient;
          }
        );
      }
      */

      // add quantities
      /*
      for (const ingredient of ingredientsFromCurrentRecipe) {
        addIngredientToIngredients(ingredient);
      }
      */
    });
  };

  // Function to add ingredients quantity

  const addIngredientToIngredients = async (newIngredient) => {
    //query
    const q = query(
      collection(db, "ingredients"),
      where("__name__", "==", newIngredient.idIng)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const fetchedIngredient = doc.data();
      setIngredientsFromRecipe((prevState) => {
        const currentIngredientsState = prevState;
        //prepare ingredient
        newIngredient = {
          ...newIngredient,
          nomIng: fetchedIngredient.nomIng,
          prixUnitaire: fetchedIngredient.prixUnitaire,
        };
        console.log("new ingredient");
        console.log(newIngredient);

        const indexIngredient = currentIngredientsState.findIndex(
          (ingredient) => ingredient.nomIng === newIngredient.nomIng
        );
        if (indexIngredient === -1) {
          console.log("non addition condition");
          return [...currentIngredientsState, newIngredient];
        } else {
          console.log("addition condition");
          let updatedIngredient = currentIngredientsState[indexIngredient];
          updatedIngredient = {
            ...updatedIngredient,
            qte:
              parseInt(currentIngredientsState[indexIngredient].qte) +
              parseInt(newIngredient.qte),
          };
          currentIngredientsState.splice(indexIngredient, 1, updatedIngredient);
          return [...currentIngredientsState];
        }
      });
    });
  };

  const getAllIngredientsFromStages = (stages) => {
    console.log("stages");
    console.log(props.stages);
    for (let stage of stages) {
      console.log("stage");
      console.log(stage);
      if (stage.idRecette !== undefined) {
        console.log(stage.idRecette);
        if (stage.idRecette) {
          console.log("in idRecette");
          addIngredientsFromSubRecipe(stage.idRecette, stage.nbCouverts);
        }
      } else {
        for (let ingredient of stage.ingredients) {
          addIngredientToIngredients(ingredient);
        }
      }
    }

    return [];
  };
  const [ingredientsFromRecipe, setIngredientsFromRecipe] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      setIngredientsFromRecipe(getAllIngredientsFromStages(props.stages));
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
