export default function DeleteCheckDialog({
    quizId,
    deleteQuiz,

  }: {
    quizId: string;
    deleteQuiz: (quizId: string) => void;
  }) {
    return (
        <div id="delete-quiz-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this quiz?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteQuiz(quizId)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  