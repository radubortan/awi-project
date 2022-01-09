import { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Card from '../../ui/Card';
import classes from './../DetailPanel.module.css';
import extraClasses from './StaticDetailPanel.module.css';

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
function StaticDetailPanel(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipeById = async () => {
      const q = query(
        collection(db, 'recettes'),
        where('__name__', '==', props.currentStage?.idRecette)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setRecipe(doc.data());
      });
    };
    if (props.currentStage?.idRecette) {
      getRecipeById();
    }
  }, [props.currentStage?.idRecette]);

  return (
    <Card className={classes.mainContainer}>
      <h1 className={classes.title}>En détail</h1>
      {props.currentStage?.idRecette !== undefined && (
        <div className={extraClasses.recipeContainer}>
          <p className={extraClasses.info}>Type: Recette</p>
          <p className={extraClasses.info}>Nom Recette: {recipe?.nomRecette}</p>
        </div>
      )}
      {props.currentStage?.idRecette === undefined && (
        <div className={extraClasses.inextensoContainer}>
          <p className={extraClasses.info}>Type: In Extenso</p>
          <p className={extraClasses.info}>
            Temps de l'étape: {props.currentStage?.tempsEtape} min
          </p>
          <div className={extraClasses.descriptionContainer}>
            <p>Description</p>
            <div className={extraClasses.description}>
              {props.currentStage?.description}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default StaticDetailPanel;
