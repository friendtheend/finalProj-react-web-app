import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdBlockFlipped } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DeleteCheckDialog from "./DeleteCheckDialog";

export default function QuizSectionButtons({quiz1, qID, deleteQuiz, updateStatus}:
  { quiz1 : any,
    qID : string;
    deleteQuiz : (quizId : string) => void
    updateStatus : (quiz : any) => void
  }) 
{
  const { cid } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    console.log(`${option} clicked`);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const handleEditButtonClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qID}`, {
      state: { 
        cid,}, // pass data
    });
  };

  

  return (
    <div className="float-end"  ref={dropdownRef}>
      {quiz1.publish ? <GreenCheckmark /> : <MdBlockFlipped style={{ color: "red"}}/>}

      <IoEllipsisVertical 
      className="fs-4" 
      onClick={toggleDropdown}/>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "0",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyleType: "none", margin: 0, padding: "5px 0" }}>
            <li
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={handleEditButtonClick}
            >
              Edit
            </li>

            <li
              data-bs-toggle="modal" 
              data-bs-target="#delete-quiz-dialog"
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
                Delete
            </li>


            <li
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                
              }}
              onClick={() => {updateStatus({...quiz1, publish:!quiz1.publish}); setIsOpen(false)}}
            >
              {quiz1.publish ? "UnPublish" : "Publish"}
            </li> 

          </ul>
        </div>
      )}
      <DeleteCheckDialog
        quizId={qID}
        deleteQuiz={() => deleteQuiz(qID)}
      />
          
    </div>
    
  );
}
