
export default function DeleteCheckDialog({
    isOpen,
    assignmentId,
    deleteAssignment,
    onClose,

  }: {
    isOpen: boolean;
    assignmentId: string;
    deleteAssignment: (assignmentId: string) => void;
    onClose: () => void;
  }) {
    if (!isOpen) return null;
    return (
        <div className="modal fade show" style={{ display: 'block' }} onClick={onClose}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this assignment?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => { deleteAssignment(assignmentId); onClose(); }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  