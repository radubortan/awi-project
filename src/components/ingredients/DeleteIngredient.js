import Modal from "../ui/Modal";
import Button from "../general/Button";
const DeleteIngredient = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className="row">Voulez vous vraiment supprimé cet élément ?</div>
      <div className="row">
        <div className="col-6">
          <Button
            onClick={() => {
              props.onClose();
              props.onDeleteIngredient(props.indexIngredient);
            }}
          >
            Supprimer
          </Button>
        </div>
        <div className="col-6">
          <Button onClick={props.onClose}>Annuler</Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteIngredient;
