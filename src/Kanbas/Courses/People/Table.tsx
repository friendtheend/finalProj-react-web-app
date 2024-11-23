import { FaUserCircle } from "react-icons/fa";
import * as db from "../../Database";
import { useParams } from "react-router";
export default function PeopleTable() {
  const { cid } = useParams();

  // filter can get all info if they match filter requirement
  // map can literate all course_enrollment, use db.users.find() to get all info

  // <pre>{JSON.stringify(enrolledUser, null, 2)}</pre>
  // use above to print data in screen
  const { users, enrollments } = db;

  // const course_enrollment = db.enrollments.filter(
  //   (enroll) => enroll.course === cid
  // );
  // const enrolledUser = course_enrollment.map((enrollment) =>
  //   db.users.find((userInfo) => userInfo._id === enrollment.user)
  // );

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((usr) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === usr._id && enrollment.course === cid
              )
            )
            .map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap" key={user._id}>
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">
                    {user.firstName}
                  </span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>{" "}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
