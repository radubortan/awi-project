import Card from "../ui/Card";
import StagesList from "./StagesList";
import classes from "./StagesPanel.module.css";
import { HiPlus } from "react-icons/hi";

function StaticStagesPanel(props) {
  return (
    <Card>
      <h1 className={classes.title}>Etapes</h1>
      <StaticStagesList
        indexCurrentStage={props.indexCurrentStage}
        idCurrentStage={props.idCurrentStage}
        stages={props.stages}
        onChangeCurrentStage={props.onChangeCurrentStage}
      />
    </Card>
  );
}

export default StaticStagesPanel;
