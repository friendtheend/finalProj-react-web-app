import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import { GoPencil } from "react-icons/go";
import { format } from 'date-fns';
import {
    setQuizzes,
  } from "./reducer";
import { setQuestions } from "./Questions/reducer";
import accountReducer from "../../Account/reducer";

export default function QuizDetails() {
    const { cid, quizId } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [role, setROLE] = useState(currentUser.role);

    const quiz = quizzes.find((q: any) => q._id === quizId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quizType, setQuizType] = useState(quiz?.type ?? "Graded Quiz");
    const [quizName, setQuizName] = useState(quiz?.title ?? "Default Name");
    const [quizAssignmentGroup, setAssignmentGroup] = useState(quiz?.assignmentGroup ?? "Quizzes");
    const [quizShuffleAnswers, setShuffleAnswers] = useState(quiz?.shuffleAnswers ?? true);
    const [quizTimeLimit, setTimeLimit] = useState(quiz?.timelimit ?? true);
    const [quizTimeAllowed, setTimeAllowed] = useState(quiz?.timeAllowed ?? 30);
    const [quizmultiAttempts, setmultiAttempts] = useState(quiz?.multipleAttempts ?? false);
    const [quizAttemptsAllowed, setAttemptsAllowed] = useState(quiz?.attemptsAllowed ?? 2);
    const [quizshowCorrectAnswers, setshowCorrectAnswers] = useState(quiz?.showCorrectAnswers.show ?? false);
    const [quizshowCorrectAnswers_when, setshowCorrectAnswers_when] = useState(quiz?.showCorrectAnswers.when ?? "-");
    const [quizoneQuestionAtATime, setoneQuestionAtATime] = useState(quiz?.oneQuestionAtATime ?? true);
    const [quizlockQuestionAfterAnswering, setlockQuestionAfterAnswering] = useState(quiz?.lockQuestionsAfterAnswering ?? false);
    const [quizviewResults, setviewResults] = useState(quiz?.viewResults ?? false);
    const [quizwebcamRequired, setwebcamRequired] = useState(quiz?.webcamRequired ?? false);
    const [quizPoints, setPoint] = useState(quiz?.point ?? false);

    const [quizDueDate, setQuizDueDate] = useState(quiz?.dueDate ?? "2024-09-01T09:00:00");
    const [quizAvailableFromDate, setQuizAvailableFromDate] = useState(quiz?.availableFromDate ?? "2024-08-15T09:00:00");
    const [quizAvailableUntilDate, setQuizAvailableUntilDate] = useState(quiz?.untilDate ?? "2024-09-01T09:00:00");




    const EditButtonClick = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };

    const PreviewButtonClick = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/preview`);
    };

    const DoButtonClick = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/do`);
    };




    return (
        <div>
        { role === 'STUDENT' && new Date() > new Date(quizDueDate) ? 
        (    
            <div>
                <br />
                <hr />
                quiz is closed
            </div>
        )
        :
        (<form>
            <div id='quiz-details'>
                <div id='quiz-option' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    {role === 'STUDENT' && (
                        <button className="btn btn-md btn-secondary me-1" onClick={DoButtonClick}>
                            Do
                        </button>
                    )}

                    {role === 'FACULTY' && (
                        <>
                            <button className="btn btn-md btn-secondary me-1" onClick={PreviewButtonClick}>
                                Preview
                            </button>
                            <button className="btn btn-md btn-secondary me-1" onClick={EditButtonClick}>
                                <GoPencil />
                                Edit
                            </button>
                        </>
                    )}

                </div>
                <br /><hr />

                <p style={{ fontSize: '40px', fontWeight: 'bold' }}>{quizName}</p>

                <div id="quiz-editScreen-downPart">
                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Quiz Type{" "}
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizType}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Points
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizPoints}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Assignment Group
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizAssignmentGroup}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Shuffle Answer
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizShuffleAnswers ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Time Limit
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizTimeLimit ? `${quizTimeAllowed} mintues` : "Unlimited"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Multiple Attempts
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizmultiAttempts ? quizAttemptsAllowed : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            View Responses
                        </label>
                        <div className="col-sm-8 text-start">
                            Always
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Show Correct Answers
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizshowCorrectAnswers ? quizshowCorrectAnswers_when : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            One Question at a Time
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizoneQuestionAtATime ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Require Respondus LockDown
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizlockQuestionAfterAnswering ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Browser
                        </label>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Required to View Quiz Results
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizviewResults ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Webcam Required
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizwebcamRequired ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="row mb-1">
                        <label htmlFor="wd-points" className="col-sm-4 text-end" style={{ fontWeight: 'bold' }}>
                            Lock Questions After Answering
                        </label>
                        <div className="col-sm-8 text-start">
                            {quizlockQuestionAfterAnswering ? "Yes" : "No"}
                        </div>
                    </div>

                </div>

                <div className="container mt-5">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col"> Due </th>
                            <th scope="col"> For </th>
                            <th scope="col"> Available from </th>
                            <th scope="col"> Until </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td> {format(quizDueDate, "MMM d 'at' h a")} </td>
                            <td> Everyone </td>
                            <td> {format(quizAvailableFromDate, "MMM d 'at' h a")} </td>
                            <td> {format(quizAvailableUntilDate, "MMM d 'at' h a")} </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </form>)}
        </div>

    );

}
