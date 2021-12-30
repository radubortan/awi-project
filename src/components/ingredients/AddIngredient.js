import { useState, useEffect } from 'react';
import Button from '../general/Button';
import TextInput from '../general/TextInput';
import SelectInput from '../general/SelectInput';
import Modal from '../ui/Modal';
import Checkbox from '../general/Checkbox';
import classes from './AddIngredient.module.css';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const AddIngredient = (props) => {
  const [newIngredient, setNewIngredient] = useState({
    nomIng: '',
    nomUnite: undefined,
    nomCatIng: undefined,
    nomCatAllerg: undefined,
  });
  const [categories, setCategories] = useState([]);
  const [allergenCategories, setAllergenCategories] = useState([]);
  const [units, setUnits] = useState([]);

  const ingredientCategoriesCollectionRef = collection(
    db,
    'ingredientCategories'
  );
  const allergenCollectionRef = collection(db, 'allergens');
  const unitsCollectionRef = collection(db, 'units');

  const sortAllergens = (a, b) => {
    const textA = a.nomCatAllerg;
    const textB = b.nomCatAllerg;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
  const sortIngredientCategories = (a, b) => {
    const textA = a.nomCatIng;
    const textB = b.nomCatIng;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
  const sortUnits = (a, b) => {
    const textA = a.nomUnite;
    const textB = b.nomUnite;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  const getCategories = async () => {
    const data = await getDocs(ingredientCategoriesCollectionRef);
    const loadedCategories = [];
    data.docs.map((doc) => {
      return loadedCategories.push({ nomCatIng: doc.data().nomCatIng });
    });
    loadedCategories.sort(sortIngredientCategories);
    setCategories(loadedCategories);
  };

  const getAllergen = async () => {
    const data = await getDocs(allergenCollectionRef);
    const loadedAllergens = [];
    data.docs.map((doc) => {
      return loadedAllergens.push({ nomCatAllerg: doc.data().nomCatAllerg });
    });
    loadedAllergens.sort(sortAllergens);
    setAllergenCategories(loadedAllergens);
  };

  const getUnits = async () => {
    const data = await getDocs(unitsCollectionRef);
    const loadedUnits = [];
    data.docs.map((doc) => {
      return loadedUnits.push({ nomUnite: doc.data().nomUnite });
    });
    loadedUnits.sort(sortUnits);
    setUnits(loadedUnits);
  };

  //fetching ingredient catagories, allergen categories and units
  useEffect(() => {
    getAllergen();
    getCategories();
    getUnits();
  }, []);

  // Allergene Checkbox
  const [isAllergen, setIsAllergen] = useState(false);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setIsAllergen(true);
      setNewIngredient({
        ...newIngredient,
        nomCatAllerg: allergenCategories[0].nomCatAllerg,
      });
    } else {
      setIsAllergen(false);
      setNewIngredient({
        ...newIngredient,

        nomCatAllerg: undefined,
      });
    }
  };

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
  const [unitEmptyError, setUnitEmptyError] = useState(false);
  const [categoryEmptyError, setCategoryEmptyError] = useState(false);

  const isValid = () => {
    setnomIngEmptyError(false);
    setNomIngUnvailableError(false);
    setUnitEmptyError(false);
    setCategoryEmptyError(false);

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
    if (newIngredient.nomCatIng === undefined) {
      setCategoryEmptyError(true);
      isValid = false;
    }
    if (newIngredient.nomUnite === undefined) {
      setUnitEmptyError(true);
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
            <SelectInput
              label='Unité'
              name='nomUnite'
              selected={newIngredient.nomUnite}
              dropDownList={units}
              optionIdentifier='nomUnite'
              onChange={handleChange}
            />
            {unitEmptyError && (
              <p className={classes.errorMessage}>Choisissez une unité</p>
            )}
          </div>
        </div>
        <div className='col-2' />
        <div className='col-5'>
          <div className={`row ${classes.input}`}>
            <SelectInput
              label='Catégorie'
              name='nomCatIng'
              selected={newIngredient.nomCatIng}
              dropDownList={categories}
              optionIdentifier='nomCatIng'
              onChange={handleChange}
            />
            {categoryEmptyError && (
              <p className={classes.errorMessage}>Choisissez une catégorie</p>
            )}
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
                selected={
                  newIngredient.nomCatAllerg === undefined ? 'false' : 'true'
                }
                dropDownList={allergenCategories}
                optionIdentifier='nomCatAllerg'
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </form>
      <div className={`${classes.buttons}`}>
        <Button className='confirmButton' onClick={saveIngredient}>
          Créer
        </Button>
        <Button className='cancelButton' onClick={props.onClose}>
          Annuler
        </Button>
      </div>
    </Modal>
  );
};

export default AddIngredient;
