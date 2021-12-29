import { FaTrash } from "react-icons/fa";
import Button from "../general/Button";
function IngredientItem(props) {
  return (
    <div>
      - {props.ingredient.nomIng} {props.ingredient.qte}
      {props.ingredient.nomUnite}
      <Button
        className="cancelButton"
        onClick={(e) => {
          e.stopPropagation();
          props.onDeleteIngredientItem(props.index);
        }}
      >
        <FaTrash />
      </Button>
    </div>
  );
}

export default IngredientItem;
