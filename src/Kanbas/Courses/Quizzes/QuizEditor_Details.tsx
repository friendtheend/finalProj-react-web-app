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
import { format } from 'date-fns';
import { FaEllipsisV } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdBlockFlipped } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";


export default function QuizEditor_Details({quizzes}:{quizzes:any}) {
const { cid, quizId } = useParams();
// const { quizzes } = useSelector((state: any) => state.quizzesReducer);
const quiz = quizzes.find((q: any) => q._id === quizId);
const dispatch = useDispatch();
const navigate = useNavigate();

const [quizType, setQuizType] = useState(quiz?.type ?? "Graded Quiz");
const [quizName, setQuizName] = useState(quiz?.title ?? "Unnamed Quiz");
const [quizAssignmentGroup, setAssignmentGroup] = useState(quiz?.assignmentGroup ?? "Quizzes");
const [quizShuffleAnswers, setShuffleAnswers] = useState(quiz?.shuffleAnswers ?? true);
const [quizTimeLimit, setTimeLimit] = useState(quiz?.timelimit ?? true);
const [quizTimeAllowed, setTimeAllowed] = useState(quiz?.timeallowed ?? 20);
const [quizAccessCode, setAccessCode] = useState(quiz?.accessCode ?? "");
const [quizmultiAttempts, setmultiAttempts] = useState(quiz?.multipleAttempts ?? false);
const [quizAttemptsAllowed, setAttemptsAllowed] = useState(quiz?.attemptsAllowed ?? 2);
const [quizshowCorrectAnswers, setshowCorrectAnswers] = useState(quiz?.showCorrectAnswers.show ?? false);
const [quizshowCorrectAnswers_when, setshowCorrectAnswers_when] = useState(quiz?.showCorrectAnswers.when ?? "Immediately");
const [quizoneQuestionAtATime, setoneQuestionAtATime] = useState(quiz?.oneQuestionAtATime ?? true);
const [quizlockQuestionAfterAnswering, setlockQuestionAfterAnswering] = useState(quiz?.lockQuestionAfterAnswering ?? false);
const [quizviewResults, setviewResults] = useState(quiz?.viewResults ?? false);
const [quizwebcamRequired, setwebcamRequired] = useState(quiz?.webcamRequired ?? false);
const [quizPoints, setPoint] = useState(quiz?.point ?? 0);
const [quizPublish, setPublish] = useState(quiz?.publish);
const [quizDesc, setDesc] = useState(quiz?.description ?? "new quiz");

const [quizDueDate, setQuizDueDate] = useState(quiz?.dueDate ?? "2024-09-01T09:00:00");
const [quizAvailableFromDate, setQuizAvailableFromDate] = useState(quiz?.availableFromDate ?? "2024-08-15T09:00:00");
const [quizAvailableUntilDate, setQuizAvailableUntilDate] = useState(quiz?.untilDate ?? "2024-09-01T09:00:00");
const [activeTab, setActiveTab] = useState("details");

console.log(quizAvailableFromDate)

const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = { 
        course: cid,
        title: quizName,
        type: quizType, 
        point: quizPoints, 
        assignmentGroup: quizAssignmentGroup, 
        question_nums: 0,
        shuffleAnswers: quizShuffleAnswers, 
        timeLimit: quizTimeLimit, 
        timeAllowed: quizTimeAllowed,
        multipleAttempts: quizmultiAttempts,
        attemptsAllowed: quizAttemptsAllowed, 
        showCorrectAnswers: {
          show: quizshowCorrectAnswers, 
          when: quizshowCorrectAnswers_when, 
        },
        accessCode: "", 
        oneQuestionAtATime: quizoneQuestionAtATime, 
        webcamRequired: quizwebcamRequired, 
        lockQuestionsAfterAnswering: quizlockQuestionAfterAnswering, 
        viewResults: quizviewResults,
        dueDate: quizDueDate, 
        availableFromDate: quizAvailableFromDate, 
        untilDate: quizAvailableUntilDate, 
        publish: quizPublish,
        description: quizDesc,};
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    console.log("New Quiz:", quiz); 
    dispatch(addQuiz(quiz));
  };
  

const saveQuiz = async (quiz : any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };


const handleSave = async () => {
    if (quizId === "new") {
      // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
      await createQuizForCourse();

    } else {
       const updatedQuiz={ 
        course: cid,
        _id: quizId,
        title: quizName,
        type: quizType, 
        point: quizPoints, 
        assignmentGroup: quizAssignmentGroup, 
        question_nums: 0,
        shuffleAnswers: quizShuffleAnswers, 
        timeLimit: quizTimeLimit, 
        timeAllowed: quizTimeAllowed,
        multipleAttempts: quizmultiAttempts,
        attemptsAllowed: quizAttemptsAllowed, 
        showCorrectAnswers: {
          show: quizshowCorrectAnswers, 
          when: quizshowCorrectAnswers_when, 
        },
        accessCode: quizAccessCode, 
        oneQuestionAtATime: quizoneQuestionAtATime, 
        webcamRequired: quizwebcamRequired, 
        lockQuestionsAfterAnswering: quizlockQuestionAfterAnswering, 
        viewResults: quizviewResults,
        dueDate: quizDueDate, 
        availableFromDate: quizAvailableFromDate, 
        untilDate: quizAvailableUntilDate, 
        publish: quizPublish,
        description: quizDesc,};

      console.log("Updated Assignment:", updatedQuiz);
      await saveQuiz(updatedQuiz);
      // await saveAssignment(assignment);
      dispatch(updateQuiz(module));
      
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };


  const createSpecialQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = { 
        course: cid,
        title: quizName,
        type: quizType, 
        point: quizPoints, 
        assignmentGroup: quizAssignmentGroup, 
        question_nums: 0,
        shuffleAnswers: quizShuffleAnswers, 
        timeLimit: quizTimeLimit, 
        timeAllowed: quizTimeAllowed,
        multipleAttempts: quizmultiAttempts,
        attemptsAllowed: quizAttemptsAllowed, 
        showCorrectAnswers: {
          show: quizshowCorrectAnswers, 
          when: quizshowCorrectAnswers_when, 
        },
        accessCode: "", 
        oneQuestionAtATime: quizoneQuestionAtATime, 
        webcamRequired: quizwebcamRequired, 
        lockQuestionsAfterAnswering: quizlockQuestionAfterAnswering, 
        viewResults: quizviewResults,
        dueDate: quizDueDate, 
        availableFromDate: quizAvailableFromDate, 
        untilDate: quizAvailableUntilDate, 
        publish: true,
        description: quizDesc,};
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    console.log("New Quiz:", quiz); 
    dispatch(addQuiz(quiz));
  };

  const handleSpecialSave = async () => {
    if (quizId === "new") {
      // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
      await createSpecialQuizForCourse();

    } else {
       const updatedQuiz={ 
        course: cid,
        _id: quizId,
        title: quizName,
        type: quizType, 
        point: quizPoints, 
        assignmentGroup: quizAssignmentGroup, 
        question_nums: 0,
        shuffleAnswers: quizShuffleAnswers, 
        timeLimit: quizTimeLimit, 
        timeAllowed: quizTimeAllowed,
        multipleAttempts: quizmultiAttempts,
        attemptsAllowed: quizAttemptsAllowed, 
        showCorrectAnswers: {
          show: quizshowCorrectAnswers, 
          when: quizshowCorrectAnswers_when, 
        },
        accessCode: quizAccessCode, 
        oneQuestionAtATime: quizoneQuestionAtATime, 
        webcamRequired: quizwebcamRequired, 
        lockQuestionsAfterAnswering: quizlockQuestionAfterAnswering, 
        viewResults: quizviewResults,
        dueDate: quizDueDate, 
        availableFromDate: quizAvailableFromDate, 
        untilDate: quizAvailableUntilDate, 
        publish: true,
        description: quizDesc,};

      console.log("Updated Assignment:", updatedQuiz);
      await saveQuiz(updatedQuiz);
      dispatch(updateQuiz(module));
      
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };



// const fetchQuizzes = async () => {
//     const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
//     dispatch(setQuizzes(quizzes));
//   };

// useEffect(() => {
//     fetchQuizzes();
// }, []);

return (
          
    <div id='quiz-details'>
        <div id="quiz-editScreen-downPart">
                <input
                    id="wd-name"
                    value={quizName}
                    className="form-control col"
                    onChange={(e) => setQuizName(e.target.value)}
                    style={{ width: "50%" }}
                />
                <br/>

                <label
                  
                    style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
                    Quiz instructions:
                </label>
                <ReactQuill
                id="quiz-quizInstructions"
                    value={quizDesc}
                    onChange={(e) => setDesc(e)}
                    modules={{
                        toolbar: [
                        [{ font: [] }, { size: [] }], // Font and size dropdowns
                        [{ header: [1, 2, 3, false] }], // Optional headers
                        [{ bold: true }, "|", "italic", "underline", "strike"], // Add "|" separator
                        [{ color: [] }, { background: [] }], // Text and background color
                        [{ list: "ordered" }, { list: "bullet" }], // Lists
                        [{ align: [] }], // Alignment
                        ["link", "image"], // Media options
                        ["clean"], // Clear formatting
                        ],
                    }}
                    formats={[
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "list",
                        "bullet",
                        "align",
                        "link",
                        "image",
                    ]}

                    style={{
                        border: "1px solid #ddd", // Border for the text editor
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}
                />
                <br/>

                <div className="wd-assignemnt-editScreen-offset">
                        <div className="row mb-3">
                            <label htmlFor="wd-quizType" className="col-sm-4 text-end col-form-label "  style={{ fontWeight: 'bold' }}>
                                Quiz Type
                            </label>
                            <div className="col-sm-8 text-start">
                                <select id="wd-quizType" className="form-select"
                                value={quizType}
                                onChange={(e) => setQuizType(e.target.value)} 
                                style={{ width: "50%" }}>
                                    <option value="Graded Quiz">Graded Quiz</option>
                                    <option value="Practice Quiz">Practice Quiz</option>
                                    <option value="Graded Survey">Graded Survey</option>
                                    <option value="Ungraded Survey">Ungraded Survey</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label  htmlFor="wd-assignmentGroup" className="col-sm-4 text-end col-form-label "  style={{ fontWeight: 'bold' }}>
                                Assignment Group
                            </label>
                            <div className="col-sm-8 text-start">
                                <select id="wd-assignmentGroup" className="form-select"
                                value={quizAssignmentGroup}
                                onChange={(e) => setAssignmentGroup(e.target.value)} 
                                style={{ width: "50%" }}>
                                    <option value="Quizzes">Quizzes</option>
                                    <option value="Exams">Exams</option>
                                    <option value="Assignments">Assignments</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="wd-QuizAccessCode" className="col-sm-4 text-end col-form-label "  style={{ fontWeight: 'bold' }}>
                                Access Code
                            </label>
                            <div className="col-sm-8 text-start">
                            <input
                                id="wd-QuizAccessCode"
                                value={quizAccessCode}
                                className="form-control col"
                                onChange={(e) => setAccessCode(e.target.value)}
                                style={{ width: "50%" }}
                            />
                            </div>
                        </div>

                        <div className="row mb-1">
                            <label htmlFor="wd-quizShuffleAnswers" className="col-sm-4 text-end"  style={{ fontWeight: 'bold' }}>
                                
                            </label>
                            <div className="col-sm-8 text-start">
                                <label className="col-form-label "  style={{ fontWeight: 'bold' }}>
                                    Options
                                </label>
                                <br/>
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="wd-quizShuffleAnswers"
                                    checked = {quizShuffleAnswers}
                                    onChange={(e) => setShuffleAnswers(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-quizShuffleAnswers">
                                    Shuffle Answers{" "}
                                </label>
                                <br/>
                                <br/>
                                
                                <div
                                style={{
                                    display: "flex", 
                                    alignItems: "center",
                                }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        id="quiz-TimeLimit"
                                        checked={quizTimeLimit}
                                        onChange={(e) => setTimeLimit(e.target.checked)}
                                        />
                                        <label className="form-check-label me-5" htmlFor="quiz-TimeLimit">
                                            Time Limit
                                        </label>
                                    </div>

                                    {quizTimeLimit && (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <input
                                            className="form-check-input me-1"
                                            id="quiz-minutes"
                                            value={quizTimeAllowed}
                                            style={{
                                            width: "50px", 
                                            height: "30px", 
                                            }}
                                            onChange={(e) => setTimeAllowed(Number(e.target.value))}
                                            type="number"
                                            min="1"
                                        />
                                        <label className="form-check-label" htmlFor="quiz-minutes">
                                            Minutes
                                        </label>
                                        </div>
                                    )}
                                </div>
                                <br/>
                                
                                <div
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    display: "flex", 
                                    alignItems: "center",
                                    gap: "20px", 
                                }}
                                >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="quiz-AllowMultipleAttempts"
                                    checked={quizmultiAttempts}
                                    onChange={(e) => setmultiAttempts(e.target.checked)}
                                    />
                                    <label className="form-check-label me-5" htmlFor="quiz-AllowMultipleAttempts">
                                        Allow Multiple Attempts
                                    </label>
                                </div>

                                {quizmultiAttempts && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                        className="form-check-input me-2"
                                        id="quiz-AttemptsAllowed"
                                        style={{
                                        width: "50px", 
                                        height: "30px", 
                                        }}
                                        value = {quizAttemptsAllowed}
                                        onChange={(e) => setAttemptsAllowed(Number(e.target.value))}
                                        type="number"
                                        min="2"
                                        step = "1"
                                    />
                                    <label className="form-check-label" htmlFor="quiz-AttemptsAllowed">
                                        Attempts Allowed
                                    </label>
                                    </div>
                                )}
                                </div>
                                <br/>

                                <div
                                style={{
                                    display: "flex", 
                                    alignItems: "center",
                                }}
                                >
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="quiz-ShowCorrectAnswers"
                                    checked = {quizshowCorrectAnswers}
                                    onChange={(e) => setshowCorrectAnswers(e.target.checked)}
                                />
                                    <label className="form-check-label me-5" htmlFor="quiz-ShowCorrectAnswers">
                                        Show Correct Answers{" "}
                                    </label>

                                {quizshowCorrectAnswers && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <label className="form-check-label" htmlFor="quiz-minutes">
                                            When
                                        </label>
                                    <input
                                        className="form-check-input me-1"
                                        id="quiz-minutes"
                                        value={quizshowCorrectAnswers_when}
                                        style={{
                                        width: "120px", 
                                        height: "30px", 
                                        }}
                                        onChange={(e) => setshowCorrectAnswers_when(e.target.value)}

                                    />
                                    </div>
                                )}
                                </div>
                                <br/>

                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="quiz-oneQuestionAtATime"
                                    checked = {quizoneQuestionAtATime}
                                    onChange={(e) => setoneQuestionAtATime(e.target.checked)}
                                />
                                    <label className="form-check-label" htmlFor="quiz-oneQuestionAtATime">
                                        One Question at a Time{" "}
                                    </label>
                                <br/>
                                <br/>

                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="quiz-WebcamRequired"
                                    checked = {quizwebcamRequired}
                                    onChange={(e) => setwebcamRequired(e.target.checked)}
                                />
                                    <label className="form-check-label" htmlFor="quiz-WebcamRequired">
                                        Webcam Required{" "}
                                    </label>
                                <br/>
                                <br/>

                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="quiz-LockQuestions"
                                    checked = {quizlockQuestionAfterAnswering}
                                    onChange={(e) => setlockQuestionAfterAnswering(e.target.checked)}
                                />
                                    <label className="form-check-label" htmlFor="quiz-LockQuestions">
                                        Lock Questions After Answering{" "}
                                    </label>
                                <br/>
                                <br/>

                            </div>
                        </div>
               
                    <br/>
                    <div className="row mb-3" >

                        <label className="col-sm-4 col-form-label text-end" style={{ fontWeight: 'bold' }}>
                            Assign
                        </label>

                        <div className="col-sm-8" style={{ width: "50%" }}>
                            <div className="form-Assign">
                                <label
                                htmlFor="wd-assign-to"
                                className="col-sm-2 col-form-label"
                                >
                                Assign to
                                </label>
                                <div className="input-group mb-2">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    id="wd-assign-button"
                                >
                                    Everyone
                                </button>
                                <input
                                    type="text"
                                    id="wd-assign-to"
                                    className="form-control"
                                />
                                </div>

                                <label
                                htmlFor="wd-due-date"
                                className="col-sm-2 col-form-label"
                                >
                                    Due
                                </label>
                                <input
                                type="datetime-local"
                                id="wd-due-date"
                                defaultValue={quizDueDate.slice(0, 19)}
                                className="form-control mb-3"
                                onChange={(e) => setQuizDueDate(e.target.value)}
                                />

                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="wd-available-from"> Available from </label>
                                        <input
                                        type="datetime-local"
                                        id="wd-available-from"
                                        defaultValue={quizAvailableFromDate.slice(0, 19)}
                                        className="form-control"
                                        onChange={(e) => setQuizAvailableFromDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="wd-available-until"> Until </label>
                                        <input
                                        type="datetime-local"
                                        id="wd-available-until"
                                        defaultValue={quizAvailableUntilDate.slice(0, 19)}
                                        onChange={(e) => setQuizAvailableUntilDate(e.target.value)}
                                        className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>                       
                    </div>  

                    <div className="row mb-3 align-items-center">

                        <label
                            className="col-sm-6 col-form-label"
                        >
                        </label>

                        <div className="col-md-1 text-center" style={{ paddingRight: "0" }}>
                            <hr style={{ margin: "10px auto", width: "100%" }} />
                                <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                                    <button className="btn btn-md btn-secondary">
                                        Cancel
                                    </button>
                                </Link>
                            <hr style={{ margin: "10px auto", width: "100%" }} />
                        </div>

                        <div className="col-md-1 text-center" style={{ paddingLeft: "0" }}>
                            <hr style={{ margin: "10px auto", width: "80%" }} />
                                <button className="btn btn-md btn-danger" onClick = {handleSave}>
                                    Save
                                </button>
                            <hr style={{ margin: "10px auto", width: "80%" }} />
                        </div>

                        <div className="col-md-2 text-center" style={{ paddingLeft: "0" }}>
                            <hr style={{ margin: "10px auto", width: "80%" }} />
                                <button className="btn btn-md btn-primary" onClick = {handleSpecialSave}>
                                    Save and Publish
                                </button>
                            <hr style={{ margin: "10px auto", width: "80%" }} />
                        </div>
                    </div>


            </div>
        </div>

    </div>

  );
}


