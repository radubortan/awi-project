import { useState, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StaticIngredientsPanel from './StaticIngredientsPanel';
import StaticStagesPanel from './StaticStagesPanel';
import StaticDetailPanel from './StaticDetailPanel';
import Summary from './../Summary';
import classes from './../AddRecipe.module.css';
import extraClasses from './ViewRecipe.module.css';
import { db } from '../../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PDFRecipe from './PDFRecipe';
import Checkbox from '../../general/Checkbox';
import NumberInput from '../../general/NumberInput';
import TicketRecipe from './TicketRecipe';
import { CostContextProvider } from '../../../store/cost-context';

function ViewRecipe() {
  const params = useParams();
  const [recipeDisplaying, setRecipeDisplaying] = useState(null);
  const [recipeObject, setRecipeObject] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);
  const [pdfNumCouverts, setPdfNumCouverts] = useState(0);
  const [errorNumCouverts, setErrorNumCouverts] = useState(false);

  const updateRecipeStage = async (idEtape, idRecette) => {
    const q = query(
      collection(db, 'recettes'),
      where('__name__', '==', idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const returnedRecipe = doc.data();
      setRecipeObject((prevState) => {
        const debug = replaceStageByRecipe(prevState, idEtape, returnedRecipe);
        return debug;
      });
      for (const stage of returnedRecipe.stages) {
        if (stage.idRecette) {
          updateRecipeStage(stage.idEtape, stage.idRecette);
        } else {
          //updateOrdinaryStage(stage.idEtape, stage.ingredients);
        }
      }
    });
  };

  const exploreStage = (stage, idEtape, subRecipe) => {
    if (stage.idEtape === idEtape) {
      const updatedStage = Object.assign({}, stage, subRecipe);
      return updatedStage;
    } else {
      if (stage.nomRecette) {
        const stages = stage.stages.map((currentStage) => {
          if (currentStage.idEtape === idEtape) {
            const updatedStage = Object.assign({}, currentStage, subRecipe);
            return updatedStage;
          } else {
            return exploreStage(currentStage, idEtape, subRecipe);
          }
        });
        let updatedStage = {
          ...stage,
          stages: stages,
        };
        return updatedStage;
      } else {
        return stage;
      }
    }
  };

  const replaceStageByRecipe = (gloabelRecipe, idEtape, subRecipe) => {
    const stages = gloabelRecipe.stages.map((stage) => {
      if (stage.idEtape === idEtape) {
        const updatedStage = Object.assign({}, stage, subRecipe);
        return updatedStage;
      } else {
        return exploreStage(stage, idEtape, subRecipe);
      }
    });
    let updatedRecipe = {
      ...gloabelRecipe,
      stages: stages,
    };
    return updatedRecipe;
  };

  const generateRecipe = async (idRecette) => {
    const q = query(
      collection(db, 'recettes'),
      where('__name__', '==', idRecette)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const returnedRecipe = doc.data();

      setRecipeDisplaying(returnedRecipe);
      setRecipeObject(returnedRecipe);
      setPdfNumCouverts(returnedRecipe.nbCouverts);

      for (const stage of returnedRecipe.stages) {
        if (stage.idRecette) {
          updateRecipeStage(stage.idEtape, stage.idRecette);
        } else {
          //updateOrdinaryStage(stage.idEtape, stage.ingredients);
        }
      }
      setCurrentStage(returnedRecipe.stages[0]);
    });
  };

  useEffect(() => {
    generateRecipe(params.idRecette);
  }, [params.idRecette]);

  const changeCurrentStage = (idCurrentStage) => {
    setCurrentStage(getStageById(idCurrentStage));
  };

  const getStageById = (idStage) => {
    return recipeDisplaying.stages.find((stage) => {
      return stage.idEtape === idStage;
    });
  };

  //PDF
  const [viewPdf, setViewPdf] = useState(false);
  const [viewTicket, setViewTicket] = useState(false);
  const [pdfViewCosts, setPdfViewCosts] = useState(false);

  //to show the pdf
  const viewPdfHandler = () => {
    //check if we set a correct amount
    if (pdfNumCouverts <= 0) {
      setErrorNumCouverts(true);
    } else {
      setViewPdf(true);
    }
  };

  //handle going back from pdf view
  const handleBackPdf = () => {
    setViewPdf(false);
    setPdfViewCosts(false);
  };

  //handle going back from ticket view
  const handleBackTicket = () => {
    setViewTicket(false);
  };

  //handler for changing the amount of ingredients to show inside of pdf
  const numberCouvertsHandler = (e) => {
    const value = e.target.value;
    setPdfNumCouverts(value);
  };

  //handler for when we tick to see costs inside of pdf
  const costsPdfHandler = (e) => {
    if (e.target.checked) {
      setPdfViewCosts(true);
    } else {
      setPdfViewCosts(false);
    }
  };

  //to show the ticket
  const printTicketHandler = () => {
    setViewTicket(true);
  };

  return (
    <CostContextProvider>
      {viewTicket && (
        <TicketRecipe recipe={recipeObject} handleBack={handleBackTicket} />
      )}
      {viewPdf && (
        <PDFRecipe
          numCouverts={recipeDisplaying?.nbCouverts}
          viewCosts={pdfViewCosts}
          numCouverts={pdfNumCouverts}
          recipe={recipeObject}
          handleBack={handleBackPdf}
        />
      )}
      {!viewPdf && !viewTicket && (
        <Fragment>
          <div className={`${classes.topContainer} row`}>
            <div className={`col-12 col-md-4 order-md-3 ${classes.buttons}`}>
              <button className={`${classes.button}  ${classes.cancelButton}`}>
                <Link to='/'>Retour</Link>
              </button>
            </div>
            <div className='col-3 col-md-4 d-none d-md-flex' />
            <div
              className={`col-12 col-md-4 order-md-2 ${classes.infoInputContainer}`}
            >
              <h1 className={extraClasses.recipeName}>
                {recipeDisplaying?.nomRecette}
              </h1>
              <div className={extraClasses.authorInfoContainer}>
                <p>Auteur(e) du plat</p>
                <p className={extraClasses.authorName}>
                  {recipeDisplaying?.nomAuteur}
                </p>
              </div>
              <div
                className={`row ${classes.bottomInfoContainer} ${extraClasses.bottomInfoContainer}`}
              >
                <table>
                  <tr>
                    <th>Catégorie de recette</th>
                    <th>N° couverts</th>
                  </tr>
                  <tr>
                    <td>{recipeDisplaying?.nomCatRecette}</td>
                    <td>{recipeDisplaying?.nbCouverts}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className={`row ${classes.main}`}>
            <div className='col-12 col-md-12 col-lg-4 order-md-1 order-lg-2'>
              {recipeDisplaying && (
                <StaticStagesPanel
                  stages={recipeDisplaying.stages}
                  onChangeCurrentStage={changeCurrentStage}
                />
              )}
            </div>
            <div className='col-12 col-md-6 col-lg-4 order-md-3 order-lg-3'>
              {currentStage && (
                <StaticDetailPanel currentStage={currentStage} />
              )}
            </div>
            <div className='col-12 col-md-6 col-lg-4 order-md-2 order-lg-1'>
              {currentStage && (
                <StaticIngredientsPanel currentStage={currentStage} />
              )}
            </div>
          </div>
          {recipeDisplaying && (
            <Summary
              numCouverts={recipeDisplaying?.nbCouverts}
              stages={recipeDisplaying.stages}
            />
          )}
          <div className={extraClasses.buttonSection}>
            <div className={`row`}>
              <div className={`col-6 ${extraClasses.sellSection}`}>
                <NumberInput
                  label='Nombre plats'
                  // onChange={}
                  name='amountToSell'
                  className={extraClasses.numberInput}
                />
                <button className={extraClasses.bottomButton}>Vendre</button>
              </div>
              <div className={`col-6 ${extraClasses.ticketSection}`}>
                <NumberInput
                  label='Nombre tickets'
                  // onChange={}
                  name='numTicketsToPrint'
                  className={extraClasses.numberInput}
                />
                <Checkbox
                  label='Diminuer stock'
                  // onChange={}
                  className={extraClasses.checkbox}
                />
                <button
                  onClick={printTicketHandler}
                  className={extraClasses.bottomButton}
                >
                  Imprimer Ticket
                </button>
              </div>
            </div>
            <div className={extraClasses.pdfButtonContainer}>
              <button
                className={extraClasses.bottomButton}
                onClick={viewPdfHandler}
              >
                Voir Fiche
              </button>
              <Checkbox
                label='Avec coûts'
                onChange={costsPdfHandler}
                className={extraClasses.checkbox}
              />
              <NumberInput
                label='Nombre couverts'
                onChange={numberCouvertsHandler}
                value={pdfNumCouverts}
                name='numCouverts'
                className={extraClasses.numberInput}
              />
              {errorNumCouverts && (
                <p className={extraClasses.errorMessage}>Nombre invalide</p>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </CostContextProvider>
  );
}
export default ViewRecipe;
