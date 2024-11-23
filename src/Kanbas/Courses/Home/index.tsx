import ProtectedFaculty from "../../ProtectedFaculty";
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div>
      <div className="d-flex me-3" id="wd-home">
        {/* me： margin-end */}
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-md-block">
          <ProtectedFaculty>
          <CourseStatus />
          </ProtectedFaculty>
        </div>
      </div>
    </div>
  );
}
