import StaticStage from './StaticStage';
import classes from './StaticStagesList.module.css';

function StagesList(props) {
  return (
    <div className={classes.stagesList}>
      {props.stages?.map((stage, index) => (
        <StaticStage
          stage={stage}
          index={index}
          idCurrentStage={props.idCurrentStage}
          onChangeCurrentStage={props.onChangeCurrentStage}
        />
      ))}
    </div>
  );
}

export default StagesList;
