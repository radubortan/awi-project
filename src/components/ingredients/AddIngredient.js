import { useState } from "react";
import Button from "../general/Button";
import NumberInput from "../general/NumberInput";
import TextInput from "../general/TextInput";
import SelectInput from "../general/SelectInput";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Checkbox from "../general/Checkbox";

const AddIngredient = (props) => {
  const UNITE = [{ nomUnite: "g" }, { nomUnite: "l" }];

  const CATEGORIES = [
    {
      nomCatIng: "Fruit",
    },
    {
      nomCatIng: "Légume",
    },
    {
      nomCatIng: "Lait",
    },
    {
      nomCatIng: "Poisson",
    },
  ];

  const ALLERGENCATEGORIES = [
    {
      nomCatAllerg: "Crustaces",
    },
    {
      nomCatAllerg: "Fruit a coque",
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
    nomIng: "",
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

    if (newIngredient.nomIng === "") {
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
      <h1>Création d'un ingrédient</h1>

      <form method="post" onSubmit={saveIngredient}>
        <Card>
          <div className="row">
            <div className="col">
              <TextInput
                label="Nom"
                name="nomIng"
                value={newIngredient.nomIng}
                onChange={handleChange}
              ></TextInput>
              {nomIngEmptyError && <p>Le nom ne peut pas etre vide</p>}
              {nomIngUnvailableError && <p>Ce nom existe deja</p>}
              <NumberInput
                label="Prix"
                name="prixUnitaire"
                value={newIngredient.prixUnitaire}
                onChange={handleChange}
              ></NumberInput>
              {prixUnitaireError && <p>Le prix doit etre un nombre decimal</p>}
              <SelectInput
                label="Unité"
                name="nomUnite"
                selected={newIngredient.nomUnite}
                dropDownList={UNITE}
                optionIdentifier="nomUnite"
                onChange={handleChange}
              ></SelectInput>
            </div>
            <div className="col">
              <SelectInput
                label="Catégorie"
                name="nomCatIng"
                selected={newIngredient.nomCatIng}
                dropDownList={CATEGORIES}
                optionIdentifier="nomCatIng"
                onChange={handleChange}
              ></SelectInput>
              <Checkbox label="Allergène" onChange={checkboxHandler}></Checkbox>
              {isAllergen && (
                <SelectInput
                  label="Catégorie allergène"
                  name="nomCatAllerg"
                  selected={newIngredient.nomCatAllerg}
                  dropDownList={ALLERGENCATEGORIES}
                  optionIdentifier="nomCatAllerg"
                  onChange={handleChange}
                ></SelectInput>
              )}
            </div>
          </div>
        </Card>
      </form>
      <div className="row">
        <div className="col-6">
          <Button onClick={saveIngredient}>Créer</Button>
        </div>
        <div className="col-6">
          <Button onClick={props.onClose}>Annuler</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddIngredient;
