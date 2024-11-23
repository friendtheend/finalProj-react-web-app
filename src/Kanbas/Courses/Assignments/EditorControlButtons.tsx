// EditorCOntrolButtons.tsx

import { Link, useParams } from "react-router-dom";

export default function EditorControlButtons({
    addAssignment,
}:{
    addAssignment: () => void;
}
 
){
    const { cid, assignmentId } = useParams();
    return(
        <div className="row">
        <div className="col text-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            <button id="wd-cancel" className="btn btn-md btn-secondary me-1">
              Cancel{" "}
            </button>
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            <button id="wd-submit" className="btn btn-md btn-danger me-1"
            onClick={addAssignment}
            >
              Save
            </button>
          </Link>
        </div>
      </div>
    )
}