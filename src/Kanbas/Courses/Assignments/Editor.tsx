
// Editor.tsx
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";
import EditorControlButtons from "./EditorControlButtons";
import { setAssignments, addAssignment, editAssignment, updateAssignment } from "./reducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { title } from "process";

export default function AssignmentEditor(
  // { assignmentName,
  //   setAssignmentName,
  //   addAssignment, 
  // }:
  //   {
  //     assignmentName: string;
  //     setAssignmentName: (name: string) => void;
  //     addAssignment: () => void;
  //   }

) {
  const { cid, assignmentId } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === assignmentId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [assignmentName, setAssignmentName] = useState(assignment?.title || "");
  const [assignmentDescription, setAssignmentDescription] = useState(assignment?.description || "");
  const [assignmentPoint, setAssignmentPoint] = useState(assignment?.point || 100);
  const [assignmentDueDate, setAssignmentDueDate] = useState(assignment?.dueDate || "");
  const [assignmentAvailableFromDate, setAssignmentAvailableFromDate] = useState(assignment?.availableFromDate || "");
  const [assignmentAvailableUntilDate, setAssignmentAvailableUntilDate] = useState(assignment?.availableUntilDate || "");
  
  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    console.log("New Assignment:", assignment); // 检查返回值
    dispatch(addAssignment(assignment));
  };
  
  const saveAssignment = async (assignment: any) => {
    // console.log("Params:", { cid, assignmentId ,title});

    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleSave = async () => {
    if (assignmentId === "new") {
      // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
      await createAssignmentForCourse();

    } else {
       const updatedAssignment={ _id: assignmentId, title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate };

      console.log("Updated Assignment:", updatedAssignment);
      await saveAssignment(updatedAssignment);
      // await saveAssignment(assignment);
      dispatch(updateAssignment(module));
      
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <form>
      <div id="wd-assignments-editor" className="row mb-3">

        {/* <p>Title: {assignmentName || "New Assignment"}</p>
      <p>Description: {assignmentDescription || "New Description"}</p>
      <p>Course: {cid}</p> 
      <p>ID: {assignmentId === "new" ? "New Assignment" : assignmentId}</p> */}
        <label htmlFor="wd-name" className="col col-form-label">
          Assignment Name
        </label>
        <div className="mb-3">
          <input
            id="wd-name"
            value={assignmentName || ""}
            placeholder="New Assignment Name"
            className="form-control col"
            onChange={(e) => setAssignmentName(e.target.value)}
          />

        </div>

        <div>
          <textarea
            id="wd-description"
            cols={50}
            rows={15}
            className="form-control ml-2 col"
            placeholder="New Assignment Description"
            onChange={(e) => setAssignmentDescription(e.target.value)}
          >
            {assignment && assignment.description || ""}
          </textarea>
        </div>
      </div>

      <div id="assignment-editScreen-downPart">
        <div className="wd-assignemnt-editScreen-offset">
          <div className="row mb-3">
            <label htmlFor="wd-points" className="col-sm-2 col-form-label ">
              Points{" "}
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="wd-points"
                value={assignmentPoint}
                onChange={(e) => setAssignmentPoint(Number(e.target.value) || 0)}
              />
            </div>{" "}
          </div>

          <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-2 col-form-label">
              {" "}
              Assignment Group
            </label>
            <div className="col-sm-10">
              <select id="wd-group" className="form-select">
                <option value="COMEDY">...</option>
                <option value="DRAMA">...</option>
                <option selected value="SCIFI">
                  ASSIGNMENTS
                </option>
                <option value="FANTASY">...</option>
              </select>
            </div>{" "}
          </div>

          <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-2 col-form-label">
              Display Grade As
            </label>
            <div className="col-sm-10">
              <select id="wd-display-grade-as" className="form-select">
                <option value="COMEDY">...</option>
                <option value="DRAMA">...</option>
                <option selected value="SCIFI">
                  Percentage
                </option>
                <option value="FANTASY">...</option>
              </select>
            </div>{" "}
          </div>

          <div className="row mb-3">
            <label
              htmlFor="wd-submission-type"
              className="col-sm-2 col-form-label"
            >
              Submission Type
            </label>
            <div className="col-sm-10">
              <div className="form-control">
                <select id="wd-submission-type" className="form-select">
                  <option value="COMEDY">...</option>
                  <option value="DRAMA">...</option>
                  <option selected value="SCIFI">
                    Percentage
                  </option>
                  <option value="FANTASY">...</option>
                </select>
                <label className="col col-form-label mt-2">
                  {" "}
                  Online Entry Options
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry{" "}
                  </label>{" "}
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-website-url"
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL{" "}
                  </label>{" "}
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-media-recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings{" "}
                  </label>{" "}
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
                    Student Annotation{" "}
                  </label>{" "}
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-text-entry"
                  />
                  <label className="form-file-upload" htmlFor="wd-file-upload">
                    File Uploads{" "}
                  </label>{" "}
                </div>{" "}
              </div>
            </div>{" "}
          </div>

          <div className="row mb-3">
            <label htmlFor="wd-assign" className="col-sm-2 col-form-label">
              Assign
            </label>

            <div className="col-sm-10">
              <div className="form-control">
                <label
                  htmlFor="wd-assign-to"
                  className="col-sm-2 col-form-label"
                >
                  Assign to
                </label>
                <div className="input-group mb-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="wd-assign-button"
                  >
                    Everyone
                  </button>
                  <input
                    type="text"
                    id="wd-assign-to"
                    className="form-control"
                  // placeholder="Everyone"
                  />
                </div>

                <label
                  htmlFor="wd-due-date"
                  className="col-sm-2 col-form-label"
                >
                  Due
                </label>
                <input
                  type="date"
                  id="wd-due-date"
                  defaultValue={`${assignment && assignment.dueDate}`}
                  className="form-control mb-3"
                  onChange={(e) => setAssignmentDueDate(e.target.value)}
                />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="wd-available-from"> Available from </label>
                    <input
                      type="date"
                      id="wd-available-from"
                      defaultValue={`${assignment && assignment.availableFromDate}`}
                      className="form-control"
                      onChange={(e) => setAssignmentAvailableFromDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="wd-available-until"> Until </label>
                    <input
                      type="date"
                      id="wd-available-until"
                      defaultValue={`${assignment && assignment.availableUntilDate}`}
                      onChange={(e) => setAssignmentAvailableUntilDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col text-end">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
              <button id="wd-cancel" className="btn btn-md btn-secondary me-1">
                Cancel{" "}
              </button>
            </Link>
            <button id="wd-submit" className="btn btn-md btn-danger me-1"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
