import { useReactToPrint } from 'react-to-print';
import React from 'react';
import { useRef } from 'react';
import classes from './TicketRecipe.module.css';
import PrintingTicket from './PrintingTicket';

const TicketRecipe = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  window.scroll({ top: 0 });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.buttons}>
        {' '}
        <button className={classes.printButton} onClick={handlePrint}>
          Print Ticket
        </button>
        <button className={classes.cancelButton} onClick={props.handleBack}>
          Retour
        </button>
      </div>
      <PrintingTicket
        numCouverts={props.numCouverts}
        ref={componentRef}
        recipe={props.recipe}
      />
    </div>
  );
};

export default TicketRecipe;
