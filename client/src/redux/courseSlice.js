import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourse: null,
    courseData : null,
    selectedCourse : null
  },
  reducers: {
    setCreatorCourse: (state, action) => {
      state.creatorCourse = action.payload;
    },
    setCourseData : (state,action)=>{
      state.courseData = action.payload
    },
    setSelectedCourse : (state,action)=>{
      state.selectedCourse = action.payload
    }
  },
});
export const {setCreatorCourse,setCourseData,setSelectedCourse} = courseSlice.actions;
export default courseSlice.reducer;
