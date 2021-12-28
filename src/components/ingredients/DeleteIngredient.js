import Modal from '../ui/Modal';
import Button from '../general/Button';
import classes from './DeleteIngredient.module.css';

const DeleteIngredient = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={`row`}>
        <h2 className={classes.title}>
          Voulez vous vraiment supprimer cet ingrédient?
        </h2>
      </div>
      <div className={`${classes.buttons}`}>
        <Button
          onClick={() => {
            props.onClose();
            props.onDeleteIngredient(
              props.indexIngredient,
              props.ingredient.id
            );
          }}
          className='cancelButton'
        >
          Supprimer
        </Button>
        <Button className='confirmButton' onClick={props.onClose}>
          Annuler
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteIngredient;
