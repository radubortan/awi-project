import StaticStage from "./StaticStage";
import classes from "./../StagesList.module.css";

function StagesList(props) {
  return (
    <div className={classes.stagesList}>
      {props.stages.map((stage, index) => (
        <div className="col-10">
          <StaticStage
            stage={stage}
            index={index}
            idCurrentStage={props.idCurrentStage}
            onChangeCurrentStage={props.onChangeCurrentStage}
          />
        </div>
      ))}
    </div>
  );
}

export default StagesList;
