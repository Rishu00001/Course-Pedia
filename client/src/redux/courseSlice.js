import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourse: null,
    courseData : null
  },
  reducers: {
    setCreatorCourse: (state, action) => {
      state.creatorCourse = action.payload;
    },
    setCourseData : (state,action)=>{
      state.courseData = action.payload
    }
  },
});
export const {setCreatorCourse,setCourseData} = courseSlice.actions;
export default courseSlice.reducer;
