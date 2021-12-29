import Stage from "./Stage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandle from "./DragHandle";
import { Fragment } from "react";
import classes from "./StagesList.module.css";

function StagesList(props) {
  const updateListOrdering = (param) => {
    const sourceIndex = param.source.index;
    const destinationIndex = param.destination?.index;
    props.onUpdateListOrdering(sourceIndex, destinationIndex);
  };
  return (
    <DragDropContext onDragEnd={updateListOrdering}>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.stages.map((stage, index) => (
              <Draggable
                key={stage.idEtape}
                draggableId={"draggable-" + stage.idEtape}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className={`row ${
                      stage.idEtape === props.idCurrentStage
                        ? classes.active
                        : ""
                    } ${classes.box}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className="col-10">
                      <Stage
                        stage={stage}
                        index={index}
                        idCurrentStage={props.idCurrentStage}
                        indexCurrentStage={props.indexCurrentStage}
                        onChangeCurrentStage={props.onChangeCurrentStage}
                        onChangeStageTitle={props.onChangeStageTitle}
                        onDeleteStage={props.onDeleteStage}
                        isOnlyStage={props.stages.length == 1}
                        errorStageNameEmpty={props.errorStageNameEmpty}
                      ></Stage>
                    </div>
                    <div
                      className="col-2 d-flex align-items-center justify-content-center"
                      {...provided.dragHandleProps}
                    >
                      <DragHandle
                        className={
                          stage.idEtape === props.idCurrentStage
                            ? classes.white
                            : ""
                        }
                      ></DragHandle>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default StagesList;
