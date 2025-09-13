import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import courseReducer from "./courseSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
});
export default store;
