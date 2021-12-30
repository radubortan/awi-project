import { MdDragHandle } from "react-icons/md";
import { Fragment } from "react";
function DragHandle(props) {
  return (
    <Fragment>
      <MdDragHandle className={props.className} size="24px"></MdDragHandle>
    </Fragment>
  );
}

export default DragHandle;
