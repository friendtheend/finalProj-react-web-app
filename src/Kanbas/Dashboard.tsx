import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseNavCard from "./CourseNavCard";
import * as db from "./Database";
import { useDispatch, useSelector } from "react-redux";
import ProtectedFaculty from "./ProtectedFaculty";
import ProtectedStudent from "./ProtectedStudent";
import { enrollCourse, loadEnrollments, unenrollCourse } from "./enrollReducer";
import * as enrollmentsClient from "./Courses/People/client";
import { setCourses } from "./enrollReducer";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";
import { addEnroll, deleteEnroll, setEnroll } from "./Courses/People/reducer";
import { create } from "domain";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const userEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.user === currentUser._id
  );


  const dispatch = useDispatch();
  const [coursesView, setCoursesView] = useState("0");


  const toggleCoursesView = () => {

    setCoursesView((prev) => {
      if (prev === "none") return "all";
      if (prev === "all") return "my";
      return "none";
    });
  };

  const createEnroll = async (enrollId: any, user: any, course: any) => {
    const newEnrollment: any = {
      // 使用时间戳作为唯一ID
      _id: enrollId,
      user: user,
      course: course,
    };
    const response = await enrollmentsClient.updateEnroll(newEnrollment);
    console.log(response.date)
    dispatch(addEnroll(newEnrollment));
    fetchEnrollments();
  };


  const fetchEnrollments = async () => {
    const data = await coursesClient.fetchAllEnrollments();
    dispatch(setEnroll(data));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);


  const handleUnenroll = async (userId: any, course: any) => {

    const deleteEnrollmentId = enrollments
      .filter((enrollment: any) => enrollment.user === userId && enrollment.course === course)
      .map((enrollment: any) => String(enrollment._id));


    // console.log(deleteEnrollmentId)
    const response = await enrollmentsClient.deleteEnroll(deleteEnrollmentId);

    // console.log(response.date)
    dispatch(deleteEnroll(deleteEnrollmentId));
    fetchEnrollments();
  };



  return (
    <div id="wd-dashboard">
      {/* <hr /> 是 Kanbas Dashboard 下面那一行分界线*/}
      <h1 id="wd-dashboard-title"> Kanbas Dashboard</h1> <hr />
      <ProtectedFaculty>
        <h5>
          New Course
          {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name || ""}
          placeholder="New Course Name"
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description || ""}
          placeholder="New Description"
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <hr />

        {/* <pre>{JSON.stringify(courses, null, 2)}</pre> */}
      </ProtectedFaculty>






      <ProtectedStudent>
        <h5>
          {coursesView === "none"
            ? "Show All Courses"
            : coursesView === "all"
              ? "Show My Courses"
              : ""}

          {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre>

          <pre>{JSON.stringify(userEnrollments, null, 2)}</pre> */}

          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={toggleCoursesView}
          >
            {" "}
            Enrollments{" "}
          </button>
          <br />

          <br />

          {coursesView === "none" ? (
            courses.map((course) => (
              <ul className="list-group">
                <li key={course._id} className="list-group-item">
                  <span>{course.name}</span>
                  {userEnrollments.some(
                    (enrollment: any) => enrollment.course === course._id
                  ) ? (
                    <button
                      onClick={() => handleUnenroll(currentUser._id, course._id)}
                      className="btn btn-danger btn-sm float-end ms-2"
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button

                      className="btn btn-success btn-sm float-end"
                      onClick={(event) => {
                        event.preventDefault();
                        createEnroll(
                          Date.now().toString(),
                          currentUser._id,
                          course._id

                        );

                      }

                      }   >
                      Enroll
                    </button>
                  )}
                </li>
              </ul>
            ))
          ) : coursesView === "all" ? (
            courses
              .filter((course) =>
                userEnrollments.some(
                  (enrollment: any) => enrollment.course === course._id
                )
              )
              .map((course) => (
                <ul className="list-group">
                  <li key={course.id} className="list-group-item">
                    <span>{course.name}</span>

                    <button
                      onClick={() =>
                        handleUnenroll(currentUser._id, course._id)
                      }
                      className="btn btn-danger btn-sm float-end ms-2"
                    >
                      Unenroll
                    </button>
                  </li>
                </ul>
              ))
          ) : (
            <p>Click right blue button to display.</p>
          )}
        </h5>
        <br />

        <hr />
      </ProtectedStudent>


      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {/* 课程1 */}

        {/* row-cols-1:在小屏幕设备（比如手机）上，每行显示一列 */}
        {/* row-cols-md-5：在中等及更大屏幕设备上（如平板、桌面显示器），每行显示 5 列。 */}
        {/* g 代表gutter，即网格系统中的列与列之间的间距。 */}
        {/* g4 = 24px */}

        {/* <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-5 g-4"
          style={{ rowGap: "35px" }}
        > */}
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) =>
              enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            )
            .map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src={course.image} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      ></p>
                      {course.description}
                      <br />
                      <br />
                      <button className="btn btn-primary"> Go </button>


                      <ProtectedFaculty>
                        {/* The preventDefault() is preventing the default behavior of the button.  */}
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </ProtectedFaculty>

                    </div>
                  </Link>

                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
