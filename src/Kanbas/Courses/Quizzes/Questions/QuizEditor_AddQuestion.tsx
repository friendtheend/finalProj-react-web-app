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
    const [questionAnswerIsCorrect, setQuestionAnswerIsCorrect] = useState(question?.answers?.isCorrect ?? "True");


    const [isAddQuestionPage, setIsAddQuestionPage] = useState(false);


    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // 处理单选框变化
    // const handleCorrectAnswerChange = (index: any, value: any) => {
    //     // 设置选中的正确答案的索引
    //     setSelectedAnswerIndex(index);
    //     // 更新 isCorrect 值：选中该答案时为 true，其他答案为 false
    //     const updatedAnswers = answers.map((answer: any, i: any) =>
    //         i === index ? { ...answer, isCorrect: value } : answer // 创建新对象
    //     );
    //     setAnswers(updatedAnswers);

    // };
    const handleTrueFalseCorrectAnswerChange = (index: any) => {
        // // 设置选中的正确答案的索引
        // setSelectedAnswerIndex(index);

        // // 更新 isCorrect 值：选中该答案时为 true，其他答案为 false
        // const updatedAnswers = answers.map((answer: any, i: any) => ({
        //     ...answer,
        //     isCorrect: i === index, // 仅将选中索引对应的答案设置为 true，其余设置为 false
        // }));
        const updatedAnswers = answers.map((answer: any) =>
            answer.id === index
                ? { ...answer, isCorrect: true }
                : { ...answer, isCorrect: false }
        );

        setAnswers(updatedAnswers);
    };


    const handleCorrectAnswerChange = (index: any) => {

        const updatedAnswers = answers.map((answer: any, i: any) => ({
            ...answer,
            isCorrect: i === index, // 仅将选中索引对应的答案设置为 true，其余设置为 false
        }));

        setAnswers(updatedAnswers);
    };

    const handleAnswerChange = (index: any, value: any) => {

        if (questionType === "True/False") {
            setQuestionAnswerIsCorrect("True");

            const answers = [
                {
                    id: new Date().getTime().toString(), // 每个答案的唯一标识符（可用 index 或生成的唯一 ID）
                    text: "True", // 答案文本
                    isCorrect: true, // 是否为正确答案
                },

            ];
            dispatch(updateQuestion(answers));// Update directly as there's only one value
            setAnswers(answers);
        } else {
            const updatedAnswers = answers.map((answer: any, i: any) =>
                i === index ? { ...answer, text: value } : answer // 创建新对象
            );
            setAnswers(updatedAnswers);
        }


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
                        {answers.map((answer: any) => (
                            <div key={answer.id} className="d-flex align-items-center ms-2 mt-3">
                                {/* Radio Button */}
                                <input
                                    type="radio"
                                    name={`correctAnswer-${answer.id}`} // 每个 radio 按钮都有唯一的 name
                                    value={answer.text}
                                    checked={answer.isCorrect} // 根据 isCorrect 设置是否选中
                                    onChange={() => handleTrueFalseCorrectAnswerChange(answer.id)} // 更新状态
                                />
                                <label className="ms-2" style={{ fontWeight: "bold" }}>
                                    {answer.text}
                                </label>
                                {/* 显示 "Correct" */}
                                <span
                                    style={{
                                        marginLeft: "20px",
                                        color: answer.isCorrect ? "green" : "transparent",
                                        fontWeight: "bold",
                                        minWidth: "80px", // 确保布局对齐
                                        display: "inline-block",
                                    }}
                                >
                                    {answer.isCorrect ? "Correct" : ""}
                                </span>
                            </div>
                        ))}
                    </div>

                );

            case "Multiple Choice":

                return (
                    <div>
                        {answers.map((answer: any, index: any) => (

                            <div key={index} className="d-flex align-items-center ms-2">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    value={answer.isCorrect}
                                    checked={answer.isCorrect} // 根据 isCorrect 属性设置 checked 状态
                                    onChange={() => handleCorrectAnswerChange(index)} // 点击时更新状态
                                />
                                {/* 为 "Correct" 预留固定宽度 */}
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        color: answer.isCorrect ? 'green' : 'transparent', // 如果未选中，文字透明
                                        fontWeight: 'bold',
                                        minWidth: '80px', // 为文字预留固定宽度，保持布局一致
                                        display: 'inline-block',
                                    }}
                                >
                                    {answer.isCorrect ? 'Correct' : ''}
                                </span>
                                <label className="col-sm-4 text-end col-form-label" style={{ fontWeight: 'bold' }}>
                                    Possible Answer
                                </label>
                                <input
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="form-control"
                                    style={{ width: '40%' }}
                                />
                                <button
                                    className="btn btn-danger btn-sm ms-auto"
                                    onClick={() => handleDeleteAnswer(index)}
                                >
                                    Delete
                                </button>
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
                        {answers.map((answer: any, index: any) => (
                            <div key={index} className="d-flex align-items-center">
                                <label className="col-sm-4 text-end col-form-label " style={{ fontWeight: 'bold' }}>
                                    Possible Answer
                                </label>
                                <input
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="form-control"
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


    const createQuestionForQuiz = async () => {
        if (!cid) return;
        const newQuestion = {
            _id: Date.now(),
            quizId: quizId,
            course: cid,
            description: questionDescription,
            pts: questionPts,
            title: questionTitle,
            type: questionType,
            answers: answers,

        };
        const question = await coursesClient.createQuestionForQuiz(cid, quizId, newQuestion);
        console.log("New Question:", question);
        dispatch(addQuestion(question));
    };


    const saveQuestion = async (question: any) => {
        await questionsClient.updateQuestion(quizId, questionId, question);
        dispatch(updateQuestion(question));
    };

    const handleSave = async () => {
        if (questionId === "new") {
            // dispatch(addAssignment({ title: assignmentName, course: cid, description: assignmentDescription, point: assignmentPoint, dueDate: assignmentDueDate, availableFromDate: assignmentAvailableFromDate, availableUntilDate: assignmentAvailableUntilDate }));
            await createQuestionForQuiz();


        } else {
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

            console.log("Updated Assignment:", updatedQuestion);
            await saveQuestion(updatedQuestion);
            // await saveAssignment(assignment);
            dispatch(updateQuestion(updatedQuestion));

        }
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };

    // const handleSave = async () => {
    //     console.log(questionId, "this is question id")


    // // await coursesClient.createQuestionForQuiz(cid,quizId,newQuestion);
    // // dispatch(updateQuestion(updatedQuestion));

    // // handleCancel();


    // dispatch(updateQuestion(updatedQuestion));
    // // success
    // console.log(updatedQuestion._id)
    // console.log("Updated Question:", updatedQuestion);

    // const questions = await questionsClient.updateQuestion(quizId, questionId, updatedQuestion);
    // // dispatch(setQuestions(questions));


    //     navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    // };









    const handleTextChange = (value: string) => {
        const plainText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }); // 仅保留纯文本
        console.log("Sanitized Input:", plainText); // 检查输入值
        setQuestionDescription(plainText);
    };




    useEffect(() => {
        if (question?.answers) {

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

    // console.log(question?._id)
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