import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import Button from "../general/Button";
import classes from "./Stage.module.css";
function Stage(props) {
  const stageTitleRef = useRef();
  console.log(props.idCurrentStage);
  console.log(props.stage.idEtape);
  return (
    <div
      className="row"
      onClick={() => {
        props.onChangeCurrentStage(props.stage.idEtape);
      }}
    >
      <div className="col-8  d-flex align-items-center justify-content-center">
        <div className="row">
          <input
            ref={stageTitleRef}
            value={props.stage.titreEtape}
            name="titreEtape"
            onChange={(e) => {
              props.onChangeStageTitle(e, props.index);
            }}
          ></input>
          {props.errorStageNameEmpty.includes(props.stage.idEtape) && (
            <p className={classes.errorMessage}>
              Le nom de l'étape ne peut pas être vide
            </p>
          )}
        </div>
      </div>

      {!props.isOnlyStage && (
        <div className="col-2">
          <Button
            className="cancelButton"
            onClick={(e) => {
              e.stopPropagation();
              props.onDeleteStage(props.stage.idEtape);
            }}
          >
            <FaTrash />
          </Button>{" "}
        </div>
      )}
    </div>
  );
}

export default Stage;
