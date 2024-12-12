import { createSlice } from "@reduxjs/toolkit";
// import { quizzes } from "../../Database";
const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        course: quiz.course,
        title: quiz.title,
        type: quiz.type, 
        point: quiz.point, 
        assignmentGroup: quiz.assignmentGroup, 
        question_nums: quiz.question_nums,
        shuffleAnswers: quiz.shuffleAnswers, 
        timeLimit: quiz.timeLimit, 
        timeAllowed: quiz.timeAllowed,
        multipleAttempts: quiz.multipleAttempts,
        attemptsAllowed: quiz.attemptsAllowed, 
        showCorrectAnswers: {
          show: quiz.showCorrectAnswers.show, 
          when: quiz.showCorrectAnswers.when, 
        },
        accessCode: quiz.accessCode, 
        oneQuestionAtATime: quiz.oneQuestionAtATime, 
        webcamRequired: quiz.webcamRequired, 
        lockQuestionsAfterAnswering: quiz.lockQuestionAfterAnswering, 
        viewResults: quiz.viewResults,
        dueDate: quiz.dueDate,
        availableFromDate: quiz.availableFromDate, 
        untilDate: quiz.untilDate,
        publish: quiz.publish,
        description: quiz.description,};
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? { ...a, ...quiz } : a
      ) as any;
    },


    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizId ? { ...a, editing: true } : a
      ) as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== quizId);
    },
  },
});
export const { setQuizzes, addQuiz, updateQuiz, editQuiz ,deleteQuiz} =
  quizzesSlice.actions;
export default quizzesSlice.reducer;