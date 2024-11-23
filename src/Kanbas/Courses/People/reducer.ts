import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnroll: (state, action) => {
      state.enrollments = action.payload;
    },

    // addEnroll: (state, { payload: enrollment }) => {
    //   const newEnroll: any = {
    //     _id: new Date().getTime().toString(),
    //     user: enrollment.user,
    //     course: enrollment.course,
    //   };
    //   state.enrollments = [...state.enrollments, newEnroll] as any;
    // },

    addEnroll: (state,  { payload: enrollment}) => {
      // const newEnrollment: any = { 
      //   // 使用时间戳作为唯一ID
      //   _id: enrollId,
      //  user: user,
      //  course: course,
      // };
        state.enrollments = [...state.enrollments, enrollment] as any;
  },



    deleteEnroll: (state, { payload: enrollmentId}) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => !( m._id === enrollmentId)
      );

    },
  },
});
export const { addEnroll, deleteEnroll, setEnroll} =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;