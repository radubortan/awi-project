import { useState } from 'react';
import Button from '../general/Button';
import NumberInput from '../general/NumberInput';
import TextInput from '../general/TextInput';
import SelectInput from '../general/SelectInput';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Checkbox from '../general/Checkbox';
import classes from './AddIngredient.module.css';

const AddIngredient = (props) => {
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

  // Allergene Checkbox
  const [isAllergen, setIsAllergen] = useState(false);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setIsAllergen(true);
      setNewIngredient({
        ...newIngredient,

        nomCatAllerg: ALLERGENCATEGORIES[0].nomCatAllerg,
      });
    } else {
      setIsAllergen(false);
      setNewIngredient({
        ...newIngredient,

        nomCatAllerg: undefined,
      });
    }
  };

  // Issue with predefined value, they need to be set here manually
  // according to each SelectInput preselected value
  const [newIngredient, setNewIngredient] = useState({
    nomIng: '',
    prixUnitaire: 0,
    nomUnite: UNITE[0].nomUnite,
    nomCatIng: CATEGORIES[0].nomCatIng,
    nomCatAllerg: undefined,
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setNewIngredient({
      ...newIngredient,

      [e.target.name]: value,
    });
  };

  const saveIngredient = (e) => {
    e.preventDefault();

    // Validation
    if (isValid()) {
      props.onClose();
      props.addIngredient(newIngredient);
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

    if (newIngredient.nomIng === '') {
      setnomIngEmptyError(true);
      isValid = false;
    }
    if (
      props.ingredientList.some(
        (ingredient) => ingredient.nomIng === newIngredient.nomIng
      )
    ) {
      setNomIngUnvailableError(true);
      isValid = false;
    }

    if (!/^(?!0\d)\d+(\.\d+)?$/.test(newIngredient.prixUnitaire.toString())) {
      setPrixUnitaireError(true);
      isValid = false;
    }
    return isValid;
  };

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.title}>Création d'un ingrédient</h1>
      <form className={classes.form} method='post' onSubmit={saveIngredient}>
        <div className='col-5'>
          <div className={`row ${classes.input}`}>
            <TextInput
              label='Nom'
              name='nomIng'
              value={newIngredient.nomIng}
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
              value={newIngredient.prixUnitaire}
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
              selected={newIngredient.nomUnite}
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
              selected={newIngredient.nomCatIng}
              dropDownList={CATEGORIES}
              optionIdentifier='nomCatIng'
              onChange={handleChange}
            />
          </div>
          <div className={`row ${classes.input}`}>
            <Checkbox
              label='Allergène'
              onChange={checkboxHandler}
              className={classes.checkbox}
            />
          </div>
          <div className={`row ${classes.input}`}>
            {isAllergen && (
              <SelectInput
                label='Catégorie allergène'
                name='nomCatAllerg'
                selected={newIngredient.nomCatAllerg}
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
        <div className='col-2'>
          <Button className='confirmButton' onClick={saveIngredient}>
            Créer
          </Button>
        </div>
        <div className='col-2'>
          <Button className='cancelButton' onClick={props.onClose}>
            Annuler
          </Button>
        </div>
        <div className='col-4' />
      </div>
    </Modal>
  );
};

export default AddIngredient;
