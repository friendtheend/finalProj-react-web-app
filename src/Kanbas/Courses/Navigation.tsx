import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { courses } from "../Database";
import { useParams } from "react-router";
export default function CoursesNavigation() {
  const { cid } = useParams();
  // const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    // list-group-item 变成表格 给这些全都框起来
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          id={`wd-course-home-link-${link}`}
          to={`/Kanbas/Courses/${cid}/${link}`}
          className={`list-group-item border border-0 
              ${
                pathname.includes(link) ? "text-black bg-white active" : "text-danger "
              }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
