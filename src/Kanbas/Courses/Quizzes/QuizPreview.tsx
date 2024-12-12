// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import { useEffect, useState } from "react";
// import * as coursesClient from "../client";
// import { format } from 'date-fns';
// import { GoPencil } from "react-icons/go";
//
// export default function QuizPreview() {
//     const { cid, quizId } = useParams();
//     const { quizzes } = useSelector((state: any) => state.quizzesReducer);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     const quiz = quizzes?.find((q: any) => q._id === quizId);
//
//     const [answers, setAnswers] = useState<any>({});
//     const [score, setScore] = useState<number | null>(null);
//     const [lastAttempt, setLastAttempt] = useState<any>(null);
//
//
//     const handleAnswerChange = (questionId: string, value: string) => {
//         setAnswers({
//             ...answers,
//             [questionId]: value,
//         });
//     };
//
//     // const submitQuiz = async () => {
//     //     try {
//     //         const response = await coursesClient.submitQuiz({ quizId, answers });
//     //         setScore(response.score);
//     //     } catch (error) {
//     //         console.error("Error submitting quiz:", error);
//     //     }
//     // };
//
//     const editQuiz = () => {
//         navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
//     };
//
//     if (!quiz) {
//         return <p>Loading quiz...</p>;
//     }
//
//     return (
//         <div id="quiz-preview" className="container">
//
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                     <h1 className="text-center">Quiz Preview: {quiz?.title || "Quiz"}</h1>
//                     <button className="btn btn-primary" onClick={editQuiz}>
//                         <GoPencil/> Edit Quiz
//                     </button>
//                 </div>
//
//                 {/* Alert indicating preview mode */}
//                 <div className="alert alert-warning">
//                     <strong>⚠️ This is a preview of the published version of the quiz</strong>
//                 </div>
//
//                 {/* Display the start time */}
//                 <div className="mb-4">
//                     <h2 className="text-muted">Started: {format(new Date(), "MMM d 'at' h:mm a")}</h2>
//                 </div>
//
//             {score !== null && (
//                 <div className="alert alert-success">
//                     <p>Your score: {score}</p>
//                 </div>
//             )}
//
//             {lastAttempt && (
//                 <div className="alert alert-info">
//                     <p>Last Attempt:</p>
//                     <ul>
//                         {Object.keys(lastAttempt.answers).map((key) => (
//                             <li key={key}>
//                                 Question {key}: {lastAttempt.answers[key]}
//                             </li>
//                         ))}
//                     </ul>
//                     <p>Date: {format(new Date(lastAttempt.date), "MMM d, yyyy 'at' h:mm a")}</p>
//                 </div>
//             )}
//
//             <form onSubmit={(e) => e.preventDefault()}>
//                 {quiz.questions?.length > 0 ? (
//                     quiz.questions.map((question: any) => (
//                         <div key={question._id} className="mb-4">
//                             <p>
//                                 <strong>{question.text}</strong>
//                             </p>
//                             {question.type === "Fill In The Blank" && (
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={answers[question._id] || ""}
//                                     onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//                                 />
//                             )}
//                             {question.type === "Multiple Choice" &&
//                                 question.options.map((option: string, index: number) => (
//                                     <div key={index} className="form-check">
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             id={`${question._id}-${index}`}
//                                             name={question._id}
//                                             value={option}
//                                             checked={answers[question._id] === option}
//                                             onChange={(e) => handleAnswerChange(question._id, option)}
//                                         />
//                                         <label htmlFor={`${question._id}-${index}`} className="form-check-label">
//                                             {option}
//                                         </label>
//                                     </div>
//                                 ))}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No questions available for this quiz.</p>
//                 )}
//
//                 {/*<button className="btn btn-success" onClick={submitQuiz}>*/}
//                 <button className="btn btn-success">
//                     Submit Quiz
//                 </button>
//             </form>
//         </div>
//     );
// }
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { GoPencil } from "react-icons/go";
import * as coursesClient from "../client"; // 模拟的客户端接口，用于加载 Quiz 数据



export default function QuizPreview() {
    const { cid, quizId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const quiz = quizzes?.find((q: any) => q._id === quizId);
    const [answers, setAnswers] = useState<any>({});
    const [score, setScore] = useState<number | null>(null);
    const [lastAttempt, setLastAttempt] = useState<any>(null);

    // 加载 Quiz 数据
    useEffect(() => {
        async function fetchQuiz() {
            try {
                const data = await coursesClient.getQuiz(cid, quizId); // 模拟从后端获取数据
                dispatch({ type: "SET_QUIZZES", payload: data });
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        }
        fetchQuiz();
    }, [cid, quizId, dispatch]);

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers({
            ...answers,
            [questionId]: value,
        });
    };

    const editQuiz = () => {
        navigate(`/Kanbans/Courses/${cid}/Quizzes/${quizId}/editorDetail`);
    };

    if (!quiz) {
        return <p>Loading quiz...</p>;
    }

    return (
        <div id="quiz-preview" className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Quiz Preview: {quiz.title || "Quiz"}</h1>
                <button className="btn btn-primary" onClick={editQuiz}>
                    <GoPencil /> Edit Quiz
                </button>
            </div>

            {/* 提示：当前是预览模式 */}
            <div className="alert alert-warning">
                <strong>⚠️ This is a preview of the published version of the quiz</strong>
            </div>

            {/* 显示开始时间 */}
            <div className="mb-4">
                <h2 className="text-muted">Started: {format(new Date(), "MMM d 'at' h:mm a")}</h2>
            </div>

            {score !== null && (
                <div className="alert alert-success">
                    <p>Your score: {score}</p>
                </div>
            )}

            {lastAttempt && (
                <div className="alert alert-info">
                    <p>Last Attempt:</p>
                    <ul>
                        {Object.keys(lastAttempt.answers).map((key) => (
                            <li key={key}>
                                Question {key}: {lastAttempt.answers[key]}
                            </li>
                        ))}
                    </ul>
                    <p>Date: {format(new Date(lastAttempt.date), "MMM d, yyyy 'at' h:mm a")}</p>
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                {quiz.questions?.length > 0 ? (
                    quiz.questions.map((question: any) => (
                        <div key={question._id} className="mb-4">
                            <p>
                                <strong>{question.text}</strong>
                            </p>
                            {question.type === "Fill In The Blank" && (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={answers[question._id] || ""}
                                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                />
                            )}
                            {question.type === "Multiple Choice" &&
                                question.answers.map((answer: any) => (
                                    <div key={answer.id} className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id={`${question._id}-${answer.id}`}
                                            name={question._id}
                                            value={answer.text}
                                            checked={answers[question._id] === answer.text}
                                            onChange={() => handleAnswerChange(question._id, answer.text)}
                                        />
                                        <label htmlFor={`${question._id}-${answer.id}`} className="form-check-label">
                                            {answer.text}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    ))
                ) : (
                    <p>No questions available for this quiz.</p>
                )}

                <button className="btn btn-success" type="submit">
                    Submit Quiz
                </button>
            </form>
        </div>
    );
}
