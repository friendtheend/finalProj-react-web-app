// QuizControls.tsx

import { FaPlus } from "react-icons/fa6";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { FaEllipsisV } from "react-icons/fa";
import ProtectedFaculty from "../../ProtectedFaculty"
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuiz, editQuiz, updateQuiz } from "./reducer";
import { useState } from "react";


export default function QuizControls({
  addQuiz,
}: {
  addQuiz: () => void;
}) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddQuizButtonClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`, {
      state: { cid,}, // pass data
    });
  };



  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="search-container">
        <PiMagnifyingGlassThin className="search-icon" />
        <input
          id="wd-search-quiz"
          placeholder="Search for Quizzes"
          className="search-input  me-1"
        />
      </div>
      <ProtectedFaculty>
        <div className="d-flex ">
          <button
            id="wd-add-quiz"
            className="btn btn-md btn-danger me-1 "
            onClick={handleAddQuizButtonClick}
          >
            <FaPlus
              className="position-relative me-1"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>
          <button
            id="wd-add-quiz"
            className="btn btn-md"
            style={{
                backgroundColor: "white", // White background
                color: "gray", // Default text and icon color
                border: "1px solid black", // Black border
            }}        
        >
            <FaEllipsisV
              style={{
                bottom: "1px", 
                color: "gray", 
              }}
            />
          </button>
          

        </div>
      </ProtectedFaculty>
    </div>
  );
}