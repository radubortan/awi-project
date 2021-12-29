import Stage from "./Stage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandle from "./DragHandle";
import { Fragment } from "react";
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
                    className="row"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className="col">
                      <Stage
                        stage={stage}
                        index={index}
                        indexCurrentStage={props.indexCurrentStage}
                        onChangeCurrentStage={props.onChangeCurrentStage}
                        onChangeStageTitle={props.onChangeStageTitle}
                        onDeleteStage={props.onDeleteStage}
                        isOnlyStage={props.stages.length == 1}
                      ></Stage>
                    </div>
                    <div className="col" {...provided.dragHandleProps}>
                      <DragHandle></DragHandle>
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
