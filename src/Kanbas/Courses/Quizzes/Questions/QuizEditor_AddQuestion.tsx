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
    const { cid, quizId,questionId } = useParams();
    const [answers, setAnswers] = useState<string[]>([""]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions } = useSelector((state: any) => state.questionsReducer);
    console.log("Questions in component:", questions);
    const question = questions.find((q: any) => q._id === questionId);
    // const [questionId, setQuestionId] = useState(question?._id ?? "New");
    // const [questionTitle, setQuestionTitle] = useState(question?.name ?? "Unnamed");
    const [questionDescription, setQuestionDescription] = useState(question?.description ?? "no Description");
    const [isAddQuestionPage, setIsAddQuestionPage] = useState(false);
    const handleAddAnswer = () => {
        setAnswers([...answers, ""]); // 添加一个新的空答案
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };



    const handleSave = async () => {

        const updatedQuestion = {
            _id: questionId,
            quizId: quizId,
            description: questionDescription,
            course: cid,
            answers: []
        };
        // await coursesClient.createQuestionForQuiz(cid,quizId,newQuestion);
        // dispatch(updateQuestion(updatedQuestion));

        // handleCancel();
        dispatch(updateQuestion(updatedQuestion));
// success
console.log(updatedQuestion._id)
        console.log("Updated Question:", updatedQuestion);

        const questions = await questionsClient.updateQuestion(quizId,questionId,updatedQuestion);
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

    console.log("question Description", questionDescription)

    return (

        <div id='quiz-details'>

            <div>
                <p>easy question part</p>
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
                    <div className="row mb-3">
                        <label htmlFor="wd-possibleAnswer" className="col-sm-4 text-end col-form-label " style={{ fontWeight: 'bold' }}>
                            Possible Answer
                        </label>
                        <div className="col-sm-8 text-start">
                            <input
                                id="wd-possibleAnswer"
                                // value={questionTitle}
                                className="form-control col"
                                // onChange={(e) => setQuestionTitle(e.target.value)}
                                style={{ width: "50%" }}
                            />
                        </div>
                    </div>


                    <br />

                </div>

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