import { useReactToPrint } from 'react-to-print';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import classes from './PDFRecipe.module.css';
import { db } from '../../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import PrintingComponent from './PrintingComponent';

const PDFRecipe = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className={classes.mainContainer}>
      <div className={classes.buttons}>
        {' '}
        <button className={classes.printButton} onClick={handlePrint}>
          Print PDF
        </button>
        <button className={classes.cancelButton} onClick={props.handleBack}>
          Retour
        </button>
      </div>

      <PrintingComponent ref={componentRef} recipe={props.recipe} />
    </div>
  );
};

export default PDFRecipe;
