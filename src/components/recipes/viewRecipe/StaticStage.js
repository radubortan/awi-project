import { useEffect, useRef } from "react";
import classes from "./../Stage.module.css";

function Stage(props) {
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
        <div className="row">{props.stage.titreEtape}</div>
      </div>
    </div>
  );
}

export default Stage;