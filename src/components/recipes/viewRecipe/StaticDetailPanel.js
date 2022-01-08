import { useState, useEffect } from "react";
import NumberInput from "../general/NumberInput";
import RadioButton from "../general/RadioButton";
import SelectInput from "../general/SelectInput";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Card from "../ui/Card";
import TextAreaInput from "../general/TexteAreaInput";
import classes from "./DetailPanel.module.css";

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
function StaticDetailPanel(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "recettes"),
      where("_name_", "==", props.currentStage.idRecette)
    );
    const getRecipeById = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setRecipe(doc.data());
      });
    };
    getRecipeById();
  }, [props.currentStage.idRecette]);

  return (
    <Card className={classes.mainContainer}>
      <h1 className={classes.title}>En détail</h1>
      {props.currentStage.idRecette === undefined && (
        <div>
          Recette
          <div>
            Nom Recette
            {recipe.nomRecette}
          </div>
          <div>
            Nombre de couverts
            {props.currentStage.nbCouverts}
          </div>
        </div>
      )}
      {props.currentStage.idRecette === undefined && (
        <div className={classes.inextenso}>
          In Extenso
          <div>
            Temps de l'étape
            {props.currentStage.tempsEtape}
          </div>
          <div>
            Description
            {props.currentStage.description}
          </div>
        </div>
      )}
    </Card>
  );
}

export default StaticDetailPanel;
