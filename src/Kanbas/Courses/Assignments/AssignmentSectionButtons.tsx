import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import DeleteCheckDialog from "./DeleteCheckDialog";
import { useState } from "react";

export default function AssignmentSectionButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsDialogOpen(true); // 点击垃圾桶时打开对话框
  };

  return (
    <div className="float-end">
          <FaTrash
        className="text-danger me-2 mb-1"
        // data-bs-dismiss="modal"
        onClick={handleDeleteClick} 
      />
      <DeleteCheckDialog
        isOpen={isDialogOpen}
        assignmentId={assignmentId}
        deleteAssignment={() => {
          deleteAssignment(assignmentId); 
          setIsDialogOpen(false); 
        }}
        onClose={() => setIsDialogOpen(false)} 
      />

      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
