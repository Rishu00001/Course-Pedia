import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import courseReducer from "./courseSlice.js";
import lectureReducer from "./lectureSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    lecture: lectureReducer,
  },
});
export default store;
