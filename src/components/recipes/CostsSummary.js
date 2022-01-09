import Card from '../ui/Card';
import RadioButton from '../general/RadioButton';
import Checkbox from '../general/Checkbox';
import NumberInput from '../general/NumberInput';
import { Fragment, useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import classes from './CostsSummary.module.css';

const sortStages = (a, b) => {
  const textA = a.idRecette;
  const textB = b.idRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

const CostsSummary = (props) => {
  //fetch recipe for duration
  const [allStages, setAllStages] = useState([]);
  const etapesCollectionRef = collection(db, 'etapes');
  useEffect(() => {
    const getStages = async () => {
      const data = await getDocs(etapesCollectionRef);
      const loadedStages = [];
      data.docs.map((doc) => {
        return loadedStages.push({
          idRecette: doc.data().idRecette,
          nomEtape: doc.data().nomEtape,
        });
      });
      loadedStages.sort(sortStages);
      setAllStages(loadedStages);
    };
    getStages();
  }, []);

  //Additional Costs
  const [useAdditionalCost, setUseAdditionalCost] = useState(false);
  const changeAdditionalCost = () => {
    setUseAdditionalCost(!useAdditionalCost);
  };

  const [useCustomParameters, setUseCustomParameters] = useState(false);
  const [currentSettings, setCurrentSettings] = useState({
    avgHourlyCost: props.avgHourlyCost,
    flatHourlyCost: props.flatHourlyCost,
    withAdditionalCostCoeff: props.withAdditionalCostCoeff,
    withoutAdditionalCostCoeff: props.withoutAdditionalCostCoeff,
  });
  useEffect(() => {
    setCurrentSettings({
      avgHourlyCost: props.avgHourlyCost,
      flatHourlyCost: props.flatHourlyCost,
      withAdditionalCostCoeff: props.withAdditionalCostCoeff,
      withoutAdditionalCostCoeff: props.withoutAdditionalCostCoeff,
    });
  }, []);
  const customParametersHandler = () => {
    setUseCustomParameters((oldState) => {
      return !useCustomParameters;
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentSettings((oldSettings) => {
      const newSettings = { ...oldSettings };
      newSettings[e.target.name] = value;
      return newSettings;
    });
  };

  //seasoning

  const [seasoningPrice, setSeasoningPrice] = useState('');

  const [errorSeasoningPrice, setErrorSeasoningPrice] = useState(false);

  const [seasoningType, setSeasoningType] = useState('5%');

  const updateSeasoningType = (e) => {
    setSeasoningType(e.target.value);
  };

  const updateSeasoningPrice = (e) => {
    setErrorSeasoningPrice(false);
    if (!/^(?!0\d)\d+(\.\d+)?$/.test(e.target.value)) {
      setErrorSeasoningPrice(true);
    }
    setSeasoningPrice(e.target.value);
  };

  const updateSeasoningTypeByPriceInput = () => {
    setSeasoningType('seasoningPrice');
  };

  // Calculate Cost
  const getPriceByIngredientName = (ingredientName) => {
    return props.ingredients.find((ingredient) => {
      return ingredient.nomIng === ingredientName;
    }).prixUnitaire;
  };
  const getTotalCostIngredient = () => {
    let total = 0;
    for (let ingredient of props.ingredients) {
      total += ingredient.qte * getPriceByIngredientName(ingredient.nomIng);
    }
    return total;
  };
  const totalCostIngredient = +getTotalCostIngredient().toFixed(2);

  let materialCost = 0;
  if (seasoningType === '5%') {
    materialCost = +(totalCostIngredient + 0.05 * totalCostIngredient).toFixed(
      2
    );
  } else {
    if (errorSeasoningPrice) {
      materialCost = totalCostIngredient;
    } else {
      materialCost = +(totalCostIngredient + +seasoningPrice).toFixed(2);
    }
  }

  //Duration
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const getTotalDurationBis = () => {
      const totalDuration = getTotalDuration(props.stages);
      setTotalDuration(totalDuration);
    };
    getTotalDurationBis();
  }, [props.stages]);

  const getRecipeById = async (idRecette) => {
    const q = query(
      collection(db, 'recettes'),
      where('__name__', '==', idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const recipe = doc.data();
      const totalDuration = getTotalDuration(recipe.stages);
      setTotalDuration((prevState) => {
        return prevState + totalDuration;
      });
    });
  };

  const getTotalDuration = (stages) => {
    let total = 0;
    for (let stage of stages) {
      if (stage.idRecette !== undefined) {
        if (stage.idRecette) {
          getRecipeById(stage.idRecette);
        }
      } else {
        total += +stage.tempsEtape;
      }
    }
    return total;
  };
  let additionalCost;
  let personnalCost;
  let fluidCost;
  if (useCustomParameters) {
    personnalCost = +(
      (totalDuration * currentSettings.avgHourlyCost) /
      60
    ).toFixed(2);

    fluidCost = +(
      (totalDuration * currentSettings.flatHourlyCost) /
      60
    ).toFixed(2);

    additionalCost = +(personnalCost + fluidCost).toFixed(2);
  } else {
    personnalCost = +((totalDuration * props.avgHourlyCost) / 60).toFixed(2);

    fluidCost = +((totalDuration * props.flatHourlyCost) / 60).toFixed(2);

    additionalCost = +(personnalCost + fluidCost).toFixed(2);
  }

  let productionCost = 0;
  let salesPrice = 0;
  if (useAdditionalCost) {
    productionCost = +(materialCost + additionalCost).toFixed(2);
    if (useCustomParameters) {
      salesPrice = +(
        currentSettings.withAdditionalCostCoeff * productionCost
      ).toFixed(2);
    } else {
      salesPrice = +(props.withAdditionalCostCoeff * productionCost).toFixed(2);
    }
  } else {
    productionCost = materialCost;
    if (useCustomParameters) {
      salesPrice = +(
        currentSettings.withoutAdditionalCostCoeff * productionCost
      ).toFixed(2);
    } else {
      salesPrice = +(props.withoutAdditionalCostCoeff * productionCost).toFixed(
        2
      );
    }
  }
  return (
    <Card className={classes.costsCard}>
      <h1 className={classes.title}>Coûts</h1>
      <div>
        <Card>
          <Checkbox
            label='Paramètres particuliers'
            onChange={customParametersHandler}
            className={classes.chargesCheckbox}
          />
          {useCustomParameters && (
            <div>
              <NumberInput
                label='Cout horaire moyen'
                name='avgHourlyCost'
                value={currentSettings.avgHourlyCost}
                onChange={handleChange}
                className={classes.customParameters}
              />
              <NumberInput
                label='Cout horaire forfaitaire'
                name='flatHourlyCost'
                value={currentSettings.flatHourlyCost}
                onChange={handleChange}
                className={classes.customParameters}
              />
              <NumberInput
                label='Sans évaluation'
                name='withoutAdditionalCostCoeff'
                value={currentSettings.withoutAdditionalCostCoeff}
                onChange={handleChange}
                className={classes.customParameters}
              />
              <NumberInput
                label='Avec évaluation'
                name='withAdditionalCostCoeff'
                value={currentSettings.withAdditionalCostCoeff}
                onChange={handleChange}
                className={classes.customParameters}
              />
            </div>
          )}
        </Card>
        <Card className={classes.assaisonnementCard}>
          <h2>Assaisonnement</h2>
          <div className={classes.assaisonnementContainer}>
            <div>
              <RadioButton
                name='prixAssaisonnement'
                label='5%'
                value='5%'
                selectedValue={seasoningType}
                onChange={updateSeasoningType}
              ></RadioButton>
              <RadioButton
                name='prixAssaisonnement'
                value='seasoningPrice'
                selectedValue={seasoningType}
                onChange={updateSeasoningType}
              >
                <NumberInput
                  labelUnite='€'
                  onChange={updateSeasoningPrice}
                  value={seasoningPrice}
                  onClick={updateSeasoningTypeByPriceInput}
                  className={classes.assaisonnementInput}
                />
              </RadioButton>
            </div>
          </div>
          {errorSeasoningPrice && seasoningType === 'seasoningPrice' && (
            <p className={classes.errorMessage}>
              Veuillez entrer un nombre decimal
            </p>
          )}
        </Card>
      </div>
      <div className={`${classes.chargesContainer}`}>
        <Card>
          <Checkbox
            label='Charges'
            onChange={changeAdditionalCost}
            checked={useAdditionalCost}
            className={classes.chargesCheckbox}
          ></Checkbox>
          {useAdditionalCost && (
            <div className={classes.charges}>
              <p>Cout horaire moyen:</p>
              <p>
                {useCustomParameters
                  ? currentSettings.avgHourlyCost
                  : props.avgHourlyCost}
                €
              </p>
              <p>Cout horaire forfaitaire:</p>
              <p>
                {useCustomParameters
                  ? currentSettings.flatHourlyCost
                  : props.flatHourlyCost}
                €
              </p>
            </div>
          )}
        </Card>
      </div>
      <ul className={classes.finalCosts}>
        <li>Coût matiere</li>
        <li>{materialCost}€</li>
        {useAdditionalCost && (
          <Fragment>
            <li>Coût des charges</li>
            <li>{additionalCost}€</li>
            <li>Coût du personnel</li>
            <li>{personnalCost}€</li>
            <li>Coût des fluides</li>
            <li>{fluidCost}€</li>
          </Fragment>
        )}
        <li>Coût de production</li>
        <li>{productionCost}€</li>
        <li>Prix de vente total</li>
        <li>{salesPrice}€</li>
      </ul>
    </Card>
  );
};

export default CostsSummary;
