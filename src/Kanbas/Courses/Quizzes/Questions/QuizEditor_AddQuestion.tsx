import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as coursesClient from "../../client";
import * as questionsClient from "./client";
import * as quizzesClient from "../client";
import { GoPencil } from "react-icons/go";
import DOMPurify from "dompurify";
import {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz
} from "../reducer";
import { format } from 'date-fns';
import { FaEllipsisV } from "react-icons/fa";
import GreenCheckmark from "../../Modules/GreenCheckmark";
import { MdBlockFlipped } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

import {
    addQuestion,
    setQuestions,
    updateQuestion,
} from "../Questions/reducer";
// 添加新的答案
// const handleAddAnswer = () => {
//     const newAnswer = {
//         id: Date.now(), // 使用时间戳生成唯一ID
//         text: "",
//         isCorrect: false,
//     };
//     setAnswers([...answers, newAnswer]);
// };



export default function AddQuestionPage(
    //     {
    // //     // handleCancel,
    //     questions

    // }: {

    // //     handleCancel: () => void
    //     questions: any;
    // }

) {
    const { cid, quizId, questionId } = useParams();


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions } = useSelector((state: any) => state.questionsReducer);
    console.log("Questions in component:", questions);
    const question = questions.find((q: any) => q._id === questionId);
    // const [questionId, setQuestionId] = useState(question?._id ?? "New");

    const [answers, setAnswers] = useState(
        question?.answers ?? [] // 初始化为空数组
      );
    const [questionDescription, setQuestionDescription] = useState(question?.description ?? "no Description");
    const [questionPts, setQuestionPts] = useState(question?.pts ?? "10");
    const [questionTitle, setQuestionTitle] = useState(question?.title ?? "default title");
    const [questionType, setQuestionType] = useState(question?.type ?? "Multiple Choice");
    const [isAddQuestionPage, setIsAddQuestionPage] = useState(false);

    const handleAnswerChange = (index: any, value:any) => {
        // const updatedAnswers = [...answers];
        // updatedAnswers[index].text = value;
        const updatedAnswers = answers.map((answer:any, i:any) =>
            i === index ? { ...answer, text: value } : answer // 创建新对象
          );
        setAnswers(updatedAnswers);
      };
      
      const handleAddAnswer = () => {
        setAnswers([...answers, { _id: new Date().getTime(), text: "", isCorrect: false }]);
      };
      
      const handleDeleteAnswer = (index: any) => {
        setAnswers(answers.filter((_: { id: any; text: any; isCorrect: any }, i: any) => i !== index));
      };
      

    const renderAnswersSection = () => {
        switch (questionType) {
            case "True/False":
              
                return (
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="correctAnswer"
                            // value="True"
                            // onChange={() => setCorrectAnswer("True")}
                            />
                            True
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="correctAnswer"
                            // value="False"
                            // onChange={() => setCorrectAnswer("False")}
                            />
                            False
                        </label>
                    </div>
                );

            case "Multiple Choice":
               
                return (
                    <div>
                        {answers.map((answer:any, index:any) => (
                            <div key={index} className="d-flex align-items-left ms-2">
                                <label className="col-sm-4 text-end col-form-label " style={{ fontWeight: 'bold' }}>
                                    Possible Answer
                                </label>
                                <input
                                    type="text"

                                    //   value={answer}
                                    //   onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="form-control"
                                    // placeholder={`Possible Answer ${index + 1}`}
                                    style={{ width: '40%' }}
                                />
                                <div className="row mb-3">


                                </div>
                                {/* <button onClick={() => handleDeleteAnswer(index)}>Delete</button> */}
                            </div>
                        ))}
                        <button
                            style={{
                                marginTop: "10px",
                                marginLeft: "auto",
                                color: "#007bff",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                            }}
                            onClick={handleAddAnswer}
                        >
                            + Add Another Answer
                        </button>
                    </div>
                );

            case "Fill In the Blank":
              
                return (
                    <div>
                        {answers.map((answer:any, index:any) => (
                            <div key={index} className="d-flex align-items-center">
                                <label className="col-sm-4 text-end col-form-label " style={{ fontWeight: 'bold' }}>
                                    Possible Answer
                                </label>
                                <input
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="form-control"
                                    // placeholder={`Possible Answer ${index + 1}`}
                                    style={{ width: '50%' }}
                                />
                                <button
                                    className="btn btn-danger btn-sm ms-auto"
                                onClick={() => handleDeleteAnswer(index)}

                                >Delete</button>
                            </div>
                        ))}
                        <button
                            style={{
                                marginTop: "10px",
                                marginRight: "auto",
                                color: "#007bff",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                            }}
                            onClick={handleAddAnswer}
                        >
                            + Add Another Answer
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };





    // const handleAddAnswer = () => {
    //     setAnswers([...answers, ""]); // 添加一个新的空答案
    // };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };



    const handleSave = async () => {

        const updatedQuestion = {
            _id: questionId,
            quizId: quizId,
            description: questionDescription,
            course: cid,
            pts: questionPts,
            title: questionTitle,
            type: questionType,
            answers: answers,
        };
        // await coursesClient.createQuestionForQuiz(cid,quizId,newQuestion);
        // dispatch(updateQuestion(updatedQuestion));

        // handleCancel();
        dispatch(updateQuestion(updatedQuestion));
        // success
        console.log(updatedQuestion._id)
        console.log("Updated Question:", updatedQuestion);

        const questions = await questionsClient.updateQuestion(quizId, questionId, updatedQuestion);
        // dispatch(setQuestions(questions));

        console.log("Sending updated question:", updatedQuestion);
        console.log("Fetching questions for quiz:", cid, quizId);

        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };







    const createQuestionForQuiz = async () => {
        if (!cid) return;
        const newQuestion = {
            course: cid,
            name: questionDescription,

        };
        const question = await coursesClient.createQuestionForQuiz(cid, quizId, newQuestion);
        console.log("New Question:", question);
        dispatch(addQuestion(question));
    };

    const handleTextChange = (value: string) => {
        const plainText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }); // 仅保留纯文本
        console.log("Sanitized Input:", plainText); // 检查输入值
        setQuestionDescription(plainText);
    };

    // const fetchQuestions = async () => {
    //     const questions = await coursesClient.findQuestionsForQuiz(cid, quizId);
    //     dispatch(setQuestions(questions));
    // };


    // useEffect(() => {
    //     fetchQuestions();
    // }, []);

    // useEffect(() => {
    //     if (question) {
    //         setQuestionDescription(question.description);
    //     }
    // }, [question]);


    useEffect(() => {
        if (question?.answers) {
          // 如果 question 有 answers，从中加载数据
          setAnswers(question.answers);
        } else {
          // 如果 question 没有 answers，根据 questionType 初始化
          switch (questionType) {
            case "True/False":
              setAnswers([
                { id: 1, text: "True", isCorrect: false },
                { id: 2, text: "False", isCorrect: false },
              ]);
              break;
      
            case "Multiple Choice":
              setAnswers([{ id: 1, text: "", isCorrect: false }]);
              break;
      
            case "Fill In the Blank":
              setAnswers([{ id: 1, text: "", isCorrect: true }]);
              break;
      
            default:
              setAnswers([]);
          }
        }
      }, [question, questionType]);
      
      
    console.log("question Description", questionDescription)

    return (

        <div id='quiz-details'>

            <div>


                <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: '10px' }}
                >

                    <label
                        htmlFor="quiz-title"
                        className="text-left"
                        style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                    >
                        Quiz Title:
                    </label>
                    <input
                        id="quiz-title"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        className="form-control"
                        style={{ width: '25%' }}
                    />
                    <div className="d-flex align-items-center" style={{ gap: '10px', flexGrow: 1 }}>

                        <select className="form-select"
                            style={{ width: '50%' }}
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}>
                            <option value="Fill In the Blank" >Fill In the Blank</option>
                            <option value="Multiple Choice" >Multiple Choice</option>
                            <option value="True/False" >True/False</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center" style={{ gap: '5px' }}>
                        <label
                            htmlFor="quiz-pts"
                            className="text-right"
                            style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                        >
                            pts:
                        </label>
                        <input
                            id="quiz-pts"
                            className="form-control"
                            style={{ width: '50px', textAlign: 'center' }}
                            value={questionPts}
                            onChange={(e) => setQuestionPts(e.target.value)}
                        />
                    </div>
                </div>


            </div>

            <hr />
            <p>Enter your question andmultiple answers, then select the one correct answer.</p>
            <div id="quiz-editScreen-downPart">

                <label
                    htmlFor="quiz-Question"
                    style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
                    Question:
                </label>



                <ReactQuill
                    id="quiz-Question"
                    value={questionDescription}
                    onChange={handleTextChange}
                    // onChange={(e) => setQuestionDescription(e)}
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
                <br />

                <div className="wd-assignemnt-editScreen-offset">
                    <label
                        htmlFor="quiz-instructions"
                        style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
                        Answers:
                    </label>
                    {renderAnswersSection()}



                    <br />

                </div>


            </div>
            <hr />

            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginTop: "20px" }}>
                <button
                    style={{
                        padding: "10px 20px",
                        background: "#f8f9fa",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={handleCancel}
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
                    onClick={handleSave}
                >
                    Update Question
                </button>
            </div>

        </div>
    );
}