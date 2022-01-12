import classes from './StaticStage.module.css';

function Stage(props) {
  return (
    <div
      className={`row ${classes.element} ${props.className}`}
      onClick={() => {
        props.onChangeCurrentStage(props.stage.idEtape);
      }}
    >
      {console.log(props.stage.idEtape)} {console.log(props.idCurrentStage)}
      <p className={classes.elementContent}>
        <span className={classes.stageNumber}>{props.index + 1}. </span>
        <span className={classes.stageName}>{props.stage.titreEtape}</span>
      </p>
    </div>
  );
}

export default Stage;
