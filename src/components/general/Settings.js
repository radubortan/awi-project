import { useState, useEffect } from 'react';
import Button from '../general/Button';
import NumberInput from '../general/NumberInput';
import Modal from '../ui/Modal';
import classes from './Settings.module.css';
import { db } from '../../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const EditIngredient = (props) => {
  //error states
  const [coutHoraireMoyenError, setCoutHoraireMoyenError] = useState(false);
  const [coutHoraireForfaitaireError, setCoutHoraireForfaitaireError] =
    useState(false);
  const [coeffMultiSansError, setCoeffMultiSansError] = useState(false);
  const [coeffMultiAvecError, setCoeffMultiAvecError] = useState(false);

  //settings state
  const [currentSettings, setCurrentSettings] = useState({});

  const settingsCollectionRef = collection(db, 'settings');

  //to fetch the stored values when the component loads
  useEffect(() => {
    const getSettings = async () => {
      const data = await getDocs(settingsCollectionRef);
      let loadedSettings = {};
      data.docs.map((doc) => {
        return (loadedSettings = { ...doc.data(), id: doc.id });
      });
      setCurrentSettings(loadedSettings);
    };
    getSettings();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentSettings((oldSettings) => {
      const newSettings = { ...oldSettings };
      newSettings[e.target.name] = value;
      return newSettings;
    });
  };

  const saveSettingsHandler = async (e) => {
    e.preventDefault();
    const settingsDoc = doc(db, 'settings', currentSettings.id);
    const newSettings = { ...currentSettings };
    delete newSettings.id;
    if (isValid()) {
      await updateDoc(settingsDoc, newSettings);
      props.onClose();
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
      <form className={classes.form} method='post'>
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
          <Button className='confirmButton' onClick={saveSettingsHandler}>
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
