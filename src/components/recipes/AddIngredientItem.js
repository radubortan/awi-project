import { Fragment, useState, useEffect } from "react";
import NumberInput from "../general/NumberInput";
import SelectInput from "../general/SelectInput";
import Button from "../general/Button";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const sortIngredients = (a, b) => {
  const textA = a.nomIng;
  const textB = b.nomIng;
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

function AddIngredientItem(props) {
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const ingredientsCollectionRef = collection(db, "ingredients");
  useEffect(() => {
    const getIngredients = async () => {
      const data = await getDocs(ingredientsCollectionRef);
      const loadedIngredients = [];
      data.docs.map((doc) => {
        return loadedIngredients.push({
          nomIng: doc.data().nomIng,
          nomUnite: doc.data().nomUnite,
          prixUnitaire: doc.data().prixUnitaire,
          nomCatAllerg: doc.data().nomCatAllerg,
        });
      });
      loadedIngredients.sort(sortIngredients);
      setIngredients(loadedIngredients);
    };
    getIngredients();
  }, []);

  const handleChangeIngredient = (e) => {
    setCurrentIngredient(
      ingredients.find((ingredient) => ingredient.nomIng == e.target.value)
    );
    setSelectedIngredient(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    const value = e.target.value;

    setCurrentIngredient({
      ...currentIngredient,

      [e.target.name]: value,
    });
  };

  const addIngredientItem = () => {
    if (isValid()) {
      props.addIngredientItem(currentIngredient);
      setCurrentIngredient(null);
      setSelectedIngredient(null);
    }
  };

  // Validation

  const [nomIngEmptyError, setnomIngEmptyError] = useState(false);
  const [qteEmptyError, setqteEmptyError] = useState(false);

  const isValid = () => {
    setnomIngEmptyError(false);
    setqteEmptyError(false);

    let isValid = true;

    if (!currentIngredient) {
      setnomIngEmptyError(true);
      setqteEmptyError(true);
      isValid = false;
    } else {
      if (!currentIngredient.nomIng) {
        setnomIngEmptyError(true);
        isValid = false;
      }
      if (!currentIngredient.qte) {
        setqteEmptyError(true);
        isValid = false;
      }
    }

    return isValid;
  };

  return (
    <Fragment>
      <SelectInput
        label="Nom"
        dropDownList={ingredients}
        optionIdentifier="nomIng"
        onChange={handleChangeIngredient}
        selected={selectedIngredient}
      ></SelectInput>
      {nomIngEmptyError && <p>Sélectionnez un ingrédient</p>}
      <NumberInput
        label={`Quantité ${
          currentIngredient && currentIngredient.nomIng
            ? "(" + currentIngredient.nomUnite + ")"
            : ""
        }`}
        name="qte"
        value={
          currentIngredient && currentIngredient.qte
            ? currentIngredient.qte
            : ""
        }
        onChange={handleChangeQuantity}
      ></NumberInput>
      {qteEmptyError && <p>Veuillez entrer une quantité</p>}
      <Button onClick={addIngredientItem}>Ajouter</Button>
    </Fragment>
  );
}

export default AddIngredientItem;
