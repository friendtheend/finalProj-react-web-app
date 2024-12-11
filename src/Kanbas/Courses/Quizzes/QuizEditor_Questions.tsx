import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { GoPencil } from "react-icons/go";

import {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz
} from "./reducer";
import {
    addQuestion,
    setQuestions,
  } from "./Questions/reducer";
import { format } from 'date-fns';
import { FaEllipsisV } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdBlockFlipped } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import QuizEditor_AddQuestion from "./Questions/QuizEditor_AddQuestion";
import AddQuestionPage from "./Questions/QuizEditor_AddQuestion"
import { createQuestionForQuiz } from "../client";


export default function QuizEditor_Questions({ questions }: { questions: any }) {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cid, quizId } = useParams();

    // const [questionAnswer, setQuestionAnswer] = useState(questions?.answer ?? "answer1");

    // const question = questions.find((q: any) => q._id === quizId);

    const handleSave = async () => {
        createQuestionForQuiz();
  
        setIsAddQuestionPage(false); // 切换回原始页面
      };
    
 
    const [questionAnswer, setQuestionAnswer] = useState(questions?.answer ?? "answer1");

    const [activeTab, setActiveTab] = useState("details");

    const createQuestionForQuiz = async () => {
        if (!cid) return;
        const newQuestion = {
            course: cid,
            name: "Introduction to Rocket Propulsion Question1",

        };


        const question = await coursesClient.createQuestionForQuiz(cid,quizId, newQuestion);
        console.log("New Question:", question);
        dispatch(addQuestion(question));
    };


    const saveQuiz = async (quiz: any) => {
        await quizzesClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };


    // const handleSave = async () => {
    //     if (questionId === "new") {
    //         // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
    //         await createQuizForCourse();

    //     } else {
    //         const updatedQuiz = {
    //             course: cid,
    //             _id: questionId,
                
    //             answer: questionAnswer,
    //         };

    //         console.log("Updated Assignment:", updatedQuiz);
    //         await saveQuiz(updatedQuiz);
    //         // await saveAssignment(assignment);
    //         dispatch(updateQuiz(module));

    //     }
    //     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    // };


    const createSpecialQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = {
            course: cid,
            answer: questionAnswer,
        };
        const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        console.log("New Quiz:", quiz);
        dispatch(addQuiz(quiz));
    };

    // const handleSpecialSave = async () => {
    //     if (questionId === "new") {
    //         // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
    //         await createSpecialQuizForCourse();

    //     } else {
    //         const updatedQuiz = {
    //             course: cid,
    //             _id: questionId,
    //             answer: questionAnswer,
    //         };

    //         console.log("Updated Assignment:", updatedQuiz);
    //         await saveQuiz(updatedQuiz);
    //         dispatch(updateQuiz(module));

    //     }
    //     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    // };





    const [isAddQuestionPage, setIsAddQuestionPage] = useState(false);

    // 处理点击 "Add Question" 按钮
    const handleAddQuestionButton = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/questions`);

        setIsAddQuestionPage(true); // 切换到添加问题页面
    };


    const handleCancel = () => {
        setIsAddQuestionPage(false); // 切换回原始页面
    };


    
    const fetchQuestions = async () => {
        const questions = await coursesClient.findQuestionsForQuiz(cid , quizId);
        dispatch(setQuestions(questions));
      };
    
    
    useEffect(() => {
 
    fetchQuestions();
    }, []);
  
// console.log("questions",questions)

    return (
        <div id="quiz-editor">
            {/* {isAddQuestionPage ? (
                // <AddQuestionPage 
                // // handleCancel={handleCancel}
                // // questions={questions}
                // />
            ) : ( */}
                <div>
             


               <ul id="wd-quiz-list" className="list-group rounded-0">
        <li className="wd-quiz-list-item list-group-item p-0 mb-0 fs-5 border-gray ">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* <BsGripVertical className="me-1 fs-3" /> */}
              
              Quiz Questions
            </div>
          </div>
        </li>

      </ul>



      {questions
          .map((question: any) => (


            <li key={question._id}  className="wd-quiz-list-item list-group-item p-0 mb-0 fs-5 border-gray">
              <div className="quiz-row d-flex wd-lesson p-3 ps-1 align-items-center justify-content-between">
                <div className="icon-left">
            
                </div>

                {/* details */}
                <div
                  className="quiz-details flex-grow-1 ps-1"
                  style={{ fontSize: "16px" }}
                >
                  <a
                    className="wd-quiz-link"
                    href={`#/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionEditor/${question._id}`}
                  >
                    <b>{question.description}</b>
                  </a>

                  {/* <a
                    className="wd-quiz-link"
                    href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                  >
                    <b>{quiz.title}</b>
                  </a> */}
             
<hr />
                  

                </div>


          
              </div>
            </li>
          ))}


      

                    <button
                        style={{
                            display: "block",
                            margin: "20px auto",
                            marginBottom: "10px",
                            padding: "10px 10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            background: "white",
                        }}
                        onClick={handleAddQuestionButton}
                    >
                        + New Question
                    </button>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
                        <button
                            style={{
                                padding: "10px 20px",
                                background: "#f8f9fa",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => alert("Cancel Clicked")}
                        >
                            Cancel
                        </button>
                        <button
                            style={{
                                padding: "10px 20px",
                                background: "#d9534f",
                                border: "none",
                                borderRadius: "5px",
                                color: "white",
                                cursor: "pointer",
                            }}
                            onClick = {handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            
        </div>
    );
    // return (
    //     <div id='quiz-questions'>
    //         {/* New Question Button */}
    //         <button
    //             style={{
    //                 display: "block",
    //                 margin: "20px auto", // 水平居中
    //                 marginBottom: "10px",
    //                 padding: "10px 10px",
    //                 border: "1px solid #ccc",
    //                 borderRadius: "5px",
    //                 background: "white",
    //                 // cursor: "pointer",
    //             }}
    //             onClick={handleAddQuestionButton}
    //         >
    //             + New Question
    //             <a
    //                     className="wd-quiz-link"
    //                     href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
    //                   >

    //                   </a>
    //         </button>

    //         {activeTab === "questions" && <QuizEditor_AddQuestion quizzes={quizzes} />}
    //         <hr />


    //         {/* Cancel and Save Buttons */}
    //         <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
    //             <button
    //                 style={{
    //                     padding: "10px 20px",
    //                     background: "#f8f9fa",
    //                     border: "1px solid #ccc",
    //                     borderRadius: "5px",
    //                     cursor: "pointer",
    //                 }}
    //                 onClick={() => alert("Cancel Clicked")}
    //             >
    //                 Cancel
    //             </button>
    //             <button
    //                 style={{
    //                     padding: "10px 20px",
    //                     background: "#d9534f",
    //                     border: "none",
    //                     borderRadius: "5px",
    //                     color: "white",
    //                     cursor: "pointer",
    //                 }}
    //                 onClick={() => alert("Save Clicked")}
    //             >
    //                 Save
    //             </button>
    //         </div>
    //     </div>
    // );
}


