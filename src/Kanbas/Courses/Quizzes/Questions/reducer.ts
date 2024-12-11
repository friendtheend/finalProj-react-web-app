import { createSlice } from "@reduxjs/toolkit";
// import { questions } from "../../Database";
const initialState = {
  questions: [],
};
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    addQuestion: (state, { payload: question }) => {
      const newAnswer: any = {
        
        _id: new Date().getTime().toString(),
        course: question.course,
        name: question.name,
        description:question.description,
        quizId:question.quizId,
        answers: [],
    };
      state.questions = [...state.questions, newAnswer] as any;
    },

    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((a: any) =>
        a._id === question._id ? { ...a, ...question } : a
      ) as any;
      console.log("Updated state:", state.questions);
    },

    // editQuiz: (state, { payload: quizId }) => {
    //   state.quizzes = state.quizzes.map((a: any) =>
    //     a._id === quizId ? { ...a, editing: true } : a
    //   ) as any;
    // },
    // deleteQuiz: (state, { payload: quizId }) => {
    //   state.quizzes = state.quizzes.filter(
    //     (m: any) => m._id !== quizId);
    // },
  },
});

// editQuestion ,deleteQuestion
export const { setQuestions, addQuestion, updateQuestion} =
questionSlice.actions;
export default questionSlice.reducer;