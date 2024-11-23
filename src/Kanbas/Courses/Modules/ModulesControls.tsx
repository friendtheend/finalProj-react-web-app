import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import ProtectedFaculty from "../../ProtectedFaculty";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  return (
    <div
      id="wd-modules-controls"
      className="text-nowrap d-flex justify-content-end align-items-center"
    >
      {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
      {/* me： margin-end */}
      <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1">
        Collapse All{" "}
      </button>

      <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1">
        View Progress{" "}
      </button>

      <div className="dropdown d-inline me-1">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
              wd-unpublish-modules-only with labels Unpublish all modules and items
              and Unpublish modules only */}
          <li>
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              href="#"
            >
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="#"
            >
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      <ProtectedFaculty>
        <button
          id="wd-add-module-btn"
          className="btn btn-lg btn-danger me-1"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-module-dialog"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Module
        </button>
      </ProtectedFaculty>
      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
