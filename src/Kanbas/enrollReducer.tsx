import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "./Database";
const initialState = {
  enrollments: enrollments,
  courses: courses,
};
const enrollmentsSlice = createSlice({
  name: "assignemnts",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.enrollments = action.payload;
    },
  
    enrollCourse(state,  { payload: {enrollment,course} }) {
        const newEnrollment: any = {
            // 使用时间戳作为唯一ID
            _id: new Date().getTime().toString(),
           user: enrollment.user,
           course: course._id
          };
          state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
  //  { "_id": "9", "user": "123", "course": "RS102" }
    unenrollCourse(state,  { payload: {enrollment,course} }) {
      
      const userEnrollments = state.enrollments.filter(
        (e: any) => e.user === enrollment.user
    );

    // 再通过 course 过滤出最终的 enrollments
    state.enrollments = userEnrollments.filter(
        (e: any) => e.course !== course._id
    );
    },

    loadEnrollments(state) {
      const storedEnrollments = localStorage.getItem('enrollments');
      if (storedEnrollments) {
        state.enrollments = JSON.parse(storedEnrollments); // Load from localStorage
      }
    }


 
    // updateModule: (state, { payload: module }) => {
    //   state.modules = state.modules.map((m: any) =>
    //     m._id === module._id ? module : m
    //   ) as any;
    // },
  },
});



export const { setCourses, enrollCourse, unenrollCourse, loadEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;