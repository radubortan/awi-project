import { useState, useEffect } from 'react';
import NumberInput from '../general/NumberInput';
import RadioButton from '../general/RadioButton';
import SelectInput from '../general/SelectInput';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Card from '../ui/Card';
import TextAreaInput from '../general/TexteAreaInput';
import classes from './DetailPanel.module.css';

const sortRecipes = (a, b) => {
  const textA = a.nomRecette;
  const textB = b.nomRecette;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
function DetailPanel(props) {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, 'recettes');
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
  return (
    <Card className={classes.mainContainer}>
      <h1 className={classes.title}>En détail</h1>
      <div className={`${classes.radioButtons}`}>
        <RadioButton
          label='in extenso'
          name='stageType'
          value='in extenso'
          selectedValue={props.selectedRecipeType}
          onChange={props.recipeTypeChange}
        />
        <RadioButton
          label='recette'
          name='stageType'
          value='recette'
          selectedValue={props.selectedRecipeType}
          onChange={props.recipeTypeChange}
        />
      </div>
      {props.selectedRecipeType === 'recette' && (
        <div>
          <SelectInput
            className={classes.recipeName}
            label='Nom recette'
            dropDownList={recipes}
            optionIdentifier='nomRecette'
            name='nomRecette'
            selected={props.currentStage.nomRecette}
            onChange={props.onUpdateCurrentStage}
          />
          <NumberInput
            label='Couverts'
            name='nbCouverts'
            value={props.currentStage.nbCouverts}
            onChange={props.onUpdateCurrentStage}
            className={classes.couvertsInput}
          />
        </div>
      )}
      {props.selectedRecipeType === 'in extenso' && (
        <div className={classes.inextenso}>
          <NumberInput
            className={classes.timeInput}
            label='Temps (min) '
            name='tempsEtape'
            value={props.currentStage.tempsEtape}
            onChange={props.onUpdateCurrentStage}
          />
          <TextAreaInput
            className={classes.descriptionInput}
            label='Description'
            name='description'
            value={props.currentStage.description}
            onChange={props.onUpdateCurrentStage}
          />
        </div>
      )}
    </Card>
  );
}

export default DetailPanel;
