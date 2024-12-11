// Redux 的确是用来集中管理和更新状态的
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Courses/People/reducer"
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Quizzes/Questions/reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    questionsReducer,
  },
});
export default store;