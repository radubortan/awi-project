import { useState } from "react";
import Button from "../general/Button";
import NumberInput from "../general/NumberInput";
import TextInput from "../general/TextInput";
import SelectInput from "../general/SelectInput";
import Card from "../ui/Card";
import Modal from "../ui/Modal";

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

  // Issue with predefined value, they need to be set here manually
  // according to each SelectInput preselected value
  const [newIngredient, setNewIngredient] = useState({
    nomIng: "",
    prixUnitaire: 0,
    nomUnite: UNITE[0].nomUnite,
    nomCatIng: CATEGORIES[0].nomCatIng,
    nomCatAllerg: ALLERGENCATEGORIES[0].nomCatAllerg,
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
    props.onClose();
    props.addIngredient(newIngredient);
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
              <NumberInput
                label="Prix"
                name="prixUnitaire"
                value={newIngredient.prixUnitaire}
                onChange={handleChange}
              ></NumberInput>
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
              <SelectInput
                label="Catégorie allergène"
                name="nomCatAllerg"
                selected={newIngredient.nomCatAllerg}
                dropDownList={ALLERGENCATEGORIES}
                optionIdentifier="nomCatAllerg"
                onChange={handleChange}
              ></SelectInput>
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
