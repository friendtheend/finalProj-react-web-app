import axios from "axios"; 
// 前后端交用的

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;


const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    console.log(quizId)
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};



