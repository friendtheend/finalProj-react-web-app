import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello",
};
const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});
export default helloSlice.reducer;
