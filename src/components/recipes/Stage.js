import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import Button from "../general/Button";
import classes from "./Stage.module.css";

function Stage(props) {
  const stageTitleRef = useRef();
  return (
    <div
      className={`row ${classes.element}`}
      onClick={() => {
        props.onChangeCurrentStage(props.stage.idEtape);
      }}
    >
      <div className={`col-2 ${classes.stageNumber}`}>{`${
        props.index + 1
      }.`}</div>
      <div
        className={`d-flex align-items-center justify-content-center ${
          props.isOnlyStage ? "col-10" : "col-8"
        }`}
      >
        <div className="row">
          <input
            className={classes.input}
            ref={stageTitleRef}
            value={props.stage.titreEtape}
            name="titreEtape"
            onChange={(e) => {
              props.onChangeStageTitle(e, props.index);
            }}
          />
          {props.errorStageNameEmpty.includes(props.stage.idEtape) && (
            <p className={classes.errorMessage}>
              Le nom de l'étape ne peut pas être vide
            </p>
          )}
        </div>
      </div>

      {!props.isOnlyStage && (
        <div className={`col-2 ${classes.icon}`}>
          <Button
            className="cancelButton"
            onClick={(e) => {
              e.stopPropagation();
              props.onDeleteStage(props.stage.idEtape);
            }}
          >
            <FaTrash />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Stage;
