import Modal from '../ui/Modal';
import Button from '../general/Button';
import classes from './DeleteIngredient.module.css';

const DeleteIngredient = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={`row`}>
        <h2 className={classes.title}>
          Voulez vous vraiment supprimer cet élément?
        </h2>
      </div>
      <div className={`row ${classes.buttons}`}>
        <div className='col-3' />
        <div className='col-2'>
          <Button
            onClick={() => {
              props.onClose();
              props.onDeleteIngredient(props.indexIngredient);
            }}
          >
            Supprimer
          </Button>
        </div>
        <div className='col-2' />
        <div className='col-2'>
          <Button onClick={props.onClose}>Annuler</Button>
        </div>
        <div className='col-3' />
      </div>
    </Modal>
  );
};
export default DeleteIngredient;
