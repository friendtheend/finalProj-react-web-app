import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useState } from "react";
import * as db from "../Database";
import { addAssignment } from "./Assignments/reducer";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [assignments, setAssignments] = useState<any[]>(db.assignments);
  const [assignment, setAssignment] = useState<any>({
    _id: "66666",
    title: "New Assignment",
    course: "RS101",
    description:
      "\nThe assignment is available online. \n\nSubmit a link to the landing page of your Web application running on Netlify. \n\nThe landing page should include the following: \n\n • Your full name and section \n • Links to each of the lab assignments \n • Link to the Kanbas application \n • Links to all relevant source code repositories \n\n The Kanbas application should include a link to navigate back to the landing page.",
    point: 100,
    dueDate: "2000-05-13",
    availableDate: "2000-05-06",
  });

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={
                <AssignmentEditor
                // assignmentName={assignmentName}
                // setAssignmentName={setAssignmentName}
                // addAssignment={addAssignment}
                />
              }
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
