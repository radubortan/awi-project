import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import Button from "../general/Button";
function Stage(props) {
  const stageTitleRef = useRef();

  return (
    <div
      onClick={() => {
        props.onChangeCurrentStage(props.stage.idEtape);
      }}
    >
      <input
        ref={stageTitleRef}
        value={props.stage.titreEtape}
        name="titreEtape"
        onChange={(e) => {
          props.onChangeStageTitle(e, props.index);
        }}
      ></input>
      {!props.isOnlyStage && (
        <Button
          className="cancelButton"
          onClick={(e) => {
            e.stopPropagation();
            props.onDeleteStage(props.index);
          }}
        >
          <FaTrash />
        </Button>
      )}
    </div>
  );
}

export default Stage;
