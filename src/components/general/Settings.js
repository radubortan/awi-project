import { useState } from 'react';
import Button from '../general/Button';
import NumberInput from '../general/NumberInput';
import Modal from '../ui/Modal';
import classes from './Settings.module.css';

const EditIngredient = (props) => {
  //error states
  const [coutHoraireMoyenError, setCoutHoraireMoyenError] = useState(false);
  const [coutHoraireForfaitaireError, setCoutHoraireForfaitaireError] =
    useState(false);
  const [coeffMultiSansError, setCoeffMultiSansError] = useState(false);
  const [coeffMultiAvecError, setCoeffMultiAvecError] = useState(false);

  //settings state
  const [currentSettings, setCurrentSettings] = useState({
    coutHoraireMoyen: 1,
    coutHoraireForfaitaire: 1,
    coeffMultiSans: 1,
    coeffMultiAvec: 1,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentSettings({
      ...currentSettings,
      [e.target.name]: value,
    });
  };

  const saveSettings = (e) => {
    e.preventDefault();
    if (isValid()) {
      props.onClose();
      // props.editIngredient(currentIngredient, props.ingredientInfo.index);
    }
  };

  // Validation
  const isValid = () => {
    setCoutHoraireMoyenError(false);
    setCoutHoraireForfaitaireError(false);
    setCoeffMultiSansError(false);
    setCoeffMultiAvecError(false);

    let isValid = true;

    if (currentSettings.coutHoraireMoyen === '') {
      setCoutHoraireMoyenError(true);
      isValid = false;
    }
    if (currentSettings.coutHoraireForfaitaire === '') {
      setCoutHoraireForfaitaireError(true);
      isValid = false;
    }
    if (currentSettings.coeffMultiSans === '') {
      setCoeffMultiSansError(true);
      isValid = false;
    }
    if (currentSettings.coeffMultiAvec === '') {
      setCoeffMultiAvecError(true);
      isValid = false;
    }
    return isValid;
  };

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.title}>Modification d'un ingrédient</h1>
      <div className={`row ${classes.titles}`}>
        <div className='col-5'>
          <h2 className={classes.columnTitle}>Coût Charges</h2>
        </div>
        <div className='col-2'></div>
        <div className='col-5'>
          <h2 className={classes.columnTitle}>Coefficient Multiplicateur</h2>
        </div>
      </div>
      <form className={classes.form} method='post' onSubmit={saveSettings}>
        <div className='row'>
          <div className='col-5'>
            <div className={`row ${classes.input}`}>
              <NumberInput
                label='Cout horaire moyen'
                name='coutHoraireMoyen'
                value={currentSettings.coutHoraireMoyen}
                onChange={handleChange}
              />
              {coutHoraireMoyenError && (
                <p className={classes.errorMessage}>Ça doit être un nombre</p>
              )}
            </div>
            <div className={`row ${classes.input}`}>
              <NumberInput
                label='Cout horaire forfaitaire'
                name='coutHoraireForfaitaire'
                value={currentSettings.coutHoraireForfaitaire}
                onChange={handleChange}
              />
              {coutHoraireForfaitaireError && (
                <p className={classes.errorMessage}>Ça doit être un nombre</p>
              )}
            </div>
          </div>
          <div className='col-2' />
          <div className='col-5'>
            <div className={`row ${classes.input}`}>
              <NumberInput
                label='Sans évaluation'
                name='coeffMultiSans'
                value={currentSettings.coeffMultiSans}
                onChange={handleChange}
              />
              {coeffMultiSansError && (
                <p className={classes.errorMessage}>Ça doit être un nombre</p>
              )}
            </div>
            <div className={`row ${classes.input}`}>
              <NumberInput
                label='Avec évaluation'
                name='coeffMultiAvec'
                value={currentSettings.coeffMultiAvec}
                onChange={handleChange}
              />
              {coeffMultiAvecError && (
                <p className={classes.errorMessage}>Ça doit être un nombre</p>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className={`row ${classes.buttons}`}>
        <div className='col-4' />
        <div className={`col-2`}>
          <Button className='confirmButton' onClick={saveSettings}>
            Confirmer
          </Button>
        </div>
        <div className={`col-2`}>
          <Button className='cancelButton' onClick={props.onClose}>
            Annuler
          </Button>
        </div>
        <div className='col-4' />
      </div>
    </Modal>
  );
};

export default EditIngredient;
