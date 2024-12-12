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

  // 获取 quiz 的总分
  function getQuizPoints(questions:any, quizId:any) {

    // 1. 找到所有属于当前 quizId 的问题
    const relatedQuestions = questions.filter((question: any) => question.quizId === quizId);

    // 2. 确保 pts 是数字，避免类型错误
    const totalPoints = relatedQuestions.reduce((sum: number, question: any) => {
      const pts = Number(question.pts);  // 确保 pts 是数字类型
      // console.log(`question: ${question.title}, pts: ${pts}`);  // 打印每个问题的 pts
      return sum + (isNaN(pts) ? 0 : pts);  // 如果 pts 不是有效数字，使用 0
    }, 0);  // 初始值为 0

    // console.log('Total Points:', totalPoints);  // 打印最终的总分
    return totalPoints

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
                    )} | <b>Due</b> {format(quiz.dueDate, "MMM d 'at' h a")} | {getQuizPoints(questions, quiz._id)} pts | {questions.filter((question:any) => question.quizId === quiz._id).length} Questions

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
