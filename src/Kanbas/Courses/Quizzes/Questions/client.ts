import axios from "axios"; 
// 前后端交用的

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;


const QUESTIONS_API = `${REMOTE_SERVER}/api/quizzes`;

// export const deleteQuiz = async (quizId: string) => {
//     const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
//     console.log(quizId)
//     return response.data;
// };

export const updateQuestion = async (quizId:any, questionId:any,question: any) => {
    console.log("the quiz id", question.quizId)
    const { data } = await axios.put(`${QUESTIONS_API }/${quizId}/questionEditor/${questionId}`, question);
    return data;
};