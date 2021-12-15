import { Fragment } from 'react';
import Card from '../ui/Card';
import RadioButton from '../general/RadioButton';
import classes from './IngredientAllergeneFilter.module.css';

const IngredientAllergeneFilter = (props) => {
  return (
    <Fragment>
      <h3>Allergènes</h3>
      <Card>
        <ul className={classes.radioList}>
          <RadioButton
            forInput='allIngredients'
            inputName='typeIngredient'
            isChecked='true'
            label='Tous'
          />
          <RadioButton
            forInput='allergen'
            inputName='typeIngredient'
            isChecked='false'
            label='Allergène'
          />
          <RadioButton
            forInput='nonAllergen'
            inputName='typeIngredient'
            isChecked='false'
            label='Non Allergène'
          />
        </ul>
      </Card>
    </Fragment>
  );
};

export default IngredientAllergeneFilter;
