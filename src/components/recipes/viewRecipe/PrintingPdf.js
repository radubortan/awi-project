import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import classes from './PrintingPdf.module.css';
import CostContext from '../../../store/cost-context';
import { Fragment } from 'react';

const PrintingPdf = React.forwardRef((props, ref) => {
  const [ingredientList, setIngredientList] = useState([]);
  const costCtx = useContext(CostContext);
  console.log(costCtx.salesPrice);

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

  const adjustQuantity = () => {
    stagesList.forEach((stage) => {
      stage.ingredients.forEach((ingredient) => {
        ingredient.qte =
          (ingredient.qte / props.recipe.nbCouverts) * props.numCouverts;
      });
    });
  };

  extractStages(props.recipe.stages);
  adjustQuantity(stagesList);

  return (
    <div className={classes.container} ref={ref}>
      <div className={`row ${classes.header}`}>
        <h1 className={classes.recipeName}> {props.recipe.nomRecette}</h1>
        <table className={`${classes.table} ${classes.infoTable}`}>
          <tr>
            <th>
              <p className={classes.text}>Type plat</p>
            </th>
            <th>
              <p className={classes.text}>Auteur</p>
            </th>
            <th>
              <p className={classes.text}>Nombre Couverts</p>
            </th>
          </tr>
          <tr>
            <td>
              <p className={classes.text}>{props.recipe.nomCatRecette}</p>
            </td>
            <td>
              <p className={classes.text}>{props.recipe.nomAuteur}</p>
            </td>
            <td>
              <p className={classes.text}>{props.recipe.nbCouverts}</p>
            </td>
          </tr>
        </table>
      </div>
      {stagesList.map((stage, index) => (
        <div className={`row ${classes.etape}`}>
          <div className='row'>
            <h2 className={classes.titleEtape}>
              {index + 1}. {stage.titreEtape}
            </h2>
            <p className={classes.stageTime}>Temps: {stage.tempsEtape} min</p>
          </div>
          <div className='row'>
            <div className={`col-6 ${classes.ingredientsColumn}`}>
              <h2 className={classes.columnTitle}>Ingredients</h2>
              <table className={`${classes.table} ${classes.ingredientTable}`}>
                <tr>
                  <th>Ingrédient</th>
                  <th>Quantité</th>
                  <th>Unité</th>
                </tr>
                {stage.ingredients.map((ingredient) => {
                  return (
                    <tr className={classes.ingredient}>
                      <td>{ingredient.nomIng}</td>
                      <td>{ingredient.qte}</td>
                      <td>{ingredient.nomUnite}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className={`col-6 ${classes.descriptionColumn}`}>
              <h2 className={classes.columnTitle}>Description</h2>
              <p className={classes.stageDescription}>{stage.description}</p>
            </div>
          </div>
        </div>
      ))}
      {props.viewCosts && (
        <div className={classes.costsSection}>
          <h1 className={classes.costTitle}>Coûts</h1>
          <div className={`row ${classes.finalCosts}`}>
            <div
              className={`${
                costCtx.useAdditionalCost ? 'col-6' : 'col-12'
              } d-flex flex-column align-items-center`}
            >
              <li>Coût matiere</li>
              <li>{costCtx.materialCost}€</li>
              <li>Coût de production</li>
              <li>{costCtx.productionCost}€</li>
              <li>Prix de vente total</li>
              <li>{costCtx.salesPrice}€</li>
              <li>Bénéfice par portion</li>
              {props.numCouverts > 0 ? (
                <li>
                  {(
                    (costCtx.salesPrice - costCtx.productionCost) /
                    props.numCouverts
                  ).toFixed(2)}
                  €
                </li>
              ) : (
                <li>Erreur</li>
              )}
            </div>

            {costCtx.useAdditionalCost && (
              <div className='col-6 d-flex flex-column align-items-center'>
                <li>Coût des charges</li>
                <li>{costCtx.additionalCost}€</li>
                <li>Coût du personnel</li>
                <li>{costCtx.personnalCost}€</li>
                <li>Coût des fluides</li>
                <li>{costCtx.fluidCost}€</li>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default PrintingPdf;
