import Card from "../ui/Card";
import RadioButton from "../general/RadioButton";
import Checkbox from "../general/Checkbox";
import NumberInput from "../general/NumberInput";
import { Fragment, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const sortStages = (a, b) => {
  const textA = a.idRecette;
  const textB = b.idRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

const CostsSummary = (props) => {
  //fetch recipe for duration
  const [allStages, setAllStages] = useState([]);
  const etapesCollectionRef = collection(db, "etapes");
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

  //seasoning

  const [seasoningPrice, setSeasoningPrice] = useState("");

  const [errorSeasoningPrice, setErrorSeasoningPrice] = useState(false);

  const [seasoningType, setSeasoningType] = useState("5%");

  const updateSeasoningType = (e) => {
    console.log(e.target.value);
    setSeasoningType(e.target.value);
  };

  const updateSeasoningPrice = (e) => {
    console.log(errorSeasoningPrice);
    setErrorSeasoningPrice(false);
    if (!/^(?!0\d)\d+(\.\d+)?$/.test(e.target.value)) {
      setErrorSeasoningPrice(true);
    }
    setSeasoningPrice(e.target.value);
  };

  const updateSeasoningTypeByPriceInput = () => {
    setSeasoningType("seasoningPrice");
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
  if (seasoningType === "5%") {
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

  const getRecipeByName = async (nomRecette) => {
    const q = query(
      collection(db, "recettes"),
      where("nomRecette", "==", nomRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
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
      if (stage.nomRecette !== undefined) {
        getRecipeByName(stage.nomRecette);
      } else {
        total += stage.tempsEtape;
      }
    }
    return total;
  };

  const personnalCost = +((totalDuration * props.avgHourlyCost) / 60).toFixed(
    2
  );
  const fluidCost = +((totalDuration * props.flatHourlyCost) / 60).toFixed(2);
  const additionalCost = +(personnalCost + fluidCost).toFixed(2);

  let productionCost = 0;
  let salesPrice = 0;
  if (useAdditionalCost) {
    productionCost = +(materialCost + additionalCost).toFixed(2);
    salesPrice = +(props.withAdditionalCostCoeff * productionCost).toFixed(2);
  } else {
    productionCost = materialCost;
    salesPrice = +(props.withoutAdditionalCostCoeff * productionCost).toFixed(
      2
    );
  }
  return (
    <Card>
      <h1>Coûts</h1>
      <div className="row">
        <div className="col">
          <Card>
            <h2>Assaisonnement</h2>
            <RadioButton
              name="prixAssaisonnement"
              label="5%"
              value="5%"
              selectedValue={seasoningType}
              onChange={updateSeasoningType}
            ></RadioButton>
            <RadioButton
              name="prixAssaisonnement"
              value="seasoningPrice"
              selectedValue={seasoningType}
              onChange={updateSeasoningType}
            >
              <NumberInput
                labelUnite="€"
                onChange={updateSeasoningPrice}
                value={seasoningPrice}
                onClick={updateSeasoningTypeByPriceInput}
              ></NumberInput>
              {errorSeasoningPrice && seasoningType === "seasoningPrice" && (
                <p>Veuillez entrer un nombre decimal</p>
              )}
            </RadioButton>
          </Card>
        </div>
        <div className="col">
          <Card>
            <Checkbox
              label="Charges"
              onChange={changeAdditionalCost}
              checked={useAdditionalCost}
            ></Checkbox>
            {useAdditionalCost && (
              <Fragment>
                <p>Cout horaire moyen {props.avgHourlyCost}€</p>
                <p>Cout horaire forfaitaire {props.flatHourlyCost}€</p>
              </Fragment>
            )}
          </Card>
        </div>
      </div>
      <Card>
        <div className="row">
          <div className="col">
            <ul>
              <li>Coût matiere</li>
              {useAdditionalCost && (
                <div>
                  <li>cout des charges</li>
                  <li>cout du personnel</li>
                  <li>cout des fluides</li>
                </div>
              )}
              <li>Coût de production</li>
              <li>Prix de vente total</li>
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>{materialCost}€</li>
              {useAdditionalCost && (
                <div>
                  {" "}
                  <li>{additionalCost}€</li>
                  <li>{personnalCost}€</li>
                  <li>{fluidCost}€</li>
                </div>
              )}
              <li>{productionCost}€</li>
              <li>{salesPrice}€</li>
            </ul>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default CostsSummary;
