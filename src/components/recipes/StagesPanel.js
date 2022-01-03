import Card from '../ui/Card';
import StagesList from './StagesList';
import classes from './StagesPanel.module.css';
import { HiPlus } from 'react-icons/hi';

function StagesPanel(props) {
  return (
    <Card>
      <h1 className={classes.title}>Etapes</h1>
      <StagesList
        indexCurrentStage={props.indexCurrentStage}
        idCurrentStage={props.idCurrentStage}
        stages={props.stages}
        onChangeCurrentStage={props.onChangeCurrentStage}
        onChangeStageTitle={props.onChangeStageTitle}
        onDeleteStage={props.onDeleteStage}
        onUpdateListOrdering={props.onUpdateListOrdering}
        errorStageNameEmpty={props.errorStageNameEmpty}
      />
      <button className={classes.button} onClick={props.onAddStage}>
        <HiPlus size={20} />
        Ajouter l'étape
      </button>
    </Card>
  );
}

export default StagesPanel;
