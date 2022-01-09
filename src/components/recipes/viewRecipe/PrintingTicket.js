import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import classes from './PrintingTicket.module.css';

const PrintingTicket = React.forwardRef((props, ref) => {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const ingredientsCollectionRef = collection(db, 'ingredients');
      const data = await getDocs(ingredientsCollectionRef);
      const loadedIngredients = [];
      data.docs.map((doc) => {
        return loadedIngredients.push({
          idIng: doc.id,
          nomCatIng: doc.data().nomCatIng,
          nomCatAllerg: doc.data().nomCatAllerg,
          nomIng: doc.data().nomIng,
          nomUnite: doc.data().nomUnite,
          prixUnitaire: doc.data().prixUnitaire,
          stock: doc.data().stock,
        });
      });
      setIngredientList(loadedIngredients);
    };
    getIngredients();
  }, []);

  const stagesList = [];
  const ingredientsList = [];

  const addInfosToIngredients = (ingredients) => {
    return ingredients.map((currentIngredient) => {
      let completeIngredient = ingredientList.find((ingredient) => {
        return currentIngredient.idIng === ingredient.idIng;
      });
      completeIngredient = Object.assign(
        {},
        completeIngredient,
        currentIngredient
      );
      return completeIngredient;
    });
  };

  const extractStages = (stages) => {
    stages.forEach((stage) => {
      if (stage.idRecette === undefined) {
        let updatedStage = {
          ...stage,
          ingredients: addInfosToIngredients(stage.ingredients),
        };
        stagesList.push(updatedStage);
      } else {
        extractStages(stage.stages);
      }
    });
  };

  const extractIngredients = () => {
    stagesList.forEach((stage) => {
      stage.ingredients.forEach((ingredient) => {
        ingredientsList.push({
          nomIng: ingredient.nomIng,
          nomCatAllerg: ingredient.nomCatAllerg,
        });
      });
    });
  };

  extractStages(props.recipe.stages);
  extractIngredients(stagesList);

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.header}>
        <h1 className={classes.recipeName}> {props.recipe.nomRecette}</h1>
      </div>
      <h3>Ingrédients:</h3>
      <ul className={classes.ingredientsList}>
        {ingredientsList.map((ingredient) => {
          return (
            <li
              className={ingredient.nomCatAllerg === '' ? '' : classes.allergen}
            >
              {ingredient.nomIng}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default PrintingTicket;
