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
      console.log(ingredientsFromCurrentRecipe);

      // modify quantity of ingredients according to nbCouverts
      console.log(nbCouvertsRecette);
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
      console.log(ingredientsFromCurrentRecipe);

      // add quantities

      for (const ingredient of ingredientsFromCurrentRecipe) {
        addIngredientToIngredients(ingredient);
      }
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
        //prepare ingredient
        newIngredient = {
          ...newIngredient,
          nomIng: fetchedIngredient.nomIng,
          prixUnitaire: fetchedIngredient.prixUnitaire,
        };

        const indexIngredient = prevState.findIndex(
          (ingredient) => ingredient.idIng === newIngredient.idIng
        );
        if (indexIngredient === -1) {
          console.log("here");
          console.log(prevState, newIngredient);
          return [...prevState, newIngredient];
        } else {
          let updatedIngredient = prevState[indexIngredient];
          updatedIngredient = {
            ...updatedIngredient,
            qte:
              parseInt(prevState[indexIngredient].qte) +
              parseInt(newIngredient.qte),
          };
          const ingredients = prevState.splice(
            indexIngredient,
            1,
            updatedIngredient
          );
          return [...ingredients];
        }
      });
    });
  };

  const getAllIngredientsFromStages = (stages) => {
    let ingredients = [];
    for (let stage of stages) {
      if (stage.idRecette !== undefined) {
        if (stage.idRecette) {
          addIngredientsFromSubRecipe(stage.idRecette, stage.nbCouverts);
        }
      } else {
        for (let ingredient of stage.ingredients) {
          addIngredientToIngredients(ingredient);
          ingredients.push(ingredient);
        }
      }
    }
    return ingredients;
  };
  const [ingredientsFromRecipe, setIngredientsFromRecipe] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      /*const allIngredientsFromRecipe = getAllIngredientsFromStages(
        props.stages
      );*/
      console.log("tupac");

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
