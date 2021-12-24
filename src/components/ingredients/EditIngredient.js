import { useState } from "react";
import Button from "../general/Button";
import NumberInput from "../general/NumberInput";
import TextInput from "../general/TextInput";
import SelectInput from "../general/SelectInput";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Checkbox from "../general/Checkbox";

const EditIngredient = (props) => {
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

  const givenIngredient = props.ingredientInfo.ingredient;

  const [currentIngredient, setCurrentIngredient] = useState({
    nomIng: givenIngredient.nomIng !== undefined ? givenIngredient.nomIng : "",
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

    if (currentIngredient.nomIng === "") {
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
      <h1>Modification d'un ingrédient</h1>

      <form method="post" onSubmit={saveIngredient}>
        <Card>
          <div className="row">
            <div className="col">
              <TextInput
                label="Nom"
                name="nomIng"
                value={currentIngredient.nomIng}
                onChange={handleChange}
              ></TextInput>
              {nomIngEmptyError && <p>Le nom ne peut pas être vide</p>}
              {nomIngUnvailableError && <p>Ce nom existe déjà</p>}
              <NumberInput
                label="Prix"
                name="prixUnitaire"
                value={currentIngredient.prixUnitaire}
                onChange={handleChange}
              ></NumberInput>
              {prixUnitaireError && <p>Le prix doit être un nombre décimal</p>}
              <SelectInput
                label="Unité"
                name="nomUnite"
                selected={currentIngredient.nomUnite}
                dropDownList={UNITE}
                optionIdentifier="nomUnite"
                onChange={handleChange}
              ></SelectInput>
            </div>
            <div className="col">
              <SelectInput
                label="Catégorie"
                name="nomCatIng"
                selected={currentIngredient.nomCatIng}
                dropDownList={CATEGORIES}
                optionIdentifier="nomCatIng"
                onChange={handleChange}
              ></SelectInput>
              <Checkbox
                label="Allergène"
                onChange={checkboxHandler}
                checked={isAllergen}
              ></Checkbox>
              {isAllergen && (
                <SelectInput
                  label="Catégorie allergène"
                  name="nomCatAllerg"
                  selected={currentIngredient.nomCatAllerg}
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
          <Button onClick={saveIngredient}>Modifier</Button>
        </div>
        <div className="col-6">
          <Button onClick={props.onClose}>Annuler</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditIngredient;
