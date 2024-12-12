// icons
import { BsGripVertical } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { MdRocketLaunch } from "react-icons/md";
// self-define
import QuizControls from "./QuizControls";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} from "./reducer";
// std
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { format } from 'date-fns';
import QuizSectionButtons from "./QuizSectionButtons";
import {findQuestionsForQuiz} from "../client";
import accountReducer from "../../Account/reducer";
import { setQuestions } from "./Questions/reducer";


export default function Quizzes() {
  const { cid } = useParams();
  const [QuizName, setQuizName] = useState("");
  const [selectedquizID, setSelectedQuizID] = useState("Null")
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [role, setROLE] = useState(currentUser.role);
  const now = new Date(); // 日期判断
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const dispatch = useDispatch();
  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = { name: QuizName, course: cid };
    const quiz = await coursesClient.createAssignmentForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
  };

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };


  const updateStatus = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const fetchQuestions = async () => {
    const questions = await coursesClient.findQuestionsForCourse(cid);
    dispatch(setQuestions(questions));
  };


  function calculateTotalPoints(question_total:any ) {
    // Use reduce to sum up the pts for each question
    return question_total.reduce((total:any, question:any) => total + (question.pts || 0), 0);
  }


  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);



  return (

    <div id="wd-quizzes">
      <div>
        <QuizControls
          addQuiz={createQuizForCourse}
        />
      </div>
      <hr />

      <ul id="wd-quizLlist" className="list-group rounded-0">
        <li className="wd-quiz-list-item list-group-item p-0 mb-0 fs-5 border-gray ">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* <BsGripVertical className="me-1 fs-3" /> */}
              <TbTriangleInvertedFilled
                className="me-2"
                style={{ fontSize: "10px" }}
              />
              Assignment Quizzes
            </div>
          </div>
        </li>

        {quizzes
          .map((quiz: any) => (

            ((role !== 'STUDENT') || quiz.publish)  && (
            <li key={quiz._id} className="wd-quiz-list-item list-group-item p-0 mb-0 fs-5 border-gray">
              <div className="quiz-row d-flex wd-lesson p-3 ps-1 align-items-center justify-content-between">
                <div className="icon-left">
                  <MdRocketLaunch
                    className="ms-3 me-3"
                    style={{ fontSize: "24px", color: "green" }}
                  />
                </div>

                {/* details */}
                <div
                  className="quiz-details flex-grow-1 ps-1"
                  style={{ fontSize: "16px" }}
                >
                  <a
                    className="wd-quiz-link"
                    href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                  >
                    <b>{quiz.title}</b>
                  </a>
                  <br />

                  {new Date(quiz.availableFromDate) > now ? (
                    <>
                      <b>Not available until</b>{" "}
                      {format(quiz.availableFromDate, "MMM d 'at' h a")}
                    </>) :

                    now > new Date(quiz.dueDate) ? (<b>Closed</b>) : (
                      <>
                        <b>Available</b>{" "} {format(quiz.availableFromDate, "MMM d 'at' h a")}
                      </>
                    )} | <b>Due</b> {format(quiz.dueDate, "MMM d 'at' h a")} | {calculateTotalPoints(questions.filter((question:any) => question.quizId === quiz._id))} pts | {questions.filter((question:any) => question.quizId === quiz._id).length} Questions

                </div>


                {/* 右边的Icon */}
                {(role !== 'STUDENT') && (
                <div className="icon-right" onClick={() => setSelectedQuizID(quiz._id)}>
                  <QuizSectionButtons
                    quiz1={quiz}
                    qID={selectedquizID}
                    deleteQuiz={(qID) => removeQuiz(qID)}
                    updateStatus={(quiz) => updateStatus(quiz)} />
                </div>)}
                    
              </div>
            </li>
            )
          ))}
      </ul>



    </div>
  );
}
