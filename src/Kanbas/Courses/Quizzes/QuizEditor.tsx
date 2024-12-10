import QuizEditor_Details from "./QuizEditor_Details";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdBlockFlipped } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
    setQuizzes,
  } from "./reducer";

  import * as coursesClient from "../client";
import QuizEditor_Questions from "./QuizEditor_Questions";

export default function QuizEditor() {
const { cid, quizId } = useParams();
const { quizzes } = useSelector((state: any) => state.quizzesReducer);
const quiz = quizzes.find((q: any) => q._id === quizId);
const [activeTab, setActiveTab] = useState("details");
const [quizPoints, setPoint] = useState(quiz?.point ?? 0);
const [quizPublish, setPublish] = useState(quiz?.publish ?? false);
const dispatch = useDispatch();

const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

useEffect(() => {
fetchQuizzes();
}, []);



return(
    <div>
        <div
            className="d-flex align-items-center"
            style={{
                display: "flex",
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "10px 20px",
            }}
            >
                <span style={{ fontWeight: "bold", marginLeft: "auto", fontSize: "18px", marginRight: "8px"}}>
                    Points {quizPoints} {" "}
                </span>

                {quizPublish ? (
                <div>
                    <span style={{ fontWeight: "bold", marginLeft: "auto", fontSize: "18px", color:"gray "}}><GreenCheckmark /></span>
                    <span style={{ fontSize: "18px", marginRight: "8px", color:"gray "}}>Published</span> {" "}
                </div>
                ) : (
                <div>
                    <span style={{ fontWeight: "bold", marginLeft: "auto", fontSize: "18px" }}><MdBlockFlipped /></span>
                    <span style={{ fontSize: "18px", marginRight: "8px"}}>Not Published</span> {" "}
                </div>
                )}

                <button style={{
                        border: "1px solid #555",
                        borderRadius: "2px",
                    }}>
                    <FaEllipsisV
                    style={{
                        color: "gray",
                        fontSize: "12px",
                    }}
                    />
                </button>
            </div>
        <hr/>
          
        <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
            <button
                onClick={() => setActiveTab("details")}
                style={{
                    borderTop: activeTab === "details" ? "1px solid #ddd" : "1px solid transparent",
                    borderRight: activeTab === "details" ? "1px solid #ddd" : "1px solid transparent",
                    borderLeft: activeTab === "details" ? "1px solid #ddd" : "1px solid transparent",
                    borderBottom: activeTab === "details" ? "1px solid transparent" : "1px solid #ddd",
                    color: activeTab === "details" ? "gray" : "red",
                    padding: "10px 20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    borderRadius: "5px 5px 0 0",
                    marginBottom: "-1px", 
                  }}
            >
                Details
            </button>
            <button
                onClick={() => setActiveTab("questions")}
                style={{
                    borderTop: activeTab === "questions" ? "1px solid #ddd" : "1px solid transparent",
                    borderRight: activeTab === "questions" ? "1px solid #ddd" : "1px solid transparent",
                    borderLeft: activeTab === "questions" ? "1px solid #ddd" : "1px solid transparent",
                    borderBottom: activeTab === "questions" ? "1px solid transparent" : "1px solid #ddd",
                    color: activeTab === "questions" ? "gray" : "red",
                    padding: "10px 20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    borderRadius: "5px 5px 0 0",
                    marginBottom: "-1px", 
                  }}
            >
                Questions
            </button>
        </div>
        <br/>
        {activeTab == "details" && (
            <QuizEditor_Details quizzes={quizzes}/>    
        )}
        {activeTab === "questions" && <QuizEditor_Questions quizzes={quizzes} />}
    </div>

   

);}