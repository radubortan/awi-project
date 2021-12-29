import { useState, useEffect } from "react";
import NumberInput from "../general/NumberInput";
import RadioButton from "../general/RadioButton";
import SelectInput from "../general/SelectInput";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Card from "../ui/Card";
import TextAreaInput from "../general/TexteAreaInput";
import { Fragment } from "react/cjs/react.production.min";
const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
function DetailPanel(props) {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");
  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      const loadedRecipes = [];
      data.docs.map((doc) => {
        return loadedRecipes.push({
          nomRecette: doc.data().nomRecette,
        });
      });
      loadedRecipes.sort(sortRecipes);
      setRecipes(loadedRecipes);
    };
    getRecipes();
  }, []);

  const [selectedRecipeType, setSelectedRecipeType] = useState(
    props.currentStage.nomRecette === undefined ? "recette" : "in extenso"
  );
  const recipeTypeChange = (e) => {
    if (e.target.checked) {
      setSelectedRecipeType(e.target.value);
      if (e.target.value === "recette") {
        props.onRecipeMode();
      } else {
        props.onInExtensoMode();
      }
    }
  };
  return (
    <Card>
      <h1>En detail</h1>
      <div className="row">
        <div className="col">
          <RadioButton
            label="recette"
            name="stageType"
            selectedValue={selectedRecipeType}
            value="recette"
            onChange={recipeTypeChange}
          ></RadioButton>
        </div>
        <div className="col">
          <RadioButton
            label="in extenso"
            name="stageType"
            value="in extenso"
            selectedValue={selectedRecipeType}
            onChange={recipeTypeChange}
          ></RadioButton>
        </div>
      </div>
      <div className="row">
        {selectedRecipeType === "recette" && (
          <Fragment>
            <SelectInput
              dropDownList={recipes}
              optionIdentifier="nomRecette"
              name="nomRecette"
              onChange={props.onUpdateCurrentStage}
            ></SelectInput>
            <NumberInput
              label="Couverts"
              name="nbCouverts"
              onChange={props.onUpdateCurrentStage}
            ></NumberInput>
          </Fragment>
        )}
      </div>
      <div className="row">
        {selectedRecipeType === "in extenso" && (
          <Fragment>
            <NumberInput
              label="temps : "
              name="tempsEtape"
              labelUnite="min"
              value={props.currentStage.tempsEtape}
              onChange={props.onUpdateCurrentStage}
            ></NumberInput>
            <TextAreaInput
              label="Description"
              name="description"
              value={props.currentStage.description}
              onChange={props.onUpdateCurrentStage}
            ></TextAreaInput>
          </Fragment>
        )}
      </div>
    </Card>
  );
}

export default DetailPanel;
