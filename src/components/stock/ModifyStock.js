import classes from './ModifyStock.module.css';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import NumberInput from '../general/NumberInput';
import Button from '../general/Button';
import { useEffect, useState } from 'react';

const ModifyStock = (props) => {
  const [currentIngredient] = useState(props.ingredientInfo.ingredient);
  const [initialValue] = useState(
    Number(props.ingredientInfo.ingredient.stock)
  );
  const [finalValue, setFinalValue] = useState(
    Number(props.ingredientInfo.ingredient.stock)
  );
  const [purchaseCost, setPurschaseCost] = useState(0);
  const [enteredValue, setEnteredValue] = useState(0);
  const [isInvalidStockValue, setIsInvalidStockValue] = useState(false);
  const [isInvalidCostValue, setIsInvalidCostValue] = useState(false);
  const [errorMessageStock, setErrorMessageStock] = useState('');
  const [errorMessageCost, setErrorMessageCost] = useState('');

  const handleStockChange = (e) => {
    setFinalValue(Number(initialValue));
    setEnteredValue(Number(e.target.value));
  };

  const handleCostChange = (e) => {
    setPurschaseCost(Number(e.target.value));
  };

  useEffect(() => {
    setFinalValue((oldValue) => {
      if (props.type === 'Augmentation') {
        return oldValue + enteredValue;
      } else {
        return oldValue - enteredValue;
      }
    });
  }, [enteredValue]);

  const submitHandler = () => {
    setIsInvalidStockValue(false);
    setIsInvalidCostValue(false);
    let invalidStock = false;
    let invalidCost = false;
    if (enteredValue < 0) {
      invalidStock = true;
      setErrorMessageStock('La valeur ne peut pas être négative');
    } else if (enteredValue === 0) {
      invalidStock = true;
      setErrorMessageStock('Entrez une valeur');
    } else if (finalValue < 0) {
      invalidStock = true;
      setErrorMessageStock('Le stock ne peut pas être négatif');
    }
    if (props.type === 'Augmentation') {
      if (purchaseCost === 0) {
        invalidCost = true;
        setErrorMessageCost("Entrez le coût d'achat");
      } else if (purchaseCost < 0) {
        invalidCost = true;
        setErrorMessageCost('Le coût ne peut pas être négatif');
      }
    }
    setIsInvalidCostValue(invalidCost);
    setIsInvalidStockValue(invalidStock);
    console.log('1');
    if (!invalidCost && !invalidStock) {
      console.log('2');
      const modifiedIngredient = { ...currentIngredient };
      modifiedIngredient.stock = finalValue;

      //calculating the new average cost
      let newPrixUnitaire;
      if (finalValue === 0) {
        newPrixUnitaire = 0;
      } else {
        newPrixUnitaire = Number(
          (modifiedIngredient.prixUnitaire *
            props.ingredientInfo.ingredient.stock +
            purchaseCost) /
            finalValue
        ).toFixed(2);
      }
      modifiedIngredient.prixUnitaire = newPrixUnitaire;

      props.onAction(modifiedIngredient, props.ingredientInfo.indexIngredient);
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <p className={classes.title}>{`${props.type} stock`}</p>
      <p className={classes.titleIngredient}>
        {props.ingredientInfo.ingredient.nomIng}
      </p>
      <div className={classes.mainContainer}>
        <div className='row'>
          <div className='col col-sm-2'></div>
          <div className='col-12 col-sm-8'>
            <Card className={classes.informationArea}>
              <p className={classes.sectionTitle}>Quantité actuelle:</p>
              <p className={classes.sectionValue}>
                {`
              ${initialValue} ${props.ingredientInfo.ingredient.nomUnite}`}
              </p>
            </Card>
          </div>
          <div className='col col-sm-2'></div>
        </div>
        <div className='row'>
          <div className='col col-sm-2'></div>
          <div className='col-12 col-sm-8'>
            <Card className={classes.informationArea}>
              <p className={classes.sectionTitle}>Nouvelle quantité:</p>
              <p
                className={classes.sectionValue}
              >{`${finalValue} ${props.ingredientInfo.ingredient.nomUnite}`}</p>
            </Card>
          </div>
          <div className='col col-sm-2'></div>
        </div>
        <form className={`row ${classes.form}`}>
          <div className={classes.inputSpacing}>
            <NumberInput
              label={`${props.type} (${props.ingredientInfo.ingredient.nomUnite})`}
              onChange={handleStockChange}
              name='enteredAmount'
            />
            {isInvalidStockValue && (
              <p className={classes.errorMessage}>{errorMessageStock}</p>
            )}
          </div>

          {props.type === 'Augmentation' && (
            <div className={classes.costDiv}>
              <NumberInput
                label={`Coût d'achat total (€)`}
                onChange={handleCostChange}
                name='enteredCost'
              />
              {isInvalidCostValue && (
                <p className={classes.errorMessage}>{errorMessageCost}</p>
              )}
            </div>
          )}
        </form>
        <div className={`${classes.buttons}`}>
          <Button className='confirmButton' onClick={submitHandler}>
            Confirmer
          </Button>
          <Button className='cancelButton' onClick={props.onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModifyStock;
