import Modal from '../ui/Modal';
import Card from '../ui/Card';
import classes from './ViewStock.module.css';
import Button from '../general/Button';
import { Fragment } from 'react/cjs/react.production.min';

const ViewStock = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.title}>{props.ingredient.nomIng}</h1>
      <Card className={classes.informationArea}>
        <div className='row'>
          <div className='col-6'>
            <div className={`row ${classes.information}`}>
              <h2 className={classes.label}>Prix unitaire:</h2>
              <h3
                className={classes.value}
              >{`${props.ingredient.prixUnitaire}€`}</h3>
            </div>
            <div className={`row ${classes.separator}`} />
            <div className={`row ${classes.information}`}>
              <h2 className={classes.label}>Unité:</h2>
              <h3 className={classes.value}>{props.ingredient.nomUnite}</h3>
            </div>
            <div className={`row ${classes.separator}`} />
            <div className={`row ${classes.information}`}>
              <h2 className={classes.label}>Quantité:</h2>
              <h3 className={classes.value}>{props.ingredient.stock}</h3>
            </div>
          </div>
          <div className='col-6'>
            <div className={`row ${classes.information}`}>
              <h2 className={classes.label}>Catégorie:</h2>
              <h3 className={classes.value}>{props.ingredient.nomCatIng}</h3>
            </div>
            <div className={`row ${classes.separator}`} />
            {props.ingredient.nomCatAllerg && (
              <Fragment>
                <div className={`row ${classes.information}`}>
                  <h2 className={classes.label}>Catégorie d'allergène:</h2>
                  <h3 className={classes.value}>
                    {props.ingredient.nomCatAllerg}
                  </h3>
                </div>
                <div className={`row ${classes.separator}`} />
              </Fragment>
            )}
          </div>
        </div>
      </Card>
      <div className={`${classes.buttons}`}>
        <Button className='cancelButton' onClick={props.onClose}>
          Fermer
        </Button>
      </div>
    </Modal>
  );
};
export default ViewStock;
