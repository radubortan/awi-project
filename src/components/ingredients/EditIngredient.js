import { useState } from 'react';
import Button from '../general/Button';
import NumberInput from '../general/NumberInput';
import TextInput from '../general/TextInput';
import SelectInput from '../general/SelectInput';
import Modal from '../ui/Modal';
import Checkbox from '../general/Checkbox';
import classes from './EditIngredient.module.css';

const EditIngredient = (props) => {
  const UNITE = [{ nomUnite: 'g' }, { nomUnite: 'l' }];

  const CATEGORIES = [
    {
      nomCatIng: 'Fruit',
    },
    {
      nomCatIng: 'Légume',
    },
    {
      nomCatIng: 'Lait',
    },
    {
      nomCatIng: 'Poisson',
    },
  ];

  const ALLERGENCATEGORIES = [
    {
      nomCatAllerg: 'Crustaces',
    },
    {
      nomCatAllerg: 'Fruit a coque',
    },
  ];

  const givenIngredient = props.ingredientInfo.ingredient;

  const [currentIngredient, setCurrentIngredient] = useState({
    nomIng: givenIngredient.nomIng !== undefined ? givenIngredient.nomIng : '',
    prixUnitaire:
      givenIngredient.prixUnitaire !== undefined
        ? givenIngredient.prixUnitaire
        : 0,
    nomUnite:
      givenIngredient.nomUnite !== undefined
        ? givenIngredient.nomUnite
        : UNITE[0].nomUnite,
    nomCatIng:
      givenIngredient.nomCatIng !== undefined
        ? givenIngredient.nomCatIng
        : CATEGORIES[0].nomCatIng,
    nomCatAllerg: givenIngredient.nomCatAllerg,
  });

  console.log(currentIngredient);

  // Allergene Checkbox
  const [isAllergen, setIsAllergen] = useState(
    currentIngredient.nomCatAllerg !== undefined
  );

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setIsAllergen(true);
      setCurrentIngredient({
        ...currentIngredient,

        nomCatAllerg: ALLERGENCATEGORIES[0].nomCatAllerg,
      });
    } else {
      setIsAllergen(false);
      setCurrentIngredient({
        ...currentIngredient,

        nomCatAllerg: undefined,
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setCurrentIngredient({
      ...currentIngredient,

      [e.target.name]: value,
    });
  };

  const saveIngredient = (e) => {
    e.preventDefault();
    if (isValid()) {
      props.onClose();
      props.editIngredient(currentIngredient, props.ingredientInfo.index);
    }
  };

  // Validation

  const [nomIngEmptyError, setnomIngEmptyError] = useState(false);
  const [nomIngUnvailableError, setNomIngUnvailableError] = useState(false);
  const [prixUnitaireError, setPrixUnitaireError] = useState(false);

  const isValid = () => {
    setnomIngEmptyError(false);
    setNomIngUnvailableError(false);
    setPrixUnitaireError(false);

    let isValid = true;

    if (currentIngredient.nomIng === '') {
      setnomIngEmptyError(true);
      isValid = false;
    }
    if (
      props.ingredientList.some(
        (ingredient, index) =>
          ingredient.nomIng === currentIngredient.nomIng &&
          index !== props.ingredientInfo.index
      )
    ) {
      setNomIngUnvailableError(true);
      isValid = false;
    }

    if (
      !/^(?!0\d)\d+(\.\d+)?$/.test(currentIngredient.prixUnitaire.toString())
    ) {
      setPrixUnitaireError(true);
      isValid = false;
    }
    return isValid;
  };

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.title}>Modification d'un ingrédient</h1>
      <form className={classes.form} method='post' onSubmit={saveIngredient}>
        <div className='col-5'>
          <div className={`row ${classes.input}`}>
            <TextInput
              label='Nom'
              name='nomIng'
              value={currentIngredient.nomIng}
              onChange={handleChange}
            />
            {nomIngEmptyError && (
              <p className={classes.errorMessage}>
                Le nom ne peut pas être vide
              </p>
            )}
            {nomIngUnvailableError && (
              <p className={classes.errorMessage}>Ce nom existe déjà</p>
            )}
          </div>
          <div className={`row ${classes.input}`}>
            <NumberInput
              label='Prix'
              name='prixUnitaire'
              value={currentIngredient.prixUnitaire}
              onChange={handleChange}
            />
            {prixUnitaireError && (
              <p className={classes.errorMessage}>
                Le prix doit être un nombre
              </p>
            )}
          </div>
          <div className={`row ${classes.input}`}>
            <SelectInput
              label='Unité'
              name='nomUnite'
              selected={currentIngredient.nomUnite}
              dropDownList={UNITE}
              optionIdentifier='nomUnite'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='col-2' />
        <div className='col-5'>
          <div className={`row ${classes.input}`}>
            <SelectInput
              label='Catégorie'
              name='nomCatIng'
              selected={currentIngredient.nomCatIng}
              dropDownList={CATEGORIES}
              optionIdentifier='nomCatIng'
              onChange={handleChange}
            />
          </div>
          <div className={`row ${classes.input}`}>
            <Checkbox
              label='Allergène'
              onChange={checkboxHandler}
              checked={isAllergen}
              className={classes.checkbox}
            />
          </div>
          <div className={`row ${classes.input}`}>
            {isAllergen && (
              <SelectInput
                label='Catégorie allergène'
                name='nomCatAllerg'
                selected={currentIngredient.nomCatAllerg}
                dropDownList={ALLERGENCATEGORIES}
                optionIdentifier='nomCatAllerg'
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </form>
      <div className={`row ${classes.buttons}`}>
        <div className='col-4' />
        <div className={`col-2`}>
          <Button className='confirmButton' onClick={saveIngredient}>
            Modifier
          </Button>
        </div>
        <div className={`col-2`}>
          <Button className='cancelButton' onClick={props.onClose}>
            Annuler
          </Button>
        </div>
        <div className='col-4' />
      </div>
    </Modal>
  );
};

export default EditIngredient;
