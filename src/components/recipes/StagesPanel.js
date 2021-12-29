import { Fragment } from "react";
import Button from "../general/Button";
import Card from "../ui/Card";
import StagesList from "./StagesList";

function StagesPanel(props) {
  return (
    <Fragment>
      <Card>
        <h1>Etapes</h1>
        <StagesList
          indexCurrentStage={props.indexCurrentStage}
          idCurrentStage={props.idCurrentStage}
          stages={props.stages}
          onChangeCurrentStage={props.onChangeCurrentStage}
          onChangeStageTitle={props.onChangeStageTitle}
          onDeleteStage={props.onDeleteStage}
          onUpdateListOrdering={props.onUpdateListOrdering}
          errorStageNameEmpty={props.errorStageNameEmpty}
        ></StagesList>
      </Card>
      <Button onClick={props.onAddStage}>Ajouter une etape</Button>
    </Fragment>
  );
}

export default StagesPanel;
