import Modal from "../ui/Modal";
import Card from "../ui/Card";
const ViewIngredient = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h1>Visualisation d'un ingrédient</h1>
      <Card>
        <div className="row">
          <div className="col">
            <h2>Nom {props.ingredient.nomIng}</h2>
            <h2>Prix unitaite {props.ingredient.prixUnitaire}</h2>
            <h2>Unité {props.ingredient.nomUnite}</h2>
          </div>
          <div className="col">
            <h2>Catégorie {props.ingredient.nomCatIng}</h2>
            {props.ingredient.nomCatAllerg && (
              <h2>Catégorie d'allergène {props.ingredient.nomCatAllerg}</h2>
            )}
          </div>
        </div>
      </Card>
    </Modal>
  );
};
export default ViewIngredient;
